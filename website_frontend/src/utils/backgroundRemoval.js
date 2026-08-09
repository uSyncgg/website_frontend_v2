// Automatic headshot cut-outs, in the browser.
//
// Why in the browser and not an API: player photos never leave the device,
// there's no key to hide (we have no backend yet), and there's no per-image
// bill as people upload. The trade is a one-time model download on first use.
//
// Model: MODNet (Apache-2.0) via Transformers.js. It's a *matting* model, not
// a segmentation one — it returns a soft alpha per pixel, which is the only
// way hair comes out looking like hair instead of a cookie cutter.
//
// The weights are fetched from the Hugging Face CDN the first time and cached
// by the browser afterwards. The photo itself is never uploaded anywhere.

const MODEL = 'Xenova/modnet';

// Quantized weights are ~6.6MB against ~26MB for full precision. On a matte
// this size the quality difference is invisible, and it's the difference
// between a usable and a painful first upload on a phone.
const DTYPE = 'quantized';

let pipelinePromise = null;

// Loaded on demand so neither the library nor the model touches the initial
// page load — nobody pays for this until they add a headshot.
const getPipeline = (onProgress) => {
    if (!pipelinePromise) {
        pipelinePromise = (async () => {
            const { pipeline, env } = await import('@huggingface/transformers');
            // No local model server; fetch straight from the hub CDN.
            env.allowLocalModels = false;
            return pipeline('background-removal', MODEL, {
                dtype: DTYPE,
                progress_callback: (item) => {
                    if (item?.status === 'progress' && typeof item.progress === 'number') {
                        onProgress?.(Math.round(item.progress));
                    }
                },
            });
        })().catch((err) => {
            // Let a later attempt retry instead of caching the failure forever.
            pipelinePromise = null;
            throw err;
        });
    }
    return pipelinePromise;
};

const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

/**
 * Cleans up the matte the model hands back.
 *
 * Two passes, both aimed at the fringe you get when a subject is cut from a
 * background of a different colour:
 *
 *  1. Despill — a semi-transparent edge pixel is a blend of subject and old
 *     background. Unpremultiplying against the background colour we measured
 *     removes that tint, so a player shot against a grey wall doesn't carry a
 *     grey halo onto a dark calling card.
 *  2. Alpha tightening — nudges the matte away from the mushy middle so edges
 *     read crisp, while leaving genuinely soft pixels (hair) soft.
 */
const refineMatte = (imageData) => {
    const { data, width, height } = imageData;

    // Estimate the old background from pixels the model called fully
    // transparent, sampling the border where the background actually is.
    let br = 0;
    let bg = 0;
    let bb = 0;
    let n = 0;
    const step = Math.max(1, Math.floor(width / 64));
    for (let x = 0; x < width; x += step) {
        for (const y of [0, height - 1]) {
            const i = (y * width + x) * 4;
            if (data[i + 3] < 12) {
                br += data[i];
                bg += data[i + 1];
                bb += data[i + 2];
                n++;
            }
        }
    }
    for (let y = 0; y < height; y += step) {
        for (const x of [0, width - 1]) {
            const i = (y * width + x) * 4;
            if (data[i + 3] < 12) {
                br += data[i];
                bg += data[i + 1];
                bb += data[i + 2];
                n++;
            }
        }
    }
    const hasBg = n > 8;
    const bgR = hasBg ? br / n : 0;
    const bgG = hasBg ? bg / n : 0;
    const bgB = hasBg ? bb / n : 0;

    for (let i = 0; i < data.length; i += 4) {
        let a = data[i + 3] / 255;
        if (a <= 0) continue;

        if (hasBg && a < 0.97) {
            // c = a*F + (1-a)*B  ->  F = (c - (1-a)*B) / a
            const inv = 1 - a;
            data[i] = clamp255((data[i] - inv * bgR) / a);
            data[i + 1] = clamp255((data[i + 1] - inv * bgG) / a);
            data[i + 2] = clamp255((data[i + 2] - inv * bgB) / a);
        }

        // Pull the low end to zero and the high end to solid; leave the middle
        // (hair, motion blur) alone so it stays genuinely soft.
        if (a < 0.06) a = 0;
        else if (a > 0.94) a = 1;
        else a = 0.06 + ((a - 0.06) / 0.88) * 0.88;

        data[i + 3] = Math.round(a * 255);
    }

    return imageData;
};

/**
 * Runs the cut-out and returns a transparent PNG blob.
 *
 * @param {File|Blob} file        the uploaded photo
 * @param {(pct:number|null)=>void} [onProgress] model download progress, 0-100
 * @returns {Promise<Blob>} PNG with a real alpha channel
 */
export const removeBackground = async (file, onProgress) => {
    const segmenter = await getPipeline(onProgress);
    onProgress?.(null); // downloaded; now it's compute, which has no progress

    const url = URL.createObjectURL(file);
    try {
        const result = await segmenter(url);
        const output = Array.isArray(result) ? result[0] : result;

        const canvas = document.createElement('canvas');
        canvas.width = output.width;
        canvas.height = output.height;
        const ctx = canvas.getContext('2d');

        // RawImage gives us RGBA straight from the matting model.
        const imageData = new ImageData(
            new Uint8ClampedArray(output.data),
            output.width,
            output.height,
        );
        ctx.putImageData(refineMatte(imageData), 0, 0);

        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
        if (!blob) throw new Error('Could not encode the cut-out.');
        return blob;
    } finally {
        URL.revokeObjectURL(url);
    }
};

// True when the browser can plausibly run this at all. Old Safari and anything
// without WASM shouldn't get a spinner that never finishes.
export const canRemoveBackground = () =>
    typeof WebAssembly === 'object' && typeof createImageBitmap === 'function';

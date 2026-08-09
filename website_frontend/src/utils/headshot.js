// Auto-fit for headshots.
//
// Uploads arrive at every size and crop: a phone photo with the player in the
// middle of a lot of empty space, a tightly cropped PNG, a full-body shot. The
// card needs them to land in the same place at the same size every time, so
// before anything is displayed we trim the transparent margin off the cut-out.
//
// After this, the subject is flush to the edges of its own image, which means
// the card can position it with plain object-fit rules instead of guessing.

const ALPHA_THRESHOLD = 8; // below this a pixel counts as background

const loadImage = (blob) =>
    new Promise((resolve, reject) => {
        const url = URL.createObjectURL(blob);
        const image = new Image();
        image.onload = () => {
            URL.revokeObjectURL(url);
            resolve(image);
        };
        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Could not read that image.'));
        };
        image.src = url;
    });

/**
 * Trims fully transparent margins so the subject fills its own frame, and works
 * out how the shot is framed so the card knows how much room to give it.
 *
 * Framing can't be read from the aspect ratio — a torso cut-out lands around
 * 0.70 and a face crop around 0.80, which is too close to split on. What does
 * separate them is the shoulder line: on a torso the head is roughly a third
 * of the widest point, on a face crop the top of the head is nearly as wide as
 * the widest point. That ratio holds whatever the crop.
 *
 * Photos with no transparency (someone uploaded a normal JPEG and skipped the
 * cut-out) are returned untouched — there's no subject boundary to find, and
 * cropping one out of a rectangle would just guess wrong.
 *
 * @param {Blob|File} blob
 * @returns {Promise<{blob: Blob, framing: 'body'|'bust'}>}
 */
export const autoFitHeadshot = async (blob) => {
    let image;
    try {
        image = await loadImage(blob);
    } catch {
        return { blob, framing: 'bust' };
    }

    const w = image.naturalWidth;
    const h = image.naturalHeight;
    if (!w || !h) return { blob, framing: 'bust' };

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(image, 0, 0);

    let data;
    try {
        data = ctx.getImageData(0, 0, w, h).data;
    } catch {
        return { blob, framing: 'bust' }; // tainted canvas — leave it alone
    }

    let top = h;
    let bottom = -1;
    let left = w;
    let right = -1;
    const rowWidths = new Int32Array(h);

    for (let y = 0; y < h; y++) {
        const row = y * w * 4;
        let rowLeft = -1;
        let rowRight = -1;
        for (let x = 0; x < w; x++) {
            if (data[row + x * 4 + 3] > ALPHA_THRESHOLD) {
                if (rowLeft < 0) rowLeft = x;
                rowRight = x;
            }
        }
        if (rowRight >= 0) {
            rowWidths[y] = rowRight - rowLeft + 1;
            if (y < top) top = y;
            if (y > bottom) bottom = y;
            if (rowLeft < left) left = rowLeft;
            if (rowRight > right) right = rowRight;
        }
    }

    // Nothing transparent (a normal photo) or nothing opaque (an empty PNG).
    if (bottom < 0 || (top === 0 && left === 0 && bottom === h - 1 && right === w - 1)) {
        return { blob, framing: 'bust' };
    }

    // Head width against the widest point of the subject.
    const subjectH = bottom - top + 1;
    const headBand = Math.max(1, Math.round(subjectH * 0.18));
    let headWidth = 0;
    let maxWidth = 0;
    for (let y = top; y <= bottom; y++) {
        const rw = rowWidths[y];
        if (rw > maxWidth) maxWidth = rw;
        if (y < top + headBand && rw > headWidth) headWidth = rw;
    }
    const framing = maxWidth > 0 && headWidth / maxWidth > 0.55 ? 'bust' : 'body';

    // A hair of breathing room so the drop shadow has something to sit on.
    const margin = Math.round(Math.max(w, h) * 0.005);
    const x0 = Math.max(0, left - margin);
    const y0 = Math.max(0, top - margin);
    const cropW = Math.min(w, right + margin) - x0 + 1;
    const cropH = Math.min(h, bottom + margin) - y0 + 1;
    if (cropW <= 0 || cropH <= 0) return { blob, framing };

    const out = document.createElement('canvas');
    out.width = cropW;
    out.height = cropH;
    out.getContext('2d').drawImage(canvas, x0, y0, cropW, cropH, 0, 0, cropW, cropH);

    const trimmed = await new Promise((resolve) => out.toBlob(resolve, 'image/png'));
    return { blob: trimmed || blob, framing };
};

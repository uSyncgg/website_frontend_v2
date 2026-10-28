import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import styles from "./FormPFPUpload.module.css";

const OUTPUT_SIZE = 512;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
});

// Draws the selected square of the source image onto a fixed-size canvas and
// returns it as a File, so the form submits it exactly like a picked file.
const cropToFile = async (src, area, sourceFile) => {
    const img = await loadImage(src);
    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    // PNG keeps transparency; everything else becomes a compact JPEG.
    const type = sourceFile.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await new Promise(resolve => canvas.toBlob(resolve, type, 0.92));
    const baseName = sourceFile.name.replace(/\.[^.]+$/, "") || "profile";
    return new File([blob], `${baseName}.${type === "image/png" ? "png" : "jpg"}`, { type });
};

export const ImageCropModal = ({ file, onCancel, onApply }) => {
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(MIN_ZOOM);
    const [area, setArea] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setSrc(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onCancel();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onCancel]);

    const onCropComplete = useCallback((_, pixels) => setArea(pixels), []);

    const apply = async () => {
        if (!area) return;
        setSaving(true);
        try {
            onApply(await cropToFile(src, area, file));
        } finally {
            setSaving(false);
        }
    };

    const stepZoom = (delta) => setZoom(z => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)));

    return (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="pfp-crop-title">
            <div className={styles.modal}>
                <h2 id="pfp-crop-title" className={styles.modalTitle}>Crop your photo</h2>
                <p className={styles.modalHint}>Drag to reposition. Pinch, scroll or use the slider to zoom.</p>

                <div className={styles.cropArea}>
                    {src &&
                        <Cropper
                            image={src}
                            crop={crop}
                            zoom={zoom}
                            minZoom={MIN_ZOOM}
                            maxZoom={MAX_ZOOM}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    }
                </div>

                <div className={styles.zoomRow}>
                    <button type="button" className={styles.zoomBtn} onClick={() => stepZoom(-0.25)} aria-label="Zoom out">
                        <FaSearchMinus />
                    </button>
                    <input
                        type="range"
                        min={MIN_ZOOM}
                        max={MAX_ZOOM}
                        step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className={styles.zoomSlider}
                        aria-label="Zoom"
                    />
                    <button type="button" className={styles.zoomBtn} onClick={() => stepZoom(0.25)} aria-label="Zoom in">
                        <FaSearchPlus />
                    </button>
                </div>

                <div className={styles.modalActions}>
                    <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
                    <button type="button" className={styles.applyBtn} onClick={apply} disabled={!area || saving}>
                        {saving ? "Saving..." : "Apply"}
                    </button>
                </div>
            </div>
        </div>
    );
};

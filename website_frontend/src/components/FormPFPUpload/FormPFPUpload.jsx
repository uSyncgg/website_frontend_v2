import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ImageCropModal } from "./ImageCropModal";
import styles from "./FormPFPUpload.module.css";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// currentUrl: an already-saved picture to show until a new file is picked (profile settings).
export const FormPFPUpload = ({ id, name, label, required, currentUrl, inputClassName, labelClassName, errorClassName, onFieldChange }) => {
    const { register, formState: { errors } } = useFormContext();
    const [previewUrl, setPreviewUrl] = useState(null);
    // The picked image waiting in the crop dialog, and the last uncropped original
    // (so "Adjust" can re-crop from the full image rather than the cropped one).
    const [cropFile, setCropFile] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const inputRef = useRef(null);
    // What the input held before the crop dialog opened, restored on cancel.
    const appliedFiles = useRef(null);
    const { onChange: rhfOnChange, ref: rhfRef, ...fieldProps } = register(name, {
        required: required ? "This field is required" : false,
        validate: {
            fileType: (files) =>
                !files?.length || ACCEPTED_TYPES.includes(files[0].type) || "File must be a JPG, PNG, or WEBP image",
            fileSize: (files) =>
                !files?.length || files[0].size <= MAX_FILE_SIZE || "File must be 5MB or smaller",
        },
    });

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // Puts `files` in the real input and tells react-hook-form, as if picked by hand.
    const commitFiles = (files) => {
        const input = inputRef.current;
        input.files = files;
        appliedFiles.current = files;
        rhfOnChange({ target: input, type: "change" });
        const file = files?.[0] ?? null;
        setPreviewUrl(file ? URL.createObjectURL(file) : null);
        onFieldChange?.(file);
    };

    const handlePick = (e) => {
        const file = e.target.files?.[0] ?? null;
        // Nothing picked, or a type we can't crop: hand straight to validation.
        if (!file || !ACCEPTED_TYPES.includes(file.type)) {
            commitFiles(e.target.files);
            return;
        }
        setCropFile(file);
    };

    const handleCropApply = (cropped) => {
        const transfer = new DataTransfer();
        transfer.items.add(cropped);
        setOriginalFile(cropFile);
        setCropFile(null);
        commitFiles(transfer.files);
    };

    const handleCropCancel = () => {
        setCropFile(null);
        // Undo the browser's selection so the input matches what's previewed.
        if (appliedFiles.current) {
            inputRef.current.files = appliedFiles.current;
        } else {
            inputRef.current.value = "";
        }
    };

    return (
        <div className={styles.field}>
            {label && <label htmlFor={id} className={`${styles.label} ${labelClassName}`}>{label}</label>}
            <div className={styles.row}>
                <span className={styles.preview}>
                    {previewUrl || currentUrl ? <img src={previewUrl ?? currentUrl} alt="Profile preview" /> : "?"}
                </span>
                <label htmlFor={id} className={styles.uploadBtn}>Upload a photo</label>
                {originalFile && previewUrl &&
                    <button type="button" className={styles.adjustBtn} onClick={() => setCropFile(originalFile)}>
                        Adjust
                    </button>
                }
                <input
                    id={id}
                    type="file"
                    accept={ACCEPTED_TYPES.join(',')}
                    {...fieldProps}
                    ref={(el) => {
                        rhfRef(el);
                        inputRef.current = el;
                    }}
                    onChange={handlePick}
                    className={`${styles.input} ${inputClassName}`}
                />
            </div>
            {cropFile &&
                <ImageCropModal file={cropFile} onCancel={handleCropCancel} onApply={handleCropApply} />
            }
            {errors[name] && <span className={`${styles.error} ${errorClassName}`}>{errors[name].message}</span>}
        </div>
    )
}

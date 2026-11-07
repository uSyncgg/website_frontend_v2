import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ImageCropModal } from "./ImageCropModal";
import styles from "./FormPFPUpload.module.css";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// currentUrl: an already-saved picture to show until a new file is picked (profile settings).
export const FormPFPUpload = ({ id, name, label, required, currentUrl, inputClassName, labelClassName, errorClassName, onFieldChange }) => {
    const { register, watch, getValues, formState: { errors } } = useFormContext();
    const [previewUrl, setPreviewUrl] = useState(null);
    // The picked image waiting in the crop dialog, and the uncropped original of the
    // file the form currently holds (so "Adjust" re-crops from the full image).
    const [cropFile, setCropFile] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [cropError, setCropError] = useState(null);
    const inputRef = useRef(null);
    const { onChange: rhfOnChange, ref: rhfRef, ...fieldProps } = register(name, {
        required: required ? "This field is required" : false,
        validate: {
            fileType: (files) =>
                !files?.length || ACCEPTED_TYPES.includes(files[0].type) || "File must be a JPG, PNG, or WEBP image",
            fileSize: (files) =>
                !files?.length || files[0].size <= MAX_FILE_SIZE || "File must be 5MB or smaller",
        },
    });

    // The preview always follows react-hook-form's value, so it stays right after a
    // remount (stepping Back and forward) or a parent resetField.
    const file = watch(name)?.[0] ?? null;

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            setOriginalFile(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    // Puts `files` in the real input and tells react-hook-form, as if picked by hand.
    // `source` is the uncropped original, or null when the file wasn't cropped.
    const commitFiles = (files, source = null) => {
        const input = inputRef.current;
        input.files = files;
        rhfOnChange({ target: input, type: "change" });
        setOriginalFile(source);
        onFieldChange?.(files?.[0] ?? null);
    };

    // Puts the input back to what react-hook-form holds, undoing the browser's selection.
    const restoreInput = () => {
        const held = getValues(name);
        if (held?.length) {
            inputRef.current.files = held;
        } else {
            inputRef.current.value = "";
        }
    };

    const handlePick = (e) => {
        const picked = e.target.files?.[0] ?? null;
        setCropError(null);
        // Nothing picked, or a type we can't crop: hand straight to validation.
        if (!picked || !ACCEPTED_TYPES.includes(picked.type)) {
            commitFiles(e.target.files);
            return;
        }
        setCropFile(picked);
    };

    const handleCropApply = (cropped) => {
        const transfer = new DataTransfer();
        transfer.items.add(cropped);
        const source = cropFile;
        setCropFile(null);
        commitFiles(transfer.files, source);
    };

    const handleCropCancel = () => {
        setCropFile(null);
        restoreInput();
    };

    // A failed crop is thrown away; the user has to pick the photo again.
    const handleCropError = () => {
        handleCropCancel();
        setCropError("Something went wrong cropping your photo. Please try uploading it again.");
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
                <ImageCropModal file={cropFile} onCancel={handleCropCancel} onApply={handleCropApply} onError={handleCropError} />
            }
            {cropError && <span className={`${styles.error} ${errorClassName}`}>{cropError}</span>}
            {errors[name] && <span className={`${styles.error} ${errorClassName}`}>{errors[name].message}</span>}
        </div>
    )
}

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./FormPFPUpload.module.css";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 8 * 1024 * 1024;

export const FormPFPUpload = ({ id, name, label, required, inputClassName, labelClassName, errorClassName, onFieldChange }) => {
    const { register, formState: { errors } } = useFormContext();
    const [previewUrl, setPreviewUrl] = useState(null);
    const { onChange: rhfOnChange, ...fieldProps } = register(name, {
        required: required ? "This field is required" : false,
        validate: {
            fileType: (files) =>
                !files?.length || ACCEPTED_TYPES.includes(files[0].type) || "File must be a JPG, PNG, GIF, or WEBP image",
            fileSize: (files) =>
                !files?.length || files[0].size <= MAX_FILE_SIZE || "File must be 8MB or smaller",
        },
    });

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return (
        <div className={styles.field}>
            {label && <label htmlFor={id} className={`${styles.label} ${labelClassName}`}>{label}</label>}
            <div className={styles.row}>
                <span className={styles.preview}>
                    {previewUrl ? <img src={previewUrl} alt="Profile preview" /> : "?"}
                </span>
                <label htmlFor={id} className={styles.uploadBtn}>Upload a photo</label>
                <input
                    id={id}
                    type="file"
                    accept={ACCEPTED_TYPES.join(',')}
                    {...fieldProps}
                    onChange={(e) => {
                        rhfOnChange(e);
                        const file = e.target.files?.[0] ?? null;
                        setPreviewUrl(file ? URL.createObjectURL(file) : null);
                        onFieldChange?.(file);
                    }}
                    className={`${styles.input} ${inputClassName}`}
                />
            </div>
            {errors[name] && <span className={`${styles.error} ${errorClassName}`}>{errors[name].message}</span>}
        </div>
    )
}

import { useFormContext } from "react-hook-form";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 8 * 1024 * 1024;

export const FormPFPUpload = ({ id, name, label, required, inputClassName, labelClassName, errorClassName, onFieldChange }) => {
    const { register, formState: { errors } } = useFormContext();
    const { onChange: rhfOnChange, ...fieldProps } = register(name, {
        required: required ? "This field is required" : false,
        validate: {
            fileType: (files) =>
                !files?.length || ACCEPTED_TYPES.includes(files[0].type) || "File must be a JPG, PNG, GIF, or WEBP image",
            fileSize: (files) =>
                !files?.length || files[0].size <= MAX_FILE_SIZE || "File must be 8MB or smaller",
        },
    });

    return (
        <div>
            {label && <label htmlFor={id} className={labelClassName}>{label}</label>}
            <input
                id={id}
                type="file"
                accept={ACCEPTED_TYPES.join(',')}
                {...fieldProps}
                onChange={(e) => {
                    rhfOnChange(e);
                    onFieldChange?.(e.target.files?.[0] ?? null);
                }}
                className={inputClassName}
            />
            {errors[name] && <span className={errorClassName}>{errors[name].message}</span>}
        </div>
    )
}

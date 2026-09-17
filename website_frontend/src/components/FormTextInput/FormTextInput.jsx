import { useFormContext } from "react-hook-form";
import styles from "./FormTextInput.module.css";

export const FormTextInput = (
    {
        id,
        required,
        name,
        placeholder,
        label,
        type='',
        disabled,
        taken="",
        image="",
        initials="",
        inputClassName,
        errorClassName,
        labelClassName,
        imageClassName="",
        onFieldBlur
    }
) => {
    const { register, formState: { errors } } = useFormContext();
    const { onBlur: rhfOnBlur, ...fieldProps } = register(name, {
        required: required ? "This field is required" : false
    });
    const isRow = !!(image || initials);

    return (
        <div className={`${styles.field} ${isRow ? styles.linkRow : ''}`}>
            {image && <img src={image} title={name} alt="" className={`${styles.linkGlyph} ${imageClassName}`}/>}
            {!image && initials && <span title={name} className={`${styles.linkGlyph} ${styles.linkGlyphText} ${imageClassName}`}>{initials}</span>}
            {label && <label htmlFor={id} className={`${isRow ? styles.linkLabel : styles.label} ${labelClassName}`}>{label}</label>}
            <input
                id={id}
                {...fieldProps}
                onBlur={(e) => {
                    rhfOnBlur(e);
                    onFieldBlur?.(e.target.value);
                }}
                placeholder={placeholder}
                type={type}
                className={`${isRow ? styles.linkInput : styles.input} ${inputClassName}`}
                disabled={disabled}
                readOnly={disabled}
            />

            {errors[name] && (
                <span className={`${styles.error} ${errorClassName}`}>{errors[name].message}</span>
            )}

            {taken !== "" && (
                <span className={`${styles.error} ${errorClassName}`}>{taken} is already taken.</span>
            )}
        </div>
    )
}

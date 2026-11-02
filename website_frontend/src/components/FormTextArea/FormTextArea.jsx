import { useFormContext } from "react-hook-form";
import styles from "./FormTextArea.module.css";

export const FormTextArea = (
    { 
        id, 
        required, 
        name, 
        placeholder, 
        label,
        maxLength, 
        disabled, 
        inputClassName, 
        errorClassName, 
        counterClassName,
        labelClassName,
        onFieldBlur 
    }
) => {
    const { register, watch, formState: { errors } } = useFormContext();
    const { onBlur: rhfOnBlur, ...fieldProps } = register(name, {
        required: required ? "This field is required" : false,
        maxLength: maxLength ? { value: maxLength, message: `Must be ${maxLength} characters or fewer` } : undefined,
    });
    const value = watch(name) ?? "";

    return (
        <div className={styles.field}>
            {label && <label htmlFor={id} className={`${styles.label} ${labelClassName}`}>{label}</label>}
            <textarea
                id={id}
                {...fieldProps}
                onBlur={(e) => {
                    rhfOnBlur(e);
                    onFieldBlur?.(e.target.value);
                }}
                placeholder={placeholder}
                className={`${styles.textarea} ${inputClassName}`}
                disabled={disabled}
                readOnly={disabled}
            />

            {maxLength && (
                <span className={`${styles.counter} ${counterClassName}`}>{value.length}/{maxLength}</span>
            )}

            {errors[name] && <span className={`${styles.error} ${errorClassName}`}>{errors[name].message}</span>}
        </div>
    )
}
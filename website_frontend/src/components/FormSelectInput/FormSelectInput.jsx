import { useFormContext } from "react-hook-form";
import styles from "./FormSelectInput.module.css";

export const FormSelectInput = ({ id, required, name, label, placeholder, options, disabled, inputClassName, labelClassName, errorClassName, onFieldBlur }) => {
    const { register, formState: { errors } } = useFormContext();
    const { onBlur: rhfOnBlur, ...fieldProps } = register(name, {
        required: required ? "This field is required" : false
    });

    return (
        <div className={styles.field}>
            {label && <label htmlFor={id} className={`${styles.label} ${labelClassName}`}>{label}</label>}
            <select
                id={id}
                {...fieldProps}
                onBlur={(e) => {
                    rhfOnBlur(e);
                    onFieldBlur?.(e.target.value);
                }}
                defaultValue=""
                className={`${styles.select} ${inputClassName}`}
                disabled={disabled}
            >
                <option value="" disabled>{placeholder}</option>
                {/* Keyed by index: a list may pin an option above its normal spot, repeating its value. */}
                {options.map((opt, i) => (
                    <option key={i} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
                ))}
            </select>

            {errors[name] && <span className={`${styles.error} ${errorClassName}`}>{errors[name].message}</span>}
        </div>
    )
}
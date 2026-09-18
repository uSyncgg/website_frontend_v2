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
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>

            {errors[name] && <span className={`${styles.error} ${errorClassName}`}>{errors[name].message}</span>}
        </div>
    )
}
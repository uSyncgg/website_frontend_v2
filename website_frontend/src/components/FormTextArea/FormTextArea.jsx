import { useFormContext } from "react-hook-form";

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
        <div>
            {label && <label htmlFor={id} className={labelClassName}>{label}</label>}
            <textarea
                id={id}
                {...fieldProps}
                onBlur={(e) => {
                    rhfOnBlur(e);
                    onFieldBlur?.(e.target.value);
                }}
                placeholder={placeholder}
                className={inputClassName}
                disabled={disabled}
                readOnly={disabled}
            />

            {maxLength && (
                <span className={counterClassName}>{value.length}/{maxLength}</span>
            )}

            {errors[name] && <span className={errorClassName}>{errors[name].message}</span>}
        </div>
    )
}
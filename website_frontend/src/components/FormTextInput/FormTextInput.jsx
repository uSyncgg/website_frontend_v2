import { useFormContext } from "react-hook-form";

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
    
    return (
        <div>
            {image && <img src={image} title={name} className={imageClassName}/>}
            {label && <label htmlFor={id} className={labelClassName}>{label}</label>}
            <input 
                id={id} 
                {...fieldProps}
                onBlur={(e) => {
                    rhfOnBlur(e);
                    onFieldBlur?.(e.target.value);
                }} 
                placeholder={placeholder} 
                type={type}
                className={inputClassName}
                disabled={disabled}
                readOnly={disabled}
            />

            {errors[name] && (
                <span className={errorClassName}>{errors[name].message}</span>
            )}

            {taken !== "" && (
                <span className={errorClassName}>{taken} is already taken.</span>
            )}
        </div>
    )  
}

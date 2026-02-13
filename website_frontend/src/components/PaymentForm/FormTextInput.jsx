import { useFormContext } from "react-hook-form";
import styles from './PaymentForm.module.css';
import React from "react";

export const FormTextInput = ({ id, required, name, placeholder, type='', disabled, taken="" }) => {
    const { register, formState: { errors } } = useFormContext();
    
    return (
        <div>
        <input 
            id={id} 
            {...register(name, { required: required})} 
            placeholder={placeholder} 
            type={type}
            className={styles.input}
            disabled={disabled}
            readOnly={disabled}
        />

        {errors[name] && (
            <span className={styles.formError}>{errors[name].message}</span>
        )}

        {taken !== "" && (
            <span className={styles.formError}>{taken} is already taken.</span>
        )}
        </div>
    )  
}

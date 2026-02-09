import { useFormContext } from "react-hook-form";
import styles from './PaymentForm.module.css';
import React from "react";

export const FormTextInput = ({ id, required, name, placeholder, type='' }) => {
    const { register, formState: { errors } } = useFormContext();
    
    return (
        <div>
        <input 
            id={id} 
            {...register(name, { required: required})} 
            placeholder={placeholder} 
            type={type}
            className={styles.input}
        />

        {errors[name] && (
            <span className={styles.error}>{errors[name].message}</span>
        )}
        </div>
    )  
}

import { useFormContext } from "react-hook-form";
import styles from './PaymentForm.module.css';
import React from "react";

const TEXT_LIKE_TYPES = ['text', 'email', 'number', 'tel', 'date'];

function getNestedError(errors, name) {
    return name.split('.').reduce((acc, key) => acc?.[key], errors);
}

// Renders one field from a backend-provided field schema (a tier's
// `player_fields` or `form_fields`). Entries aren't uniform (e.g. a text
// field has no `options`), so every property is read defensively and
// unrecognized `type`s fall back to a plain text input rather than
// rendering nothing. `name` is the full react-hook-form field path the
// caller wants this value registered under (e.g. `custom_fields.shirt_size`
// or `player_info.0.socials.Twitter`), since the same field schema shape is
// reused at different nesting depths depending on where it came from.
export const DynamicFormField = ({ field, name, label }) => {
    const { register, formState: { errors } } = useFormContext();
    const displayLabel = label || field.label || field.key;
    const requiredMessage = field.required ? `${displayLabel} is required.` : false;
    const fieldError = getNestedError(errors, name);

    if (field.type === 'select') {
        return (
            <div>
                <label htmlFor={name} className={styles.requiredLabel}>
                    {displayLabel}{field.required && <span> *</span>}
                </label>
                <select id={name} className={styles.input} defaultValue="" {...register(name, { required: requiredMessage })}>
                    <option value="" disabled>Select...</option>
                    {(field.options || []).map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                {fieldError && <span className={styles.formError}>{fieldError.message}</span>}
            </div>
        );
    }

    if (field.type === 'checkbox') {
        return (
            <div>
                <label className={styles.requiredLabel}>
                    <input type="checkbox" {...register(name, { required: requiredMessage })} /> {displayLabel}
                </label>
                {fieldError && <span className={styles.formError}>{fieldError.message}</span>}
            </div>
        );
    }

    if (field.type === 'textarea') {
        return (
            <div>
                <label htmlFor={name} className={styles.requiredLabel}>
                    {displayLabel}{field.required && <span> *</span>}
                </label>
                <textarea
                    id={name}
                    className={styles.input}
                    placeholder={field.placeholder || ''}
                    {...register(name, { required: requiredMessage })}
                />
                {fieldError && <span className={styles.formError}>{fieldError.message}</span>}
            </div>
        );
    }

    const inputType = TEXT_LIKE_TYPES.includes(field.type) ? field.type : 'text';

    return (
        <div>
            <label htmlFor={name} className={styles.requiredLabel}>
                {displayLabel}{field.required && <span> *</span>}
            </label>
            <input
                id={name}
                type={inputType}
                className={styles.input}
                placeholder={field.placeholder || ''}
                {...register(name, { required: requiredMessage })}
            />
            {fieldError && <span className={styles.formError}>{fieldError.message}</span>}
        </div>
    );
};

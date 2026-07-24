import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from './AccountUI.module.css';

export const AccountField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    error,
    hideable = false,
    hidden = false,
    onToggleHide,
    autoComplete,
    as = "input",
    options = [],
    span = 1,
}) => {
    const inputId = `field-${name}`;

    return (
        <div className={styles.field} style={span > 1 ? { gridColumn: `span ${span}` } : undefined}>
            <div className={styles.labelRow}>
                <label htmlFor={inputId} className={styles.label}>
                    {label} {required && <span className={styles.required}>*</span>}
                </label>

                {hideable && (
                    <button
                        type="button"
                        className={styles.hideToggle}
                        onClick={onToggleHide}
                        aria-pressed={hidden}
                        title={hidden ? "Hidden from your public profile" : "Visible on your public profile"}
                    >
                        {hidden ? <FaEyeSlash /> : <FaEye />}
                        {hidden ? "Hidden" : "Visible"}
                    </button>
                )}
            </div>

            {as === "select" ? (
                <select
                    id={inputId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${styles.input} ${error ? styles.inputError : ''}`}
                >
                    <option value="" disabled>{placeholder || 'Select...'}</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    id={inputId}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`${styles.input} ${error ? styles.inputError : ''}`}
                />
            )}

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

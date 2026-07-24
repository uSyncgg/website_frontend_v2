import { useState } from "react";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import styles from './AccountUI.module.css';

const scorePassword = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score, 4);
};

const STRENGTH_LABELS = ['Too weak', 'Weak', 'Okay', 'Strong', 'Very strong'];
const STRENGTH_CLASS = ['weak0', 'weak1', 'weak2', 'strong', 'strong'];

const REQUIREMENTS = [
    { key: 'length', label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
    { key: 'lower', label: 'A lowercase letter', test: (pw) => /[a-z]/.test(pw) },
    { key: 'upper', label: 'An uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
    { key: 'number', label: 'A number', test: (pw) => /\d/.test(pw) },
    { key: 'special', label: 'A special character', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

export const PasswordField = ({ label = "Password", name = "password", value, onChange, required = true, error, autoComplete = "new-password", showStrength = true }) => {
    const [visible, setVisible] = useState(false);
    const score = scorePassword(value);
    const inputId = `field-${name}`;

    return (
        <div className={styles.field}>
            <div className={styles.labelRow}>
                <label htmlFor={inputId} className={styles.label}>
                    {label} {required && <span className={styles.required}>*</span>}
                </label>
            </div>

            <div className={styles.passwordWrap}>
                <input
                    id={inputId}
                    name={name}
                    type={visible ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder="••••••••"
                    autoComplete={autoComplete}
                    className={`${styles.input} ${error ? styles.inputError : ''}`}
                />
                <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setVisible(v => !v)}
                    aria-label={visible ? "Hide password" : "Show password"}
                >
                    {visible ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            {showStrength && value && (
                <div className={styles.strengthWrap}>
                    <div className={styles.strengthTrack}>
                        <div className={`${styles.strengthFill} ${styles[STRENGTH_CLASS[score]]}`} style={{ width: `${(score / 4) * 100}%` }} />
                    </div>
                    <span className={styles.strengthLabel}>{STRENGTH_LABELS[score]}</span>
                </div>
            )}

            {showStrength && (
                <ul className={styles.passwordRequirements}>
                    {REQUIREMENTS.map(req => {
                        const met = req.test(value || '');
                        return (
                            <li key={req.key} className={met ? styles.requirementMet : ''}>
                                <FaCheck className={styles.requirementIcon} />
                                {req.label}
                            </li>
                        );
                    })}
                </ul>
            )}

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

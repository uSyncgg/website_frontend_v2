import styles from "./AuthPage.module.css";

// Matches the password requirements set in Supabase (Authentication → Policies).
const RULES = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "An uppercase letter (A–Z)", test: (p) => /[A-Z]/.test(p) },
    { label: "A lowercase letter (a–z)", test: (p) => /[a-z]/.test(p) },
    { label: "A number (0–9)", test: (p) => /[0-9]/.test(p) },
    { label: "A special character (like ! @ # $ %)", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export const PASSWORD_HINT = "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.";

// react-hook-form validate rule for new passwords.
export const validatePassword = (value = "") => RULES.every(rule => rule.test(value)) || PASSWORD_HINT;

// Supabase's own weak-password message lists every allowed character; show ours instead.
export const friendlyAuthError = (error) =>
    error.code === "weak_password" || /password should/i.test(error.message) ? PASSWORD_HINT : error.message;

// Live list of the password rules; each turns green once it's met.
export const PasswordChecklist = ({ password = "" }) => (
    <ul className={styles.checklist} aria-label="Your password must include">
        {RULES.map(rule => {
            const met = rule.test(password);
            return (
                <li key={rule.label} className={met ? styles.checkMet : undefined} aria-checked={met} role="checkbox" aria-readonly="true">
                    <span aria-hidden="true">{met ? "✓" : "○"}</span>
                    {rule.label}
                </li>
            );
        })}
    </ul>
);

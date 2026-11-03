import { useWatch } from "react-hook-form";
import { PASSWORD_RULES } from "utils/passwordRules";
import styles from "./PasswordChecklist.module.css";

// Live list of the password rules; each turns green once it's met.
// useWatch keeps the re-render on each keystroke inside this list instead of the whole page.
export const PasswordChecklist = ({ control, name = "password" }) => {
    const password = useWatch({ control, name, defaultValue: "" }) ?? "";

    return (
        <ul className={styles.checklist} aria-label="Your password must include">
            {PASSWORD_RULES.map(rule => {
                const met = rule.test(password);
                return (
                    <li key={rule.label} className={met ? styles.checkMet : undefined}>
                        <span aria-hidden="true">{met ? "✓" : "○"}</span>
                        {rule.label}
                        {/* The icon and colour are visual only; screen readers get the state as text. */}
                        <span className={styles.srOnly}>{met ? " (met)" : " (not met)"}</span>
                    </li>
                );
            })}
        </ul>
    );
};

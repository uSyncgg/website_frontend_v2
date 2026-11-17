import styles from "./Segmented.module.css";

// A row of toggle buttons. options: [{ key, label }].
// Picks one key by default; with `multiple`, value is an array of the selected keys.
export const Segmented = ({ options, value, onChange, label, multiple = false }) => {
    const isOn = (key) => (multiple ? value.includes(key) : value === key);
    const toggle = (key) => {
        if (!multiple) onChange(key);
        else onChange(isOn(key) ? value.filter(k => k !== key) : [...value, key]);
    };

    return (
        <div className={styles.segmented} role="group" aria-label={label}>
            {options.map(opt => (
                <button
                    key={opt.key}
                    type="button"
                    className={`${styles.segment} ${isOn(opt.key) ? styles.segmentActive : ''}`}
                    aria-pressed={isOn(opt.key)}
                    onClick={() => toggle(opt.key)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
};

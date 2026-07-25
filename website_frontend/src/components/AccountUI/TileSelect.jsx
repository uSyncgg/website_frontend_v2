import { FaCheck } from "react-icons/fa";
import styles from './AccountUI.module.css';

export const TileSelect = ({ options, value, onChange, multi = false, compact = false }) => {
    const isSelected = (optValue) => multi ? (value || []).includes(optValue) : value === optValue;

    const handleClick = (optValue) => {
        if (multi) {
            const current = value || [];
            onChange(current.includes(optValue) ? current.filter(v => v !== optValue) : [...current, optValue]);
        } else {
            onChange(optValue);
        }
    };

    return (
        <div className={`${styles.tileGrid} ${compact ? styles.tileGridCompact : ''}`}>
            {options.map(opt => {
                const selected = isSelected(opt.value);
                const Icon = opt.icon;

                return (
                    <button
                        type="button"
                        key={opt.value}
                        className={`${styles.tile} ${selected ? styles.tileSelected : ''}`}
                        onClick={() => handleClick(opt.value)}
                        aria-pressed={selected}
                    >
                        {selected && <FaCheck className={styles.tileCheck} />}
                        {opt.logo ? <img src={opt.logo} alt="" className={styles.tileLogo} /> : Icon && <Icon className={styles.tileIcon} />}
                        <span className={styles.tileLabel}>{opt.label}</span>
                        {opt.description && <span className={styles.tileDescription}>{opt.description}</span>}
                    </button>
                );
            })}
        </div>
    );
};

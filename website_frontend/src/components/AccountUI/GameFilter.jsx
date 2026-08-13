import styles from './AccountUI.module.css';
import { GAMES } from '../../pages/Account/SignUp/accountData';

/**
 * Scopes the whole profile to one title, or sums every title together.
 *
 * A career doesn't mean much averaged across games — a CoD record and a CS2
 * record are different careers. This is the control that says which one you're
 * reading, and every number below it follows.
 *
 * Chips on desktop (a profile rarely has more than four or five games); a
 * plain select on phones, where a row of chips would wrap into a wall.
 */
export const GameFilter = ({ games = [], value = 'all', onChange, label = 'Showing stats for' }) => {
    const options = [{ value: 'all', label: 'All games' }].concat(
        games
            .filter(g => g !== 'other')
            .map(g => GAMES.find(x => x.value === g))
            .filter(Boolean)
            .map(g => ({ value: g.value, label: g.label, logo: g.logo }))
    );

    if (options.length < 2) return null;

    return (
        <div className={styles.gameFilter}>
            <span className={styles.gameFilterLabel}>{label}</span>

            <div className={styles.gameFilterChips} role="tablist" aria-label={label}>
                {options.map(opt => (
                    <button
                        type="button"
                        key={opt.value}
                        role="tab"
                        aria-selected={value === opt.value}
                        className={`${styles.gameChip} ${value === opt.value ? styles.gameChipActive : ''}`}
                        onClick={() => onChange?.(opt.value)}
                    >
                        {opt.logo && <img src={opt.logo} alt="" />}
                        {opt.label}
                    </button>
                ))}
            </div>

            <select
                className={`${styles.input} ${styles.gameFilterSelect}`}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                aria-label={label}
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    );
};

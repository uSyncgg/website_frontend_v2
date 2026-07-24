import { SiGoogle, SiApple, SiTwitch } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import styles from './AccountUI.module.css';

const PROVIDERS = [
    { id: 'google', label: 'Google', icon: SiGoogle, className: 'oauthGoogle' },
    { id: 'twitch', label: 'Twitch', icon: SiTwitch, className: 'oauthTwitch' },
    { id: 'apple', label: 'Apple', icon: SiApple, className: 'oauthApple' },
    { id: 'twitter', label: 'X', icon: FaXTwitter, className: 'oauthTwitter' },
];

export const OAuthButtons = ({ onSelect, label = "Or continue with" }) => {
    return (
        <div className={styles.oauthSection}>
            <div className={styles.dividerRow}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerLabel}>{label}</span>
                <span className={styles.dividerLine} />
            </div>

            <div className={styles.oauthGrid}>
                {PROVIDERS.map(({ id, label, icon: Icon, className }) => (
                    <button
                        key={id}
                        type="button"
                        className={`${styles.oauthButton} ${styles[className]}`}
                        onClick={() => onSelect?.(id)}
                    >
                        <Icon />
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

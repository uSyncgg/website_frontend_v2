import { FaMedal } from "react-icons/fa";
import styles from './AccountUI.module.css';

export const GBRankCard = ({ gbUsername, rank }) => (
    <div className={styles.rankCard}>
        <div className={styles.rankBadge} style={{ background: `${rank.color}22`, color: rank.color, border: `1.5px solid ${rank.color}` }}>
            <FaMedal />
        </div>
        <div className={styles.rankInfo}>
            <p className={styles.rankUsername}>GameBattles · {gbUsername || "Not linked"}</p>
            <p className={styles.rankLabel}>{rank.label}</p>
        </div>
    </div>
);

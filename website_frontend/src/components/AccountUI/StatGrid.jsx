import styles from './AccountUI.module.css';

export const StatGrid = ({ stats = [] }) => (
    <div className={styles.statGrid}>
        {stats.map((stat) => (
            <div className={styles.statTile} key={stat.label}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
            </div>
        ))}
    </div>
);

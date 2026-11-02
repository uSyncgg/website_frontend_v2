import styles from './ProfileCard.module.css';

/**
 * Titled panel used for every profile section. The heading is followed by a
 * thin rule; `action` sits at the far right of that row (e.g. a segmented
 * control).
 */
export const ProfileCard = ({ title, action, children }) => {
    return (
        <section className={styles.card}>
            <div className={styles.head}>
                <h2 className={styles.title}>{title}</h2>
                <span className={styles.rule} />
                {action}
            </div>
            {children}
        </section>
    );
}

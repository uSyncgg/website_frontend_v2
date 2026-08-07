import styles from './SectionHeading.module.css';

/**
 * Label plus a trailing rule. Pattern piece — used to open any catalog section.
 * `aside` takes an optional right-hand slot (a result count, a clear button).
 */
export const SectionHeading = ({ label, aside }) => {
    return (
        <div className={styles.heading}>
            <h2 className={styles.label}>{label}</h2>
            <span className={styles.rule} />
            {aside !== undefined && <div className={styles.aside}>{aside}</div>}
        </div>
    );
}

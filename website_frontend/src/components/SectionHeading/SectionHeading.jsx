import styles from './SectionHeading.module.css';

export const SectionHeading = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>{children}</h2>
            <img className={styles.underline} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
        </div>
    );
}

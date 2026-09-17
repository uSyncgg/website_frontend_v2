import styles from './SectionHeading.module.css';
import underline from 'assets/images/misc/underline-decorative-graphic_9.6.26.webp';

export const SectionHeading = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>{children}</h2>
            <img className={styles.underline} src={underline} alt="underline" />
        </div>
    );
}

import { FaLock, FaCheckCircle } from "react-icons/fa";
import styles from './AccountUI.module.css';

export const VerifiedLock = ({ verified, title, description, ctaLabel = "Get Verified", onCtaClick, benefits = [], children }) => {
    if (verified) return children;

    return (
        <div className={styles.lockedSection}>
            <div className={styles.lockedIcon}><FaLock /></div>
            <p className={styles.lockedTitle}>{title}</p>
            <p className={styles.lockedText}>{description}</p>

            {benefits.length > 0 && (
                <ul className={styles.benefitList} style={{ textAlign: "left", maxWidth: "22rem", margin: "0 auto 1.25rem" }}>
                    {benefits.map(b => (
                        <li className={styles.benefitItem} key={b}>
                            <FaCheckCircle className={styles.benefitCheck} /> {b}
                        </li>
                    ))}
                </ul>
            )}

            <button type="button" className={styles.secondaryButton} onClick={onCtaClick}>{ctaLabel}</button>
        </div>
    );
};

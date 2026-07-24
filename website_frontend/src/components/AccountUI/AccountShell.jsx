import { FaArrowLeft } from "react-icons/fa";
import styles from './AccountUI.module.css';

export const AccountShell = ({ sidebar, children, onBack, backLabel = "Back" }) => {
    return (
        <div className={styles.shell}>
            {sidebar && <div className={styles.shellSidebarCol}>{sidebar}</div>}

            <div className={styles.shellMainCol}>
                <div className={styles.card}>
                    {onBack && (
                        <button type="button" className={styles.backButton} onClick={onBack}>
                            <FaArrowLeft /> {backLabel}
                        </button>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};

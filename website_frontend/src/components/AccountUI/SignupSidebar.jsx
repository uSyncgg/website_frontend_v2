import { FaCheck } from "react-icons/fa";
import styles from './AccountUI.module.css';

export const SignupSidebar = ({ steps, activeIndex, maxCompleted = 0, onStepClick, title = "Create account" }) => {
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>{title}</h2>

            <ol className={styles.sidebarList}>
                {steps.map((step, index) => {
                    const state = index < activeIndex ? 'done' : index === activeIndex ? 'active' : 'upcoming';
                    const clickable = index !== activeIndex && index <= maxCompleted;
                    const bubble = (
                        <span className={styles.sidebarBubble}>
                            {state === 'done' ? <FaCheck /> : index + 1}
                        </span>
                    );

                    return (
                        <li key={step} className={`${styles.sidebarStep} ${styles['sidebarStep_' + state]}`}>
                            {clickable ? (
                                <button type="button" className={styles.sidebarStepButton} onClick={() => onStepClick?.(index)}>
                                    {bubble}
                                    <span className={styles.sidebarLabel}>{step}</span>
                                </button>
                            ) : (
                                <>
                                    {bubble}
                                    <span className={styles.sidebarLabel}>{step}</span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </aside>
    );
};

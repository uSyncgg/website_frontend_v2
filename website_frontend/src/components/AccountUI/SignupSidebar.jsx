import { FaCheck } from "react-icons/fa";
import styles from './AccountUI.module.css';

// Numbered 1/2/3 bubbles made the flow read as "lots of steps" before anyone
// had done anything. A fill bar plus dots communicates the same progress
// without leading with the count.
export const SignupSidebar = ({ steps, activeIndex, maxCompleted = 0, onStepClick, title = "Create account" }) => {
    // Count the step you're on as underway rather than as zero — landing on
    // "0% complete" after already choosing an account type reads as no credit
    // for work done, which is the opposite of what a progress bar is for.
    const total = steps.length;
    const percent = total < 1 ? 0 : Math.round(((activeIndex + 1) / total) * 100);

    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>{title}</h2>

            <div className={styles.progressWrap}>
                <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${percent}%` }} />
                </div>
                <p className={styles.progressLabel}>{percent}% complete</p>
            </div>

            <ol className={styles.sidebarList}>
                {steps.map((step, index) => {
                    const state = index < activeIndex ? 'done' : index === activeIndex ? 'active' : 'upcoming';
                    const clickable = index !== activeIndex && index <= maxCompleted;
                    const bubble = (
                        <span className={styles.sidebarBubble}>
                            {state === 'done' ? <FaCheck /> : <span className={styles.sidebarDot} />}
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

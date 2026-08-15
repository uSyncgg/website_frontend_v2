import { FaCheck } from "react-icons/fa";
import styles from './AccountUI.module.css';

// Numbered 1/2/3 bubbles made the flow read as "lots of steps" before anyone
// had done anything. A fill bar plus dots communicates the same progress
// without leading with the count.
//
// Every step is clickable in both directions. The counter is a map of what the
// account needs, not a gate — people can look ahead, fill things out of order,
// and come back. What's actually enforced is the finish.
export const SignupSidebar = ({ steps, activeIndex, visited = [], onStepClick, title = "Create account" }) => {
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
                    const seen = visited.includes(index);
                    const state = index === activeIndex ? 'active' : (seen ? 'done' : 'upcoming');

                    return (
                        <li key={step} className={`${styles.sidebarStep} ${styles['sidebarStep_' + state]}`}>
                            <button
                                type="button"
                                className={styles.sidebarStepButton}
                                onClick={() => onStepClick?.(index)}
                                aria-current={index === activeIndex ? 'step' : undefined}
                            >
                                <span className={styles.sidebarBubble}>
                                    {state === 'done' ? <FaCheck /> : <span className={styles.sidebarDot} />}
                                </span>
                                <span className={styles.sidebarLabel}>{step}</span>
                            </button>
                        </li>
                    );
                })}
            </ol>

            <p className={styles.sidebarNote}>Jump to any step — nothing locks you out.</p>
        </aside>
    );
};

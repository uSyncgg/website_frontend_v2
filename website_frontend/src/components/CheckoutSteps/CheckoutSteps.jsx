import styles from './CheckoutSteps.module.css';
import { FaCheck } from 'react-icons/fa';

const DEFAULT_STEPS = ['Team Info', 'Review', 'Payment', 'Confirmation'];

export const CheckoutSteps = ({ active, steps = DEFAULT_STEPS }) => {
    return (
        <ol className={styles.steps}>
            {steps.map((label, index) => {
                const step = index + 1;
                const state = step < active ? 'done' : step === active ? 'active' : 'upcoming';

                return (
                    <li key={label} className={styles.step}>
                        <span className={`${styles.bubble} ${styles[state]}`}>
                            {state === 'done' ? <FaCheck /> : step}
                        </span>
                        <span className={`${styles.label} ${styles[state]}`}>{label}</span>
                        {step < steps.length && <span className={`${styles.connector} ${step < active ? styles.connectorDone : ''}`} />}
                    </li>
                );
            })}
        </ol>
    );
};

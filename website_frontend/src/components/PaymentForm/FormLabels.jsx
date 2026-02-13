import styles from './PaymentForm.module.css';

export const RequiredLabel = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className={styles.requiredLabel}>
        {children} <span>*</span>
    </label>
);

export const RegularLabel = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className={styles.requiredLabel}>
        {children}
    </label>
);

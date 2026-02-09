import styles from './PaymentForm.module.css';

export const RequiredLabel = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className={styles.required}>
        {children} <span>*</span>
    </label>
);

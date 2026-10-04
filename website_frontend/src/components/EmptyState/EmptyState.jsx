import styles from './EmptyState.module.css';

/**
 * Shared "nothing here" panel. Pattern piece — any catalog, any filter set.
 * `action` takes an optional button/link (usually "Clear filters").
 */
export const EmptyState = ({ title, body, action }) => {
    return (
        <div className={styles.empty}>
            <p className={styles.title}>{title}</p>
            {body !== undefined && <p className={styles.body}>{body}</p>}
            {action !== undefined && <div className={styles.action}>{action}</div>}
        </div>
    );
}

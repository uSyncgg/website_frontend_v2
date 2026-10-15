import styles from './LoadingWheel.module.css';

export const LoadingWheel = () => {
    return (
        <div className={`standardContainer ${styles.container}`}>
            <div className={styles.statusMessage}>
                <p className={`${styles.white} ${styles.statusText}`} role="status">Loading...</p>
            </div>
        </div>
    )
}

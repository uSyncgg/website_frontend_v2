import styles from './LoadingWheel.module.css';

export const LoadingWheel = () => {
    return (
        <div className={`standardContainer ${styles.container}`}>
            <div className={styles.statusMessage}>
                <h1 className={styles.white}>Loading...</h1>
            </div>
        </div>
    )
}

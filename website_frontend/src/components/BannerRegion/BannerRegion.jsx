import styles from './BannerRegion.module.css';

function BannerRegion({children}) {
    return (
        <p className={styles.region}>{children}</p>
    );
}

export default BannerRegion;

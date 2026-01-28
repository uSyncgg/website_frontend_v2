import styles from './BannerImage.module.css';

function BannerImage({path, imgUrl, alt}) {
    return (
        <a href={path}>
            <img src={imgUrl} alt={alt} className={styles.bannerImage} />
        </a>
    );
}

export default BannerImage;

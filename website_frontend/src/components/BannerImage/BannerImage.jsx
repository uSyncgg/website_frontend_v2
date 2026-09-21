import styles from './BannerImage.module.css';
import { Link } from 'react-router';
import React from 'react';

function BannerImage({path, imgUrl, alt}) {
    return (
        <div className={styles.bannerImageWrapper}>
            <Link to={path} onClick={(e) => e.stopPropagation()}>
                <img src={imgUrl} alt={alt} className={styles.bannerImage} loading="lazy" decoding="async" />
            </Link>
        </div>
    );
}

export default BannerImage;

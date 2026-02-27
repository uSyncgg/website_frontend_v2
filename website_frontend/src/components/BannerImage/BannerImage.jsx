import styles from './BannerImage.module.css';
import { Link } from 'react-router';
import { VerifiedImage } from 'components/VerifiedImage/VerifiedImage';
import React from 'react';

function BannerImage({path, imgUrl, alt, verified}) {
    return (
        <div className={styles.bannerImageWrapper}>
            {verified === true && 
                <VerifiedImage banner={true} />
            }

            <Link to={path}>
                <img src={imgUrl} alt={alt} className={styles.bannerImage} />
            </Link>
        </div>
    );
}

export default BannerImage;

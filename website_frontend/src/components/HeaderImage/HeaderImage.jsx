import styles from './HeaderImage.module.css';
import gameStyles from '../GameImage/GameImage.module.css';
import './HeaderImageStandard.css'
import React from 'react';

export const HeaderImage = ({ title, imageClass, verification }) => {

    return (
        <div className={`${styles.headerImage} ${imageClass} ${title === undefined ? styles.noTitle : ""}`}>
            {title !== undefined && verification === undefined &&
                <div className={styles.headerImageTitle}>
                    <h2 className={gameStyles.white}>{title}</h2>
                    <img className="underlineImg" src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                </div>
            }

            {verification !== undefined && 
                <div className={styles.verificationContainer}>
                    <img className={styles.verification} src='https://i.imgur.com/PCHIHQB.png' alt='uSync Verified' />
                    <img className={styles.verification} src="https://i.imgur.com/0MPIBOK.png" alt='nonVerified' />
                </div>
            }
        </div>
    )
}

import styles from './HeaderImage.module.css';
import gameStyles from '../GameImage/GameImage.module.css';
import './HeaderImageStandard.css'
import React from 'react';
import { Link } from 'react-router';

export const HeaderImage = ({ title, imageClass, verification, verified=false, location="" }) => {

    return (
        <div className={`${styles.headerImage} ${imageClass} ${title === undefined ? styles.noTitle : ""}`}>
            {title !== undefined && verification === undefined && verified === false &&
                <div className={styles.headerImageTitle}>
                    

                    <h2 className={gameStyles.white}>{title}</h2>
                    <img className="underlineImg" src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                    
                </div>
            }

            {title !== undefined && verification === undefined && verified === true &&
                <div className={styles.headerImageTitle}>
                    {location !== "" && 
                        <div className={styles.location}>
                            <p className={styles.locationText}>{location}</p>
                        </div>
                    }

                    <h2>{title}</h2>
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

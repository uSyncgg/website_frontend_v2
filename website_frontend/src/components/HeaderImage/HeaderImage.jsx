import styles from './HeaderImage.module.css';
import './HeaderImageStandard.css'
import React from 'react';

export const HeaderImage = ({ title, imageClass, verification, verified=false, location="", eyebrow, subtext }) => {

    // Split the title so the last word gets the gradient accent, matching the
    // homepage / tournaments hero (white lead line + gradient highlight).
    const words = title !== undefined ? title.trim().split(" ") : [];
    const accentWord = words.length > 1 ? words[words.length - 1] : null;
    const leadWords = accentWord !== null ? words.slice(0, -1).join(" ") : title;

    return (
        <div className={`${styles.headerImage} ${imageClass} ${title === undefined ? styles.noTitle : styles.withTitle}`}>
            {title !== undefined && verification === undefined && verified === false &&
                <div className={styles.headerImageTitle}>
                    {eyebrow !== undefined && <p className={styles.eyebrow}>{eyebrow}</p>}

                    <h2>
                        <span className={styles.white}>{leadWords}</span>
                        {accentWord !== null && <> <span className={styles.gradientText}>{accentWord}</span></>}
                    </h2>
                    <img className="underlineImg" src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                    {subtext !== undefined && <p className={styles.subtext}>{subtext}</p>}
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

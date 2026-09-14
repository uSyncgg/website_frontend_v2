import styles from './HeaderImage.module.css';
import './HeaderImageStandard.css'
import React from 'react';
import underline from 'assets/images/misc/underline-decorative-graphic_9.6.26.webp';
import verifiedBadge from 'assets/images/verification/verified-badge-usync-verified_9.6.26.webp';
import nonVerifiedBadge from 'assets/images/verification/verified-badge-non-verified_9.6.26.webp';

export const HeaderImage = ({ title, imageClass, imageUrl, verification, verified=false, location="", eyebrow, subtext }) => {

    // Split the title so the last word gets the gradient accent, matching the
    // homepage / tournaments hero (white lead line + gradient highlight).
    const words = title !== undefined ? title.trim().split(" ") : [];
    const accentWord = words.length > 1 ? words[words.length - 1] : null;
    const leadWords = accentWord !== null ? words.slice(0, -1).join(" ") : title;

    // imageUrl (from the event's DB payload) takes priority over the static
    // imageClass background once it has loaded.
    const style = imageUrl ? { '--bg-image': `url("${imageUrl}")` } : undefined;

    return (
        <div
            className={`${styles.headerImage} ${imageUrl ? '' : (imageClass || '')} ${title === undefined ? styles.noTitle : styles.withTitle}`}
            style={style}
        >
            {title !== undefined && verification === undefined && verified === false &&
                <div className={styles.headerImageTitle}>
                    {eyebrow !== undefined && <p className={styles.eyebrow}>{eyebrow}</p>}

                    <h1>
                        <span className={styles.white}>{leadWords}</span>
                        {accentWord !== null && <> <span className={styles.gradientText}>{accentWord}</span></>}
                    </h1>
                    <img className="underlineImg" src={underline} alt="underline" />

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

                    <h1>{title}</h1>
                </div>
            }

            {verification !== undefined &&
                <div className={styles.verificationContainer}>
                    <img className={styles.verification} src={verifiedBadge} alt='uSync Verified' />
                    <img className={styles.verification} src={nonVerifiedBadge} alt='nonVerified' />
                </div>
            }
        </div>
    )
}

import styles from './EventInfoCard.module.css';
import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle, FaWallet, FaTag, FaGlobe, FaLock } from 'react-icons/fa';
import { useAuth } from 'hooks';

const BUBBLE_CONFIG = {
    "Date/Place":   { icons: [<FaCalendarAlt />, <FaMapMarkerAlt />] },
    "Date":         { icons: [<FaCalendarAlt />] },
    "Region":       { icons: [<FaGlobe />] },
    "Type":         { icons: [<FaTag />] },
    "Region/Type":  { icons: [<FaGlobe />, <FaTag />] },
    "Restrictions": { icons: [<FaGlobe />] },
};

const FEE_TITLES = new Set(["Entry Fee", "Fees"]); 

export const EventInfoCard = ({ title, infoList, regionTitle, regionInfoList, footer }) => {
    const bubbleDef = BUBBLE_CONFIG[title];
    const { profileComplete, loading } = useAuth();

    if (bubbleDef) {
        const regionBubbleDef = regionTitle ? (BUBBLE_CONFIG[regionTitle] ?? { icons: [<FaGlobe />] }) : null;
        return (
            <div className={styles.statBar} data-bubble="true">
                {infoList.map((item, index) => (
                    <div key={index} className={styles.statChip}>
                        <span className={styles.statIcon}>
                            {bubbleDef.icons[index] ?? bubbleDef.icons[0]}
                        </span>
                        <span className={styles.statValue}>{item}</span>
                    </div>
                ))}
                {regionBubbleDef && regionInfoList && regionInfoList.map((item, index) => (
                    <div key={`r${index}`} className={styles.statChip}>
                        <span className={styles.statIcon}>
                            {regionBubbleDef.icons[index] ?? regionBubbleDef.icons[0]}
                        </span>
                        <span className={styles.statValue}>{item}</span>
                    </div>
                ))}            
            </div>
        );
    }

    if (FEE_TITLES.has(title)) {
        return (
            <div className={styles.feeCallout} data-fee-callout="true">
                <div className={styles.feeHeader}>
                    <span className={styles.feeIcon}><FaWallet /></span>
                    <span className={styles.feeLabel}>{title}</span>
                </div>
                <div className={styles.feeItems}>
                    {infoList.map((item, index) => (
                        <div key={index} className={styles.feeItem}>
                            <span className={styles.feeDot}></span>
                            <span className={styles.feeItemText}>{item}</span>
                        </div>
                    ))}
                </div>
                {footer && <div className={styles.feeFooter}> {footer} </div>}
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className={styles.eventCard}>
                <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}><FaInfoCircle /></span>
                    <span className={styles.title}>{title}</span>
                </div>

                {profileComplete && 
                infoList.map((item, index) => (
                    <div key={index} className={styles.dRow}>
                        <span className={styles.dDot}></span>
                        <span className={styles.dRowText}>{item}</span>
                    </div>
                ))}
                {footer && <div className={styles.feeFooter}> {footer} </div>}
                

                {!profileComplete && <p>Must be Logged in to View More Details.</p>}
            </div>
        </React.Fragment>
    );
}

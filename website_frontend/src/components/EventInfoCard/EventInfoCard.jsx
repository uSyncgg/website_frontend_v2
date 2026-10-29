import styles from './EventInfoCard.module.css';
import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle, FaWallet, FaTag, FaGlobe, FaLock } from 'react-icons/fa';
import { useAuth } from 'hooks';
import { Link, useLocation } from 'react-router';

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
    const { isLoggedIn, loading } = useAuth();
    const location = useLocation();
    const detailsLocked = !loading && !isLoggedIn && infoList.length === 0;

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

                {infoList.map((item, index) => (
                    <div key={index} className={styles.dRow}>
                        <span className={styles.dDot}></span>
                        <span className={styles.dRowText}>{item}</span>
                    </div>
                ))}
                {footer && <div className={styles.feeFooter}> {footer} </div>}

                {/* The backend withholds details from anonymous viewers, so an empty
                    list while signed out means "locked", not "no details". */}
                {detailsLocked &&
                    <div className={styles.locked}>
                        <div className={styles.lockedText}>Must be Logged in to View More Details.</div>
                        <div className={styles.lockedActions}>
                            {/* `from` brings the user back to this event after logging in. */}
                            <Link to="/signup" state={{ from: location }} className={styles.lockedPrimary}>Sign Up</Link>
                            <Link to="/login" state={{ from: location }} className={styles.lockedSecondary}>Log In</Link>
                        </div>
                    </div>
                }
            </div>
        </React.Fragment>
    );
}

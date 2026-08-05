import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaGlobe, FaExclamationCircle } from "react-icons/fa";
import styles from './AccountUI.module.css';

export const HostEventCard = ({ event, typeLabel }) => (
    <div className={styles.hostEventCard}>
        <div className={styles.hostEventHeader}>
            <h3 className={styles.hostEventTitle}>{event.name}</h3>
            <span className={`${styles.badge} ${styles.hostEventTypeBadge}`}>{typeLabel}</span>
        </div>

        {event.details && <p className={styles.hostEventDetails}>{event.details}</p>}

        <div className={styles.hostEventMetaRow}>
            {event.date && <span className={styles.hostEventMetaItem}><FaCalendarAlt /> {event.date}</span>}
            {event.location && <span className={styles.hostEventMetaItem}><FaMapMarkerAlt /> {event.location}</span>}
            {event.seasonality && <span className={styles.hostEventMetaItem}><FaCalendarAlt /> {event.seasonality}</span>}
            {event.region && <span className={styles.hostEventMetaItem}><FaGlobe /> {event.region}</span>}
            {event.teamSize && <span className={styles.hostEventMetaItem}><FaUsers /> Team size {event.teamSize}</span>}
            {event.restrictions && <span className={styles.hostEventMetaItem}><FaExclamationCircle /> {event.restrictions}</span>}
        </div>

        <div className={styles.hostEventFooter}>
            <span className={styles.hostEventFee}>{event.feePrice || event.fees || "Free"}</span>
            {event.url && <a className={styles.hostEventLink} href={event.url} target="_blank" rel="noreferrer">View event →</a>}
        </div>
    </div>
);

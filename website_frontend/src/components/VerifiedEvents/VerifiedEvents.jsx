import { HostBanner } from 'components/HostBanner/HostBanner';
import styles from './VerifiedEvents.module.css';

// The hub page lists one game's verified organizers across every format, so the
// banner's secondary line shows the event type rather than a region — regions
// vary per format and mixing the two reads as inconsistent.
const SECTION_LABELS = {
    Leagues: "Leagues",
    Lans: "LANs",
    Wagers: "Wagers",
    HeadToHead: "Head to Head",
};

export const VerifiedEvents = ({ events }) => {
    if (events.length === 0) {
        return (
            <p className={styles.empty}>
                No verified organizers on this title yet. Verification is open to any organizer running events here.
            </p>
        );
    }

    return (
        <div className={`eventBannerContainer ${styles.list}`}>
            {events.map(event => (
                <HostBanner key={`${event.section}-${event.path}`} path={event.path}>
                    <HostBanner.Title path={event.path} verified={true}>{event.name}</HostBanner.Title>
                    <HostBanner.Image path={event.path} imgUrl={event.imgUrl} alt={event.alt} verified={true} />
                    <HostBanner.Region>{SECTION_LABELS[event.section]}</HostBanner.Region>
                    <HostBanner.Button title={event.buttonTitle} path={event.path} />
                </HostBanner>
            ))}
        </div>
    );
}

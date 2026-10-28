import { Link, useParams } from "react-router";
import { FaCalendarAlt, FaGamepad, FaMapMarkerAlt, FaSitemap, FaTrophy } from "react-icons/fa";
import { Bracket } from "components/Bracket/Bracket";
import { useHostEvent, eventStage } from "services/hostEventsMock";
import { buildBracket } from "utils/bracket";
import { MockBanner, StageChip, entrantsById, formatDate, formatLabel, isTeamEvent } from "./hostShared";
import styles from "./Host.module.css";

// /brackets/:eventId - what players and spectators see. Read-only.
export const PublicBracket = () => {
    const { eventId } = useParams();
    const event = useHostEvent(eventId);

    if (!event) {
        return (
            <div className={`standardContainer ${styles.page}`}>
                <div className={`${styles.inner} ${styles.emptyState}`}>
                    <h1 className={styles.sectionTitle}>Event not found</h1>
                    <Link to="/" className={styles.secondaryBtn}>Back home</Link>
                </div>
            </div>
        );
    }

    const stage = eventStage(event);
    const byId = entrantsById(event);
    const published = event.bracket?.published;
    const built = published ? buildBracket(event.format, event.bracket.seeds, event.bracket.results) : null;

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>{`uSync | ${event.name} Bracket`}</title>

            <div className={styles.inner}>
                <MockBanner />

                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}>{event.game} event</p>
                        <h1 className={styles.title}>{event.name}</h1>
                        <div className={styles.metaRow}>
                            <StageChip stage={stage} />
                            <span><FaGamepad /> {event.teamSize}</span>
                            <span><FaCalendarAlt /> {formatDate(event.startsAt)}</span>
                            <span><FaSitemap /> {formatLabel(event.format)} · Bo{event.bestOf}</span>
                            <span><FaMapMarkerAlt /> {event.locationType === 'online' ? 'Online' : event.venue}</span>
                            {event.prize && <span><FaTrophy /> {event.prize}</span>}
                        </div>
                    </div>
                </div>

                {published
                    ? (
                        <section className={styles.card}>
                            <Bracket format={event.format} built={built} entrants={byId} />
                        </section>
                    )
                    : (
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Bracket coming soon</h2>
                            <p className={styles.muted} style={{ marginTop: 0 }}>
                                The host will post the bracket once sign-ups close. {event.entrants.length} {isTeamEvent(event) ? 'teams' : 'players'} registered so far.
                            </p>
                            <div className={styles.btnRow} style={{ flexWrap: 'wrap' }}>
                                {event.entrants.map(e => <span key={e.id} className={styles.chip} style={{ color: 'var(--ink-2)' }}>{e.name}</span>)}
                            </div>
                        </section>
                    )
                }

                {event.rules &&
                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Rules</h2>
                        <p className={styles.preWrap}>{event.rules}</p>
                    </section>
                }
            </div>
        </div>
    );
};

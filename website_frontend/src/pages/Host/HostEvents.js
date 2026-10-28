import { Link } from "react-router";
import { FaCalendarAlt, FaGamepad, FaPlus, FaSitemap } from "react-icons/fa";
import { useHostEvents, eventStage } from "services/hostEventsMock";
import { MockBanner, StageChip, capacityLabel, formatDate, formatLabel, unitLabel } from "./hostShared";
import styles from "./Host.module.css";

// /host/events - every event this host runs.
export const HostEvents = () => {
    const events = useHostEvents();

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>uSync | Host Dashboard</title>
            <meta name="robots" content="noindex, nofollow" />

            <div className={styles.inner}>
                <MockBanner />

                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}>Host Dashboard</p>
                        <h1 className={styles.title}>Your events</h1>
                        <p className={styles.subtitle}>Set up events, manage who's playing, and run the bracket - all on uSync.</p>
                    </div>
                    <div className={styles.btnRow}>
                        <Link to="/host/events/new" className={styles.primaryBtn}><FaPlus /> Create event</Link>
                    </div>
                </div>

                {events.length === 0
                    ? (
                        <div className={styles.emptyState}>
                            <h2 className={styles.sectionTitle}>No events yet</h2>
                            <p className={styles.muted}>Create your first event to start taking sign-ups.</p>
                            <Link to="/host/events/new" className={styles.primaryBtn}><FaPlus /> Create event</Link>
                        </div>
                    )
                    : (
                        <div className={styles.eventGrid}>
                            {events.map(event => {
                                const stage = eventStage(event);
                                const filled = event.maxEntrants ? Math.min(100, (event.entrants.length / event.maxEntrants) * 100) : 100;
                                return (
                                    <Link key={event.id} to={`/host/events/${event.id}`} className={styles.eventCard}>
                                        <div className={styles.eventCardTop}>
                                            <div>
                                                <h2 className={styles.eventName}>{event.name}</h2>
                                                <p className={styles.eventGame}>{event.game} · {event.teamSize}</p>
                                            </div>
                                            <StageChip stage={stage} />
                                        </div>
                                        <div className={styles.metaRow}>
                                            <span><FaCalendarAlt /> {formatDate(event.startsAt)}</span>
                                            <span><FaSitemap /> {formatLabel(event.format)}</span>
                                            <span><FaGamepad /> Bo{event.bestOf}</span>
                                        </div>
                                        <div>
                                            <div className={styles.fillLabel}>
                                                <span>{capacityLabel(event)} {unitLabel(event)}</span>
                                                <span>{event.entrants.filter(e => e.checkedIn).length} checked in</span>
                                            </div>
                                            <div className={styles.fillBar}><span style={{ width: `${filled}%` }} /></div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

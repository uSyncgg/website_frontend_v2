import { Link, NavLink, Outlet, useNavigate, useOutletContext, useParams } from "react-router";
import { FaCalendarAlt, FaGamepad, FaMapMarkerAlt, FaSitemap } from "react-icons/fa";
import { useHostEvent, eventStage, updateEvent, deleteEvent } from "services/hostEventsMock";
import { buildBracket, bracketProgress } from "utils/bracket";
import { MockBanner, StageChip, formatDate, formatLabel, isTeamEvent } from "./hostShared";
import styles from "./Host.module.css";

export const useManagedEvent = () => useOutletContext();

// /host/events/:eventId/* - header + tabs shared by every manage screen.
export const ManageEvent = () => {
    const { eventId } = useParams();
    const event = useHostEvent(eventId);

    if (!event) {
        return (
            <div className={`standardContainer ${styles.page}`}>
                <div className={`${styles.inner} ${styles.emptyState}`}>
                    <h1 className={styles.sectionTitle}>Event not found</h1>
                    <Link to="/host/events" className={styles.secondaryBtn}>Back to your events</Link>
                </div>
            </div>
        );
    }

    const stage = eventStage(event);
    const tabs = [
        { to: '', label: 'Overview', end: true },
        { to: 'entrants', label: 'Entrants', count: event.entrants.length },
        { to: 'seeding', label: 'Seeding' },
        { to: 'bracket', label: 'Bracket' },
    ];

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>{`uSync | Manage ${event.name}`}</title>
            <meta name="robots" content="noindex, nofollow" />

            <div className={styles.inner}>
                <MockBanner />

                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}><Link to="/host/events" className={styles.eyebrow}>Host Dashboard</Link> / Manage event</p>
                        <h1 className={styles.title}>{event.name}</h1>
                        <div className={styles.metaRow}>
                            <StageChip stage={stage} />
                            <span><FaGamepad /> {event.game} · {event.teamSize}</span>
                            <span><FaCalendarAlt /> {formatDate(event.startsAt)}</span>
                            <span><FaSitemap /> {formatLabel(event.format)} · Bo{event.bestOf}</span>
                            <span><FaMapMarkerAlt /> {event.locationType === 'online' ? 'Online' : event.venue}</span>
                        </div>
                    </div>
                    <div className={styles.btnRow}>
                        <Link to={`/brackets/${event.id}`} className={styles.ghostBtn}>View public page</Link>
                    </div>
                </div>

                <nav className={styles.tabs} aria-label="Manage event">
                    {tabs.map(tab => (
                        <NavLink key={tab.label} to={tab.to} end={tab.end}
                            className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ''}`}>
                            {tab.label}{tab.count != null && <span className={styles.tabCount}>{tab.count}</span>}
                        </NavLink>
                    ))}
                </nav>

                <Outlet context={event} />
            </div>
        </div>
    );
};

// What the host should do next, based on where the event is.
const NEXT_STEPS = {
    registration: { text: 'Sign-ups are open. When you\'re ready to build the bracket, close registration and head to Seeding.', to: 'entrants', label: 'Review entrants' },
    closed: { text: 'Registration is closed. Set the seeding order and generate your bracket.', to: 'seeding', label: 'Set seeding' },
    seeding: { text: 'Your bracket draft is ready. Check the matchups, then publish it so players can see it.', to: 'bracket', label: 'Review bracket' },
    live: { text: 'The bracket is live. Report scores as matches finish - winners advance automatically.', to: 'bracket', label: 'Report scores' },
    complete: { text: 'Every match is done. Congratulations to your champion!', to: 'bracket', label: 'See final bracket' },
};

export const EventOverview = () => {
    const event = useManagedEvent();
    const navigate = useNavigate();
    const stage = eventStage(event);
    const next = NEXT_STEPS[stage];
    const checkedIn = event.entrants.filter(e => e.checkedIn).length;
    const progress = event.bracket
        ? bracketProgress(buildBracket(event.format, event.bracket.seeds, event.bracket.results))
        : null;
    const unit = isTeamEvent(event) ? 'Teams' : 'Players';

    const remove = () => {
        if (!window.confirm(`Delete "${event.name}"? This can't be undone.`)) return;
        deleteEvent(event.id);
        navigate('/host/events');
    };

    return (
        <>
            <div className={styles.statGrid}>
                <div className={styles.stat}><span className={styles.statLabel}>{unit} signed up</span><span className={styles.statValue}>{event.entrants.length}<span className={styles.muted}> / {event.maxEntrants}</span></span></div>
                <div className={styles.stat}><span className={styles.statLabel}>Checked in</span><span className={styles.statValue}>{checkedIn}</span></div>
                <div className={styles.stat}><span className={styles.statLabel}>Matches played</span><span className={styles.statValue}>{progress ? `${progress.done} / ${progress.total}` : '-'}</span></div>
                <div className={styles.stat}><span className={styles.statLabel}>Registration</span><span className={styles.statValue} style={{ fontSize: '1.1rem', marginTop: '.55rem' }}>{event.registrationOpen ? 'Open' : 'Closed'}</span></div>
            </div>

            <div className={styles.twoCol}>
                <div>
                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Details</h2>
                        <dl className={styles.detailList}>
                            <dt>Game</dt><dd>{event.game}</dd>
                            <dt>Format</dt><dd>{formatLabel(event.format)}, best of {event.bestOf}</dd>
                            <dt>Team size</dt><dd>{event.teamSize}</dd>
                            <dt>Starts</dt><dd>{formatDate(event.startsAt)}</dd>
                            <dt>Location</dt><dd>{event.locationType === 'online' ? 'Online' : event.venue}</dd>
                            <dt>Entry fee</dt><dd>{event.entryFee || 'Free'}</dd>
                            <dt>Prize</dt><dd>{event.prize || '-'}</dd>
                            <dt>Check-in</dt><dd>{event.checkInRequired ? 'Required' : 'Not required'}</dd>
                        </dl>
                    </section>
                    {(event.description || event.rules) &&
                        <section className={styles.card}>
                            {event.description && <><h2 className={styles.sectionTitle}>Description</h2><p className={styles.preWrap}>{event.description}</p></>}
                            {event.rules && <><h2 className={styles.sectionTitle} style={{ marginTop: event.description ? '1.25rem' : 0 }}>Rules</h2><p className={styles.preWrap}>{event.rules}</p></>}
                        </section>
                    }
                </div>

                <div>
                    <section className={`${styles.card} ${styles.nextStep}`}>
                        <h2 className={styles.sectionTitle}>Next step</h2>
                        <p>{next.text}</p>
                        <Link to={next.to} className={styles.primaryBtn}>{next.label}</Link>
                    </section>
                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Registration</h2>
                        <p className={styles.muted} style={{ marginTop: 0 }}>
                            {event.bracket?.published
                                ? 'Registration closed automatically when the bracket was published.'
                                : event.registrationOpen ? 'Players can currently sign up.' : 'New sign-ups are paused.'}
                        </p>
                        <div className={styles.btnRow}>
                            <button type="button" className={styles.secondaryBtn} disabled={event.bracket?.published}
                                onClick={() => updateEvent(event.id, { registrationOpen: !event.registrationOpen })}>
                                {event.registrationOpen ? 'Close registration' : 'Reopen registration'}
                            </button>
                            <button type="button" className={styles.dangerBtn} onClick={remove}>Delete event</button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

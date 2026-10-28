import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useOutletContext, useParams } from "react-router";
import { FaCalendarAlt, FaClock, FaGamepad, FaMapMarkerAlt, FaSitemap } from "react-icons/fa";
import { useHostEvent, eventStage, updateEvent, deleteEvent, delayStart } from "services/hostEventsMock";
import { buildBracket, bracketProgress } from "utils/bracket";
import { MockBanner, Modal, ShareButton, StageChip, capacityLabel, formatDate, formatLabel, unitLabel } from "./hostShared";
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
                            <span><FaCalendarAlt /> {formatDate(event.startsAt)}{event.delays?.length > 0 && <span className={styles.delayedTag}>Delayed</span>}</span>
                            <span><FaSitemap /> {formatLabel(event.format)} · Bo{event.bestOf}</span>
                            <span><FaMapMarkerAlt /> {event.locationType === 'online' ? 'Online' : event.venue}</span>
                        </div>
                    </div>
                    <div className={styles.btnRow}>
                        <ShareButton event={event} />
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
    registration: { text: 'Sign-ups are open. Share the event to get players in. When you\'re ready to build the bracket, close registration and head to Seeding.', to: 'entrants', label: 'Review entrants' },
    closed: { text: 'Registration is closed. Set the seeding order and generate your bracket.', to: 'seeding', label: 'Set seeding' },
    seeding: { text: 'Your bracket draft is ready. Check the matchups, then publish it so players can see it.', to: 'bracket', label: 'Review bracket' },
    live: { text: 'The bracket is live. Players report their own scores - step in when a match is disputed or a no-show is reported.', to: 'bracket', label: 'Open bracket' },
    complete: { text: 'Every match is done. Congratulations to your champion!', to: 'bracket', label: 'See final bracket' },
};

const DELAY_OPTIONS = [15, 30, 60];

const toLocalInput = (iso) => {
    const d = new Date(iso);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
};

const DelayDialog = ({ event, onClose }) => {
    const [mode, setMode] = useState(15);
    const [custom, setCustom] = useState(toLocalInput(new Date(new Date(event.startsAt).getTime() + 3600000).toISOString()));
    const [reason, setReason] = useState('');
    const newStart = mode === 'custom'
        ? new Date(custom)
        : new Date(new Date(event.startsAt).getTime() + mode * 60000);
    const valid = !Number.isNaN(newStart.getTime()) && newStart > new Date(event.startsAt);

    const confirm = () => {
        delayStart(event.id, newStart.toISOString(), reason.trim());
        onClose();
    };

    return (
        <Modal title="Delay start time" onClose={onClose}>
            <p className={styles.blurb}>Currently starts <strong>{formatDate(event.startsAt)}</strong>.</p>
            <div className={styles.btnRow} role="radiogroup" aria-label="Delay by">
                {DELAY_OPTIONS.map(m => (
                    <button key={m} type="button" role="radio" aria-checked={mode === m}
                        className={`${styles.ghostBtn} ${styles.smallBtn} ${mode === m ? styles.segmentActive : ''}`}
                        onClick={() => setMode(m)}>+{m < 60 ? `${m} min` : '1 hour'}</button>
                ))}
                <button type="button" role="radio" aria-checked={mode === 'custom'}
                    className={`${styles.ghostBtn} ${styles.smallBtn} ${mode === 'custom' ? styles.segmentActive : ''}`}
                    onClick={() => setMode('custom')}>Pick a time</button>
            </div>
            {mode === 'custom' &&
                <input type="datetime-local" className={styles.input} style={{ marginTop: '.75rem' }} value={custom}
                    onChange={e => setCustom(e.target.value)} aria-label="New start time" />
            }
            <div className={styles.field} style={{ marginTop: '1rem' }}>
                <label htmlFor="delay-reason">Message to players (optional)</label>
                <input id="delay-reason" className={styles.input} value={reason} onChange={e => setReason(e.target.value)}
                    placeholder="e.g. Server issues, starting shortly" maxLength={140} />
            </div>
            <p className={styles.blurb} style={{ marginTop: '1rem' }}>
                {valid ? <>New start: <strong>{formatDate(newStart.toISOString())}</strong>.</> : 'Pick a time later than the current start.'}
                {' '}All {event.entrants.length} registered {unitLabel(event)} will be notified.
            </p>
            <div className={styles.formActions}>
                <button type="button" className={styles.ghostBtn} onClick={onClose}>Cancel</button>
                <button type="button" className={styles.primaryBtn} disabled={!valid} onClick={confirm}>Delay and notify</button>
            </div>
        </Modal>
    );
};

export const EventOverview = () => {
    const event = useManagedEvent();
    const navigate = useNavigate();
    const [delaying, setDelaying] = useState(false);
    const stage = eventStage(event);
    const next = NEXT_STEPS[stage];
    const checkedIn = event.entrants.filter(e => e.checkedIn).length;
    const progress = event.bracket
        ? bracketProgress(buildBracket(event.format, event.bracket.seeds, event.bracket.results))
        : null;
    const unit = unitLabel(event);

    const remove = () => {
        if (!window.confirm(`Delete "${event.name}"? This can't be undone.`)) return;
        deleteEvent(event.id);
        navigate('/host/events');
    };

    return (
        <>
            <div className={styles.statGrid}>
                <div className={styles.stat}><span className={styles.statLabel}>{unit[0].toUpperCase() + unit.slice(1)} signed up</span><span className={styles.statValue}>{capacityLabel(event)}</span></div>
                <div className={styles.stat}><span className={styles.statLabel}>Checked in</span><span className={styles.statValue}>{checkedIn}</span></div>
                <div className={styles.stat}><span className={styles.statLabel}>Matches played</span><span className={styles.statValue}>{progress ? `${progress.done} / ${progress.total}` : '-'}</span></div>
                <div className={styles.stat}><span className={styles.statLabel}>Registration</span><span className={`${styles.statValue} ${styles.statValueSmall}`}>{event.registrationOpen ? 'Open' : 'Closed'}</span></div>
            </div>

            <div className={styles.twoCol}>
                <div>
                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Details</h2>
                        <dl className={styles.detailList}>
                            <dt>Game</dt><dd>{event.game}</dd>
                            <dt>Format</dt><dd>{formatLabel(event.format)}, best of {event.bestOf}</dd>
                            <dt>Team size</dt><dd>{event.teamSize}</dd>
                            <dt>Max {unit}</dt><dd>{event.maxEntrants ?? 'No cap'}</dd>
                            <dt>Starts</dt><dd>{formatDate(event.startsAt)}</dd>
                            <dt>Location</dt><dd>{event.locationType === 'online' ? 'Online' : event.venue}</dd>
                            <dt>Entry fee</dt><dd>{event.payments?.enabled ? `${event.entryFee} via uSync payments` : (event.entryFee || 'Free')}</dd>
                            <dt>Prize</dt><dd>{event.prize || '-'}</dd>
                            <dt>Check-in</dt><dd>{event.checkInRequired ? 'Required' : 'Not required'}</dd>
                            <dt>No-show timer</dt><dd>{event.noShowMinutes == null ? 'Off' : `${event.noShowMinutes} min after start`}</dd>
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
                        <h2 className={styles.sectionTitle}>Start time</h2>
                        <p className={styles.blurb}>{formatDate(event.startsAt)}</p>
                        {event.delays?.length > 0 &&
                            <ul className={styles.delayList}>
                                {event.delays.map((d, i) => (
                                    <li key={i}>
                                        Delayed from {formatDate(d.from)}{d.reason && <> - "{d.reason}"</>}
                                    </li>
                                ))}
                            </ul>
                        }
                        <button type="button" className={styles.secondaryBtn} disabled={stage === 'complete'} onClick={() => setDelaying(true)}>
                            <FaClock /> Delay start
                        </button>
                    </section>

                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Registration</h2>
                        <p className={styles.blurb}>
                            {event.bracket?.published
                                ? 'Registration closed automatically when the bracket was published.'
                                : event.registrationOpen ? 'Players can currently sign up.' : 'New sign-ups are paused.'}
                        </p>
                        <div className={styles.btnRow}>
                            <button type="button" className={styles.secondaryBtn} disabled={event.bracket?.published}
                                onClick={() => updateEvent(event.id, { registrationOpen: !event.registrationOpen })}>
                                {event.registrationOpen ? 'Close registration' : 'Reopen registration'}
                            </button>
                            <ShareButton event={event} className={styles.ghostBtn} />
                            <button type="button" className={styles.dangerBtn} onClick={remove}>Delete event</button>
                        </div>
                    </section>
                </div>
            </div>

            {delaying && <DelayDialog event={event} onClose={() => setDelaying(false)} />}
        </>
    );
};

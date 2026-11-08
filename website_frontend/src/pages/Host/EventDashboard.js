import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { FaCalendarAlt, FaGamepad, FaPlus, FaSitemap } from "react-icons/fa";
import { useCurrentUser } from "hooks";
import { useHostEvents, useEnteredEvents, eventStage, signedUpEntrants } from "services/brackets";
import { EVENT_TYPES } from "utils/hostEvents";
import { PROFILE_LABELS, addProfileUrl, canHostBrackets } from "utils/profiles";
import { getApiErrorMessage } from "utils/apiError";
import { TeamsTab } from "./TeamsTab";
import { BracketError, ShareButton, StageChip, capacityLabel, formatDate, formatLabel, unitLabel } from "./hostShared";
import styles from "./Host.module.css";

const TABS = [['entered', 'Entered'], ['teams', 'Teams'], ['hosting', 'Hosting']];

// The events you're signed up for (any view), each linking to its public page.
const EnteredTab = () => {
    const entered = useEnteredEvents();

    if (entered.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h2 className={styles.sectionTitle}>You're not entered in any events</h2>
                <p className={styles.muted}>Events you sign up for show up here, with your team and your bracket.</p>
                <Link to="/games" className={styles.secondaryBtn}>Find an event</Link>
            </div>
        );
    }

    return (
        <div className={styles.eventGrid}>
            {entered.map(({ event, entrant }) => (
                <div key={event.id} className={styles.eventCard}>
                    <Link to={`/brackets/${event.id}`} className={styles.eventCardLink}>
                        <div className={styles.eventCardTop}>
                            <div>
                                <h2 className={styles.eventName}>{event.name}</h2>
                                <p className={styles.eventGame}>{event.game} · {EVENT_TYPES[event.eventType] ?? 'Event'} · {event.teamSize}</p>
                            </div>
                            <StageChip stage={eventStage(event)} />
                        </div>
                        <div className={styles.metaRow}>
                            <span><FaCalendarAlt /> {formatDate(event.startsAt)}</span>
                            <span><FaSitemap /> {formatLabel(event.format)}</span>
                        </div>
                        <p className={styles.blurb}>
                            Entered as <strong>{entrant.name}</strong>
                            {entrant.status === 'pending' && ' · Pending - needs more players'}
                        </p>
                    </Link>
                    <div className={styles.eventCardActions}>
                        <Link to={`/brackets/${event.id}`} className={`${styles.secondaryBtn} ${styles.smallBtn}`}>Event page</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

// The events you run. Only while viewing as a host or venue; from another view it offers to
// switch (or to add a host profile if the account has none).
const HostingTab = () => {
    const { defaultProfile, profiles, switchProfile } = useCurrentUser();
    const events = useHostEvents();
    const [switching, setSwitching] = useState(false);
    const [error, setError] = useState('');

    if (!canHostBrackets(defaultProfile)) {
        const hostProfile = profiles.find(canHostBrackets);
        const switchTo = async () => {
            setSwitching(true);
            setError('');
            try {
                await switchProfile(hostProfile.type);
            } catch (err) {
                setError(getApiErrorMessage(err));
            }
            setSwitching(false);
        };

        return (
            <div className={styles.emptyState}>
                {hostProfile
                    ? <>
                        <h2 className={styles.sectionTitle}>Switch to {PROFILE_LABELS[hostProfile.type]} to see the events you host</h2>
                        <p className={styles.muted}>You're viewing as {PROFILE_LABELS[defaultProfile?.type] ?? 'a player'}.</p>
                        <button type="button" className={styles.primaryBtn} onClick={switchTo} disabled={switching}>
                            {switching ? 'Switching…' : `Switch to ${PROFILE_LABELS[hostProfile.type]}`}
                        </button>
                        {error && <p className={styles.fieldError}>{error}</p>}
                    </>
                    : <>
                        <h2 className={styles.sectionTitle}>Host your own events</h2>
                        <p className={styles.muted}>Add a host profile in Settings to post events and run brackets on uSync.</p>
                        <Link to={addProfileUrl('host')} className={styles.primaryBtn}>Add a host profile</Link>
                    </>
                }
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h2 className={styles.sectionTitle}>No events yet</h2>
                <p className={styles.muted}>Create your first event to start taking sign-ups.</p>
                <Link to="/host/events/new" className={styles.primaryBtn}><FaPlus /> Create event</Link>
            </div>
        );
    }

    return (
        <div className={styles.eventGrid}>
            {events.map(event => {
                const stage = eventStage(event);
                const filled = event.maxEntrants ? Math.min(100, (signedUpEntrants(event).length / event.maxEntrants) * 100) : 100;
                return (
                    <div key={event.id} className={styles.eventCard}>
                        <Link to={`/host/events/${event.id}`} className={styles.eventCardLink}>
                        <div className={styles.eventCardTop}>
                            <div>
                                <h2 className={styles.eventName}>{event.name}</h2>
                                <p className={styles.eventGame}>{event.game} · {EVENT_TYPES[event.eventType] ?? 'Event'} · {event.teamSize}</p>
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
                            </div>
                            <div className={styles.fillBar}><span style={{ width: `${filled}%` }} /></div>
                        </div>
                        </Link>
                        <div className={styles.eventCardActions}>
                            <Link to={`/host/events/${event.id}`} className={`${styles.secondaryBtn} ${styles.smallBtn}`}>Manage</Link>
                            <ShareButton event={event} className={`${styles.ghostBtn} ${styles.smallBtn}`} />
                            <Link to={`/brackets/${event.id}`} className={`${styles.ghostBtn} ${styles.smallBtn}`}>Public page</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// /dashboard - the Event Dashboard, for every signed-in account. Entered: the events you're
// signed up for. Hosting: the events you run (in a host or venue view). ?tab= picks the tab;
// by default hosts land on Hosting and everyone else on Entered.
export const EventDashboard = () => {
    const { defaultProfile } = useCurrentUser();
    const [searchParams, setSearchParams] = useSearchParams();
    const canHost = canHostBrackets(defaultProfile);
    const tab = TABS.some(([key]) => key === searchParams.get('tab'))
        ? searchParams.get('tab')
        : (canHost ? 'hosting' : 'entered');

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>uSync | Event Dashboard</title>
            <meta name="robots" content="noindex, nofollow" />

            <div className={styles.inner}>
                <BracketError />

                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}>Event Dashboard</p>
                        <h1 className={styles.title}>Your events</h1>
                        <p className={styles.subtitle}>
                            The events you've entered, your teams, and the ones you run{canHost ? '' : ' when you view as a host'}.
                        </p>
                    </div>
                    {canHost && tab === 'hosting' &&
                        <div className={styles.btnRow}>
                            <Link to="/host/events/new" className={styles.primaryBtn}><FaPlus /> Create event</Link>
                        </div>
                    }
                </div>

                <nav className={styles.tabs} aria-label="Event Dashboard">
                    {TABS.map(([key, label]) => (
                        <button key={key} type="button" aria-pressed={tab === key}
                            className={`${styles.tab} ${styles.tabButton} ${tab === key ? styles.tabActive : ''}`}
                            onClick={() => setSearchParams({ tab: key }, { replace: true })}>
                            {label}
                        </button>
                    ))}
                </nav>

                {tab === 'entered' ? <EnteredTab /> : tab === 'teams' ? <TeamsTab /> : <HostingTab />}
            </div>
        </div>
    );
};

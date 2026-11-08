import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { FaCalendarAlt, FaGamepad, FaPlus, FaSitemap } from "react-icons/fa";
import { useCurrentUser } from "hooks";
import { useHostEvents, useEnteredEvents, eventStage, signedUpEntrants, viewerMatch, isArchived } from "services/brackets";
import { buildBracket, placements } from "utils/bracket";
import { EVENT_TYPES, gameDisplayName, matchUrl } from "utils/hostEvents";
import { PROFILE_LABELS, addProfileUrl, canHostBrackets } from "utils/profiles";
import { getApiErrorMessage } from "utils/apiError";
import { TeamsTab } from "./TeamsTab";
import { BracketError, ShareButton, StageChip, capacityLabel, formatDate, formatLabel, unitLabel } from "./hostShared";
import styles from "./Host.module.css";

const TABS = [['entered', 'Entered'], ['teams', 'Teams'], ['hosting', 'Hosting'], ['archived', 'Archived']];

// The events you're signed up for (any view), each linking to its public page.
const EnteredTab = () => {
    const entered = useEnteredEvents().filter(({ event }) => !isArchived(event));

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
                        {(() => {
                            const match = viewerMatch(event);
                            if (!match) return null;
                            const opponent = event.entrants.find(e => e.id === (match.a === entrant.id ? match.b : match.a));
                            return <Link to={matchUrl(event.id, match.id)} className={`${styles.primaryBtn} ${styles.smallBtn}`}>Your match vs {opponent?.name ?? 'TBD'}</Link>;
                        })()}
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
    const events = useHostEvents().filter(e => !isArchived(e));
    // Events you were invited to help run (from any view, since admins are player profiles).
    const adminEvents = events.filter(e => !e.isHost);
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
            <>
            {adminEvents.length > 0 &&
                <>
                    <h2 className={styles.sectionTitle}>Events you're an admin for</h2>
                    <HostedGrid events={adminEvents} />
                </>
            }
            <div className={styles.emptyState} style={adminEvents.length ? { marginTop: '1.5rem' } : undefined}>
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
            </>
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
        <>
            {adminEvents.length > 0 && <p className={styles.muted}>Includes {adminEvents.length} event{adminEvents.length > 1 ? 's' : ''} you're an admin for.</p>}
            <HostedGrid events={events} />
        </>
    );
};

// Cards for events you run or help run, each linking to its manage screens.
const HostedGrid = ({ events }) => (
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
                                <p className={styles.eventGame}>{gameDisplayName(event)} · {EVENT_TYPES[event.eventType] ?? 'Event'} · {event.teamSize}</p>
                            </div>
                            <div className={styles.btnRow}>
                                {!event.isHost && <span className={styles.chip}>Admin</span>}
                                <StageChip stage={stage} />
                            </div>
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

const ARCHIVE_FILTERS = [['all', 'All'], ['hosted', 'Hosted'], ['played', 'Played']];

// Finished events: the ones you ran (or helped run) and the ones you played in. Filter by which,
// sort by date, see who won, and start a new event from one you hosted with Duplicate.
const ArchivedTab = () => {
    const hosting = useHostEvents();
    const entered = useEnteredEvents();
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('newest');

    const rows = useMemo(() => {
        const byId = new Map();
        for (const event of hosting.filter(isArchived)) byId.set(event.id, { event, hosted: true, entrant: null });
        for (const { event, entrant } of entered.filter(({ event }) => isArchived(event))) {
            byId.set(event.id, { ...(byId.get(event.id) ?? { event, hosted: false }), entrant });
        }
        const list = [...byId.values()].filter(r => filter === 'all' || (filter === 'hosted' ? r.hosted : r.entrant));
        const time = (r) => new Date(r.event.startsAt).getTime();
        return list.sort((x, y) => (sort === 'newest' ? time(y) - time(x) : time(x) - time(y)));
    }, [hosting, entered, filter, sort]);

    return (
        <>
            <div className={styles.archiveBar}>
                <div className={styles.segmented} role="radiogroup" aria-label="Show">
                    {ARCHIVE_FILTERS.map(([key, label]) => (
                        <button key={key} type="button" role="radio" aria-checked={filter === key}
                            className={`${styles.segment} ${filter === key ? styles.segmentActive : ''}`}
                            onClick={() => setFilter(key)}>{label}</button>
                    ))}
                </div>
                <label className={styles.archiveSort}>
                    Sort
                    <select className={styles.select} value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort">
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                    </select>
                </label>
            </div>

            {rows.length === 0
                ? (
                    <div className={styles.emptyState}>
                        <h2 className={styles.sectionTitle}>No finished events{filter === 'all' ? '' : ` you ${filter === 'hosted' ? 'hosted' : 'played in'}`} yet</h2>
                        <p className={styles.muted}>Events move here once every match is played.</p>
                    </div>
                )
                : (
                    <div className={styles.eventGrid}>
                        {rows.map(({ event, hosted, entrant }) => {
                            const places = placements(event.format, buildBracket(event.format, event.bracket.seeds, event.bracket.results));
                            const winner = places && event.entrants.find(e => e.id === places[0]);
                            const myPlace = entrant && places ? places.indexOf(entrant.id) : -1;
                            return (
                                <div key={event.id} className={styles.eventCard}>
                                    <Link to={`/brackets/${event.id}`} className={styles.eventCardLink}>
                                        <div className={styles.eventCardTop}>
                                            <div>
                                                <h2 className={styles.eventName}>{event.name}</h2>
                                                <p className={styles.eventGame}>{gameDisplayName(event)} · {EVENT_TYPES[event.eventType] ?? 'Event'} · {event.teamSize}</p>
                                            </div>
                                            <div className={styles.btnRow}>
                                                {hosted && <span className={styles.chip}>{event.isHost ? 'Hosted' : 'Admin'}</span>}
                                                {entrant && <span className={styles.chip}>Played</span>}
                                            </div>
                                        </div>
                                        <div className={styles.metaRow}>
                                            <span><FaCalendarAlt /> {formatDate(event.startsAt)}</span>
                                            <span><FaSitemap /> {formatLabel(event.format)}</span>
                                        </div>
                                        <p className={styles.blurb}>
                                            {winner && <>Winner: <strong>{winner.name}</strong></>}
                                            {entrant && <>{winner ? ' · ' : ''}You played as <strong>{entrant.name}</strong>{myPlace >= 0 ? ` (${['1st', '2nd', '3rd'][myPlace]})` : ''}</>}
                                        </p>
                                    </Link>
                                    <div className={styles.eventCardActions}>
                                        <Link to={`/brackets/${event.id}`} className={`${styles.secondaryBtn} ${styles.smallBtn}`}>Results</Link>
                                        {hosted && event.canManage &&
                                            <Link to={`/host/events/new?from=${encodeURIComponent(event.id)}`} className={`${styles.ghostBtn} ${styles.smallBtn}`}>Duplicate</Link>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            }
        </>
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

                {tab === 'entered' ? <EnteredTab /> : tab === 'teams' ? <TeamsTab /> : tab === 'archived' ? <ArchivedTab /> : <HostingTab />}
            </div>
        </div>
    );
};

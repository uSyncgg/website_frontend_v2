import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ProfileCard } from "components";
import { useAuth, useCurrentUser } from "hooks";
import { useAsync } from "hooks/useEvents";
import { gamesCatalog } from "catalog/games.catalog";
import { getProfileEvents } from "services/user";
import { useHostEvents, useEnteredEvents, eventStage, STAGE_LABELS } from "services/hostEventsMock";
import { getMyTeams } from "services/teams";
import { TeamCard } from "components/Teams/TeamParts";
import teamStyles from "components/Teams/Teams.module.css";
import { buildEventPath } from "utils/eventPaths";
import { EVENT_DASHBOARD_PATH, EVENT_TYPES } from "utils/hostEvents";
import { canHostBrackets, createEventUrl } from "utils/profiles";
import { formatDate } from "pages/Host/hostShared";
import { initials } from "./profileGames";
import styles from "./Profile.module.css";

// Which catalog section (and so which page) each kind of event lives under. Bracket events
// aren't in the catalog: their path is already the public bracket page.
const KIND_SECTION = { lan: 'lans', league: 'leagues', wager: 'wagers', h2h: 'h2h' };
const KIND_LABEL = { lan: 'LAN', league: 'League', wager: 'Wagers', h2h: 'Head-to-head', bracket: 'Bracket' };

// An event's page on the site: its game's section plus the event's path, as the game pages
// link them. Events whose game isn't in the catalog have no page to link to.
const eventUrl = (event) => {
    if (event.kind === 'bracket') return event.path;
    const entry = gamesCatalog.entries.find(e => e.apiGame === event.game);
    const section = entry?.sections?.[KIND_SECTION[event.kind]];
    return section ? buildEventPath(section, event.path) : null;
};

// MOCKUP: bracket events created in this browser as this profile, shaped like the API's
// profile events, until the bracket hosting API is live.
const mockBracketEvents = (events, publicId) => events
    .filter(e => e.hostProfile === publicId)
    .map(e => ({
        kind: 'bracket',
        event_type: e.eventType,
        name: e.name,
        game: e.game,
        path: `/brackets/${e.id}`,
        date: e.startsAt,
        location: e.locationType === 'online' ? 'Online' : e.venue,
    }));

/**
 * The owner's "+ Add event". Host tools only open while viewing as a host or venue (see
 * RequireBracketHost), so from your own profile in another view it switches the view first.
 */
const AddEventButton = ({ profile }) => {
    const { defaultProfile, switchProfile } = useCurrentUser();
    const navigate = useNavigate();
    const [busy, setBusy] = useState(false);

    if (defaultProfile?.public_id === profile.public_id) {
        return <Link to={createEventUrl(profile.public_id)} className={styles.cardAction}>+ Add event</Link>;
    }

    const switchAndGo = async () => {
        setBusy(true);
        try {
            await switchProfile(profile.type);
            navigate(createEventUrl(profile.public_id));
        } catch {
            setBusy(false);
        }
    };
    return (
        <button type="button" className={styles.cardAction} onClick={switchAndGo} disabled={busy}>
            {busy ? 'Switching…' : '+ Add event'}
        </button>
    );
};

/**
 * The events a host or venue runs on uSync (the ones its account owns), as visitors see them.
 * The owner sees OwnerEventsCard instead.
 */
export const EventsCard = ({ profile }) => {
    const { data, loading, error } = useAsync(() => getProfileEvents(profile.public_id), [profile.public_id]);
    const hostEvents = useHostEvents();
    // Until the backend serves this list everywhere, a 404 just means no events to show.
    const events = [...mockBracketEvents(hostEvents, profile.public_id), ...(data ?? [])];
    const failed = error && error.response?.status !== 404 && events.length === 0;

    return (
        <ProfileCard title="Events">
            {loading ? (
                <p className={styles.muted}>Loading events…</p>
            ) : failed ? (
                <p className={styles.muted}>Events can't be loaded right now.</p>
            ) : events.length === 0 ? (
                <p className={styles.muted}>
                    {`${profile.username} doesn't have any events on uSync yet.`}
                </p>
            ) : (
                <div>
                    {events.map(event => {
                        const url = eventUrl(event);
                        // Bracket events send their start as an ISO timestamp; other kinds send display text.
                        const date = event.kind === 'bracket' && event.date ? formatDate(event.date) : event.date;
                        return (
                            <div key={`${event.kind}-${event.path}`} className={styles.game}>
                                <div className={styles.emblem}>{initials(event.name)}</div>
                                <div>
                                    <div className={styles.eyebrow}>{event.game} · {(event.kind === 'bracket' && EVENT_TYPES[event.event_type]) || KIND_LABEL[event.kind]}</div>
                                    <div className={styles.gameName}>{event.name}</div>
                                    {(date || event.location) &&
                                        <div className={styles.location}>{[date, event.location].filter(Boolean).join(' · ')}</div>
                                    }
                                </div>
                                {url && <Link to={url} className={styles.gameLink}>View event</Link>}
                            </div>
                        );
                    })}
                </div>
            )}
        </ProfileCard>
    );
};

// How many rows "Your events" shows before pointing to the Event Dashboard.
const OWNER_EVENTS_SHOWN = 5;

/**
 * "Your events", only on your own profile (never shown to anyone else): on a player profile the
 * events you're entered in, on a host or venue profile the events you run (it takes the place of
 * the public Events card there, with the "+ Add event" button). Each row opens the event (the
 * manage page for ones you host), and the card links to the Event Dashboard.
 */
export const OwnerEventsCard = ({ profile }) => {
    const entered = useEnteredEvents();
    const hosted = useHostEvents();
    const { profiles } = useCurrentUser();
    const own = profiles.find(p => p.public_id === profile.public_id);
    const hosting = profile.type !== 'player';
    const rows = hosting
        ? hosted.map(event => ({ event, url: `/host/events/${event.id}`, action: 'Manage', note: `${event.entrants.length} signed up` }))
        : entered.map(({ event, entrant }) => ({ event, url: `/brackets/${event.id}`, action: 'View event', note: `Entered as ${entrant.name}` }));
    const dashboardUrl = `${EVENT_DASHBOARD_PATH}?tab=${hosting ? 'hosting' : 'entered'}`;

    return (
        <ProfileCard
            title={hosting ? "Events you're hosting" : "Events you're entered in"}
            action={
                <div className={styles.cardActions}>
                    {hosting && canHostBrackets(own) && <AddEventButton profile={own} />}
                    <Link to={dashboardUrl} className={styles.cardAction}>Event Dashboard</Link>
                </div>
            }
        >
            {rows.length === 0 ? (
                <p className={styles.muted}>
                    {hosting ? "You aren't running any events yet." : "You aren't entered in any events yet."}
                </p>
            ) : (
                <div>
                    {rows.slice(0, OWNER_EVENTS_SHOWN).map(({ event, url, action, note }) => (
                        <div key={event.id} className={styles.game}>
                            <div className={styles.emblem}>{initials(event.name)}</div>
                            <div>
                                <div className={styles.eyebrow}>{event.game} · {EVENT_TYPES[event.eventType] ?? 'Event'} · {STAGE_LABELS[eventStage(event)]}</div>
                                <div className={styles.gameName}>{event.name}</div>
                                <div className={styles.location}>{formatDate(event.startsAt)} · {note}</div>
                            </div>
                            <Link to={url} className={styles.gameLink}>{action}</Link>
                        </div>
                    ))}
                    {rows.length > OWNER_EVENTS_SHOWN &&
                        <p className={styles.muted}>
                            <Link to={dashboardUrl}>See all {rows.length} in your Event Dashboard</Link>
                        </p>
                    }
                </div>
            )}
        </ProfileCard>
    );
};

/**
 * The owner's teams on their player profile: each team, their role on it and how many players
 * it has. Managing teams (invites, roles, deleting) lives on the Event Dashboard.
 */
export const OwnerTeamsCard = ({ profile }) => {
    const { session } = useAuth();
    const token = session?.access_token;
    const { data: teams } = useAsync(() => getMyTeams(token), [token], { skip: !token });
    // This profile's teams: the ones it runs, and (for a player) the ones it plays on.
    const mine = (teams ?? []).filter(t => t.owner.public_id === profile.public_id || (profile.type === 'player' && t.my_role && t.my_role !== 'owner'));

    return (
        <ProfileCard
            title="Your teams"
            action={<Link to={`${EVENT_DASHBOARD_PATH}?tab=teams`} className={styles.cardAction}>Manage teams</Link>}
        >
            {mine.length === 0 ? (
                <p className={styles.muted}>You aren't on a team yet. Create one or accept an invite from the Teams dashboard.</p>
            ) : (
                <div className={teamStyles.grid}>
                    {mine.map(team => <TeamCard key={team.public_id} team={team} />)}
                </div>
            )}
        </ProfileCard>
    );
};

const ABOUT = {
    player: { title: 'About the player', empty: 'No bio yet.' },
    host: { title: 'About the host', empty: 'No description yet.' },
    venue: { title: 'About the venue', empty: 'No description yet.' },
    org: { title: 'About the organization', empty: 'No description yet.' },
};

/**
 * The About card, shaped by profile type: a player's bio; a host's organization and the kinds
 * of events it runs; a venue's description and how many locations it has. `action` is the
 * owner's Edit button.
 */
export const AboutCard = ({ profile, action }) => {
    const { title, empty } = ABOUT[profile.type];
    const details = profile.details ?? {};
    const locations = details.locations?.length ?? 0;

    return (
        <ProfileCard title={title} action={action}>
            {profile.type === 'host' && details.organization &&
                <div className={styles.fact}>
                    <span className={styles.eyebrow}>Organization</span>
                    <span className={styles.factValue}>{details.organization}</span>
                </div>
            }
            {profile.type === 'venue' && locations > 0 &&
                <div className={styles.fact}>
                    <span className={styles.eyebrow}>Locations</span>
                    <span className={styles.factValue}>{locations}</span>
                </div>
            }

            {profile.bio
                ? <p className={styles.bio}>{profile.bio}</p>
                : <p className={styles.muted}>{empty}</p>}

            {profile.type === 'host' && details.event_types?.length > 0 &&
                <div className={`${styles.tags} ${styles.aboutTags}`}>
                    {details.event_types.map(type => <span key={type} className={styles.tag}>{type}</span>)}
                </div>
            }
        </ProfileCard>
    );
};

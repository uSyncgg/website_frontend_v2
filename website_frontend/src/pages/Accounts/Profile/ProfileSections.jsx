import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ProfileCard } from "components";
import { useCurrentUser } from "hooks";
import { useAsync } from "hooks/useEvents";
import { gamesCatalog } from "catalog/games.catalog";
import { getProfileEvents } from "services/user";
import { useHostEvents } from "services/hostEventsMock";
import { buildEventPath } from "utils/eventPaths";
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
 * The events a host or venue runs on uSync (the ones its account owns). The owner gets an
 * "Add event" button that opens the bracket event setup, posting as this profile.
 */
export const EventsCard = ({ profile, isOwner }) => {
    const { data, loading, error } = useAsync(() => getProfileEvents(profile.public_id), [profile.public_id]);
    const hostEvents = useHostEvents();
    // The public profile doesn't say whether bracket hosting is on; the owner's own summary does.
    const { profiles } = useCurrentUser();
    const own = profiles.find(p => p.public_id === profile.public_id);
    // Until the backend serves this list everywhere, a 404 just means no events to show.
    const events = [...mockBracketEvents(hostEvents, profile.public_id), ...(data ?? [])];
    const failed = error && error.response?.status !== 404 && events.length === 0;
    const addEvent = isOwner && canHostBrackets(own) && <AddEventButton profile={own} />;

    return (
        <ProfileCard title="Events" action={addEvent}>
            {loading ? (
                <p className={styles.muted}>Loading events…</p>
            ) : failed ? (
                <p className={styles.muted}>Events can't be loaded right now.</p>
            ) : events.length === 0 ? (
                <p className={styles.muted}>
                    {isOwner ? "You don't have any events on uSync yet." : `${profile.username} doesn't have any events on uSync yet.`}
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
                                    <div className={styles.eyebrow}>{event.game} · {KIND_LABEL[event.kind]}</div>
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

const ABOUT = {
    player: { title: 'About the player', empty: 'No bio yet.' },
    host: { title: 'About the host', empty: 'No description yet.' },
    venue: { title: 'About the venue', empty: 'No description yet.' },
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

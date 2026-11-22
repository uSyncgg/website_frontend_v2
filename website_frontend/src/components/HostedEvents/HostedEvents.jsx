import { Link, useLocation } from "react-router";
import { FaRegClock, FaGamepad, FaUsers, FaTrophy, FaMapMarkerAlt } from "react-icons/fa";
import { useCurrentUser } from "hooks";
import { useDiscoverEvents, STAGE_LABELS } from "services/brackets";
import { eventContextFromPath, gameDisplayName, EVENT_TYPES, GAME_KEYS, PLATFORMS } from "utils/hostEvents";
import { canHostBrackets, createEventUrl } from "utils/profiles";
import card from "components/TournamentCard/TournamentCard.module.css";
import styles from "./HostedEvents.module.css";

const dollars = (cents) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: cents % 100 ? 2 : 0 })}`;

// "Sat, Nov 28 · 8:00 PM EST", in the viewer's own time zone.
const startText = (iso) => {
    const date = new Date(iso);
    const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
    return `${day} · ${time}`;
};

const prizeText = (event) => {
    if (event.prizeFunding === 'guaranteed') return `${dollars(event.guaranteeCents)} guaranteed`;
    if (event.prizeFunding === 'entry_funded') return event.poolCents > 0 ? `${dollars(event.poolCents)} pool` : 'Entry-funded prize';
    return null;
};

const initials = (name) => (name ?? 'uSync').split(/\s+/).map(w => w[0]).join('').slice(0, 3).toUpperCase();

const HostedEventCard = ({ event }) => {
    const prize = prizeText(event);
    const spots = event.maxEntrants ? `${event.signedUp}/${event.maxEntrants} spots` : `${event.signedUp} signed up`;
    const details = [gameDisplayName(event), event.gameMode, event.formatLabel].filter(Boolean).join(' · ');

    return (
        <div className={`${card.tournamentCard} ${styles.card}`}>
            <div className={card.hostTile}><span>{initials(event.hostName)}</span></div>

            <div className={card.cardInfo}>
                <h3 className={card.cardTitle}>
                    {/* The title's link covers the whole card (see .cardLink); the host link sits above it. */}
                    <Link to={`/brackets/${encodeURIComponent(event.id)}`} className={styles.cardLink}>{event.name}</Link>
                    <span className={`${styles.stage} ${event.stage === 'live' ? styles.live : ''}`}>{STAGE_LABELS[event.stage] ?? event.stage}</span>
                </h3>
                <p className={styles.details}>
                    {event.teamSize} · {details}
                    {event.hostName && <> · by {event.hostProfile
                        ? <Link to={`/profile/${encodeURIComponent(event.hostProfile)}`} className={styles.hostLink}>{event.hostName}</Link>
                        : event.hostName}</>}
                </p>

                <div className={card.metaRow}>
                    <span className={card.metaTime}><FaRegClock /> {startText(event.startsAt)}</span>
                    <span className={card.metaItem}><FaGamepad /> {PLATFORMS[event.platform] ?? event.platform}</span>
                </div>
                <div className={card.metaRow}>
                    <span className={card.metaItem}><FaUsers /> {spots}</span>
                    {prize && <span className={card.metaItem}><FaTrophy /> {prize}</span>}
                    {event.locationType !== 'online' && event.venue && <span className={card.metaItem}><FaMapMarkerAlt /> {event.venue}</span>}
                </div>
            </div>

            <div className={card.cardActions}>
                <span className={`${card.entry} ${event.entryFeeCents ? '' : card.entryFree}`}>
                    {event.entryFeeCents ? `${dollars(event.entryFeeCents)} / player` : 'Free'}
                </span>
                <span className={card.tournamentButton} aria-hidden="true">View event</span>
            </div>
        </div>
    );
};

/**
 * "Hosted on uSync": the Hosted Events of the game and event type this page is about (worked out
 * from the URL, like AddYourEventButton), soonest first, above the page's Listed Events. The
 * page's filters don't apply to it (yet).
 */
export const HostedEvents = () => {
    const { pathname } = useLocation();
    const { defaultProfile } = useCurrentUser();
    const { type, game } = eventContextFromPath(pathname);
    const { events, nextCursor, loading, loadMore } = useDiscoverEvents(GAME_KEYS[game], type);

    if (!type || !GAME_KEYS[game] || loading) return null;

    const label = EVENT_TYPES[type];
    const hostUrl = defaultProfile?.type === 'host' && canHostBrackets(defaultProfile)
        ? createEventUrl(defaultProfile.public_id, { type, game })
        : `/host/events/new?${new URLSearchParams({ type, game })}`;

    return (
        <section className={styles.section} aria-labelledby="hosted-events-title">
            <h2 id="hosted-events-title" className={styles.title}>Hosted on uSync</h2>
            {events.length === 0 ? (
                <p className={styles.empty}>
                    No hosted {label === 'LAN' ? 'LANs' : `${label.toLowerCase()}s`} for {game} yet. <Link to={hostUrl}>Host one →</Link>
                </p>
            ) : (
                <>
                    {events.map(event => <HostedEventCard key={event.id} event={event} />)}
                    {nextCursor && (
                        <button type="button" className={`${card.tournamentButton} ${styles.more}`} onClick={loadMore}>Show more</button>
                    )}
                </>
            )}
        </section>
    );
};

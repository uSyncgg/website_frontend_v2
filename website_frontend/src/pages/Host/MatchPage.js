import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaArrowLeft, FaCalendarAlt, FaGamepad, FaMap, FaSitemap, FaUserShield } from "react-icons/fa";
import { ReportMatchDialog } from "components/Bracket/Bracket";
import { MatchChatPanel } from "components/MatchChat/MatchChatPanel";
import {
    useHostEvent, matchState, matchReports, noShowUnlocksAt, playerReportMatch, reportNoShow,
} from "services/brackets";
import { buildBracket, findMatch, isEntrant, mapHosts, matchBestOf, matchRoundLabel } from "utils/bracket";
import { profileUrl } from "utils/profiles";
import { BracketError, EventLoading, entrantsById, formatDate, gameDisplayName, isTeamEvent, locationLabel, RestrictionList } from "./hostShared";
import styles from "./Host.module.css";

const STATUS_TEXT = {
    pending: 'Waiting on earlier matches',
    ready: 'Ready to play',
    awaiting: 'One side has reported a score',
    disputed: 'Scores disagree - the host will decide',
    no_show: 'No-show reported - waiting on the host',
    complete: 'Final',
    bye: 'Bye - advances automatically',
};

// One side of the match: name, captain and roster (for teams), score once it's played.
const Side = ({ id, entrant, match, isYou, team }) => {
    const done = match.status === 'complete';
    const score = done ? (id === match.a ? match.scoreA : match.scoreB) : null;
    const won = done && match.winner === id;
    if (!isEntrant(id)) {
        return (
            <div className={styles.matchSide}>
                <h2 className={styles.matchSideName}><em>{id ? 'Bye' : 'TBD'}</em></h2>
                <p className={styles.muted}>{id ? 'No opponent this round.' : 'Decided by an earlier match.'}</p>
            </div>
        );
    }
    return (
        <div className={`${styles.matchSide} ${won ? styles.matchSideWon : ''} ${isYou ? styles.matchSideYou : ''}`}>
            <div className={styles.matchSideTop}>
                <h2 className={styles.matchSideName}>{entrant?.name}{isYou && <span className={styles.chip}>You</span>}</h2>
                {score != null && <span className={styles.matchSideScore}>{match.forfeit && !won ? 'FF' : score}</span>}
            </div>
            {team && entrant?.captain && <p className={styles.muted}>Captain: {entrant.captain}</p>}
            {team && entrant?.roster?.length > 0 &&
                <ul className={styles.rosterList}>
                    {entrant.roster.map(name => <li key={name}>{name}</li>)}
                </ul>
            }
        </div>
    );
};

// /brackets/:eventId/matches/:matchId - everything a player needs for one match: who they're
// playing (and their roster), its round, best of and start time, the rules and restrictions,
// maps (posted later), and - for the two sides - reporting the score or a no-show.
export const MatchPage = () => {
    const { eventId, matchId } = useParams();
    const event = useHostEvent(eventId);
    const [reporting, setReporting] = useState(false);
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 30000);
        return () => clearInterval(t);
    }, []);

    if (!event) return <EventLoading event={event} backTo={`/brackets/${eventId}`} backLabel="Back to the event" />;

    const backTo = `/brackets/${event.id}`;
    const built = event.bracket?.published ? buildBracket(event.format, event.bracket.seeds, event.bracket.results) : null;
    const match = built && findMatch(built, matchId);
    if (!match) {
        return (
            <div className={`standardContainer ${styles.page}`}>
                <div className={styles.narrow}>
                    <div className={styles.emptyState}>
                        <h1 className={styles.sectionTitle}>Match not found</h1>
                        <p className={styles.muted}>{built ? 'This match isn\'t in the bracket.' : 'The bracket hasn\'t been posted yet.'}</p>
                        <Link to={backTo} className={styles.secondaryBtn}>Back to {event.name}</Link>
                    </div>
                </div>
            </div>
        );
    }

    const byId = entrantsById(event);
    const team = isTeamEvent(event);
    const viewerId = event.viewerEntrantId ?? '';
    const mine = viewerId && (match.a === viewerId || match.b === viewerId);
    const opponentId = mine ? (match.a === viewerId ? match.b : match.a) : null;
    const state = matchState(event.bracket, match);
    const reports = matchReports(event.bracket, match);
    const bestOf = matchBestOf(event, built, match);
    const noShowAt = noShowUnlocksAt(event);
    const noShowOpen = noShowAt != null && now >= noShowAt.getTime();
    const canReport = mine && event.viewerCanAct && match.status === 'ready';
    const round = matchRoundLabel(event.format, built, match);
    // The chat sits in its own tall column on the right for the two players' sides and the event's admins.
    const hasChat = mine || event.canManage;
    const maps = isEntrant(match.a) && isEntrant(match.b) ? mapHosts(bestOf, match.a, match.b, event.bracket.seeds) : null;

    const submitNoShow = () => {
        if (window.confirm(`Report ${byId[opponentId]?.name} as a no-show? The host will review it and decide what happens.`)) {
            reportNoShow(event.id, match);
        }
    };

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>{`uSync | ${byId[match.a]?.name ?? 'TBD'} vs ${byId[match.b]?.name ?? 'TBD'}`}</title>
            <meta name="robots" content="noindex, nofollow" />

            <div className={styles.inner}>
                <BracketError />
                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}><Link to={backTo} className={styles.eyebrow}><FaArrowLeft /> {event.name}</Link></p>
                        <h1 className={styles.title}>{round}</h1>
                        <div className={styles.metaRow}>
                            <span className={`${styles.chip} ${styles[`match_${state}`] ?? ''}`}>{STATUS_TEXT[state] ?? state}</span>
                            <span><FaSitemap /> Best of {bestOf} · first to {Math.ceil(bestOf / 2)}</span>
                            <span><FaCalendarAlt /> {formatDate(event.startsAt)}</span>
                        </div>
                    </div>
                    {event.canManage &&
                        <div className={styles.btnRow}>
                            <Link to={`/host/events/${event.id}/bracket`} className={styles.ghostBtn}><FaUserShield /> Manage in bracket</Link>
                        </div>
                    }
                </div>

                <div className={`${styles.matchLayout} ${hasChat ? styles.withChat : ''}`}>
                <div className={styles.matchMain}>
                <section className={`${styles.card} ${styles.versus}`}>
                    <Side id={match.a} entrant={byId[match.a]} match={match} isYou={match.a === viewerId} team={team} />
                    <span className={styles.versusTag}>vs</span>
                    <Side id={match.b} entrant={byId[match.b]} match={match} isYou={match.b === viewerId} team={team} />
                </section>

                {mine && match.status === 'ready' &&
                    <section className={`${styles.card} ${styles.myMatch}`}>
                        <h2 className={styles.sectionTitle}>Your match</h2>
                        {state === 'disputed' && <p className={styles.tagDisputed}>DISPUTED - the host will decide</p>}
                        {state === 'no_show' && <p className={styles.tagNoShow}>NO SHOW REPORTED - waiting on the host</p>}
                        {state === 'awaiting' && (
                            reports[viewerId]
                                ? <p className={styles.blurb}>You reported a score. Waiting for {byId[opponentId]?.name} to confirm.</p>
                                : <p className={styles.blurb}>{byId[opponentId]?.name} reported a score. Report yours to confirm it.</p>
                        )}
                        {state === 'ready' && <p className={styles.blurb}>Play your match, then both sides report the score. If they agree, it's final.</p>}
                        {canReport
                            ? (
                                <div className={styles.stackBtns}>
                                    <button type="button" className={styles.primaryBtn} onClick={() => setReporting(true)}>Report score</button>
                                    {state !== 'no_show' && noShowAt &&
                                        <button type="button" className={styles.ghostBtn} disabled={!noShowOpen} onClick={submitNoShow}>Report No Show</button>}
                                    {noShowAt && !noShowOpen && state !== 'no_show' &&
                                        <span className={styles.fieldHint}>Unlocks at {noShowAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} ({event.noShowMinutes} min after start)</span>}
                                </div>
                            )
                            : <p className={styles.fieldHint}>Your team's owner or a captain reports scores.</p>
                        }
                    </section>
                }

                <section className={`${styles.card} ${styles.mapsCard}`}>
                    <h2 className={styles.sectionTitle}><FaMap /> Maps</h2>
                    <p className={styles.muted}>Maps and modes for this match will be posted here.</p>
                    {maps
                        ? (
                            <>
                                <div className={styles.mapGrid}>
                                    {maps.map(m => (
                                        <div key={m.map} className={styles.mapCard}>
                                            <strong className={styles.mapName}>Map {m.map}</strong>
                                            <span className={styles.mapHost}>
                                                {m.host
                                                    ? <>Hosted by {byId[m.host]?.name}{m.seed ? ` (seed ${m.seed})` : ''}</>
                                                    : 'Hosted by whoever won the most rounds so far'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className={styles.fieldHint}>
                                    {bestOf === 1
                                        ? 'The higher seed hosts.'
                                        : 'The higher seed hosts map 1, then hosts swap each map. The last map goes to whoever won the most rounds before it.'}
                                </p>
                            </>
                        )
                        : <p className={styles.fieldHint}>Map hosts are set once both sides are known.</p>}
                </section>

                <div className={styles.twoCol}>
                    <div>
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Rules</h2>
                            {event.rules ? <p className={styles.preWrap}>{event.rules}</p> : <p className={styles.muted}>The host hasn't posted rules.</p>}
                            {event.restrictions?.length > 0 &&
                                <>
                                    <h3 className={styles.fieldLabel} style={{ marginTop: '1rem' }}>Restrictions</h3>
                                    <RestrictionList event={event} />
                                </>
                            }
                        </section>
                    </div>
                    <div>
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Match details</h2>
                            <dl className={styles.detailList}>
                                <dt>Game</dt><dd><FaGamepad /> {gameDisplayName(event)}</dd>
                                <dt>Where</dt><dd>{locationLabel(event)}</dd>
                                <dt>Round</dt><dd>{round}</dd>
                                <dt>Best of</dt><dd>{bestOf}{event.finalBestOf && bestOf === event.finalBestOf ? ' (finals)' : ''}</dd>
                                <dt>No-show timer</dt><dd>{event.noShowMinutes == null ? 'Off' : `${event.noShowMinutes} min after start`}</dd>
                                <dt>Host</dt><dd>{event.host ? <Link to={profileUrl(event.host)}>{event.host.username}</Link> : '-'}</dd>
                            </dl>
                        </section>
                    </div>
                </div>
                </div>

                {hasChat &&
                    <aside className={styles.matchChat} aria-label="Match chat">
                        <MatchChatPanel eventId={event.id} matchId={match.id} tall />
                    </aside>
                }
                </div>
            </div>

            {reporting && canReport &&
                <ReportMatchDialog
                    match={match}
                    entrants={byId}
                    bestOf={bestOf}
                    mode="player"
                    viewerId={viewerId}
                    reports={reports}
                    onClose={() => setReporting(false)}
                    onSave={(a, b) => { playerReportMatch(event.id, match, viewerId, a, b); setReporting(false); }}
                />
            }
        </div>
    );
};

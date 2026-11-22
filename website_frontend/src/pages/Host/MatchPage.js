import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaArrowLeft, FaCalendarAlt, FaComments, FaGamepad, FaMap, FaSitemap, FaUserShield } from "react-icons/fa";
import { ReportMatchDialog } from "components/Bracket/Bracket";
import { useChats } from "components/Chat/ChatContext";
import { joinMatchChat } from "services/chats";
import { getApiErrorMessage } from "utils/apiError";
import { useHostEvent, matchState, matchView, reportScore, reportNoShow, disputeResult, ruleOnMatch } from "services/brackets";
import { findMatch, isEntrant, matchRoundLabel } from "utils/bracket";
import { profileUrl } from "utils/profiles";
import { BracketError, EventLoading, entrantsById, formatDate, gameDisplayName, isTeamEvent, locationLabel, RestrictionList, RulesetInfo } from "./hostShared";
import styles from "./Host.module.css";

const STATUS_TEXT = {
    pending: 'Waiting on earlier matches',
    ready: 'Ready to play',
    awaiting: 'One side has reported a score',
    disputed: 'Each side says it won - an admin will decide',
    no_show: 'No-show reported - waiting on an admin',
    locked: 'On hold while a dispute about the match before it is reviewed',
    complete: 'Final',
    bye: 'Bye - advances automatically',
};

const clock = (iso) => new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

// One side of the match: name, players, score once it's played.
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

// /brackets/:eventId/matches/:matchId - everything for one match: who's playing (and their
// players), its round, best of and rules, and - for the two sides - reporting the score, a
// no-show, or disputing the result in the 5 minutes after it's decided. The host and admins
// decide the match here (this is where "Go to issue" in the queue leads). What each viewer may
// do comes from the server.
export const MatchPage = () => {
    const { eventId, matchId } = useParams();
    const event = useHostEvent(eventId);
    const [dialog, setDialog] = useState(null);
    const [now, setNow] = useState(() => Date.now());
    const { chatForMatch, openChat, showChat } = useChats();
    const [chatError, setChatError] = useState('');

    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 15000);
        return () => clearInterval(t);
    }, []);

    if (!event) return <EventLoading event={event} backTo={`/brackets/${eventId}`} backLabel="Back to the event" />;

    const backTo = `/brackets/${event.id}`;
    const built = event.bracket && event.bracket.status !== 'draft' ? event.bracket.built : null;
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
    const view = matchView(event, match);
    const state = matchState(event, match);
    const bestOf = match.bestOf ?? event.bestOf;
    const round = matchRoundLabel(event.format, built, match);
    const noShowAt = view.noShowUnlocksAt ? new Date(view.noShowUnlocksAt) : null;
    const disputeUntil = view.disputeClosesAt ? new Date(view.disputeClosesAt) : null;
    const canNoShow = view.canReportNoShow || (noShowAt && now >= noShowAt.getTime() && view.canReport);
    const canDispute = view.canDispute && disputeUntil && now <= disputeUntil.getTime();
    // Picked players act in their own match, as well as the team's owner and captains.
    const canAct = view.canAct ?? event.viewerCanAct;
    // The match chat: open it if you're in it; the host and admins can join it.
    const myChat = chatForMatch(event.id, match.id);
    const joinChat = async () => {
        setChatError('');
        try {
            showChat(await joinMatchChat(event.id, match.id));
        } catch (err) {
            setChatError(getApiErrorMessage(err));
        }
    };

    const submitNoShow = () => {
        if (window.confirm(`Report ${byId[opponentId]?.name} as a no-show? An admin will review it and decide what happens.`)) {
            reportNoShow(event.id, match.id);
        }
    };
    const submitDispute = () => {
        if (window.confirm('Dispute this result? The next match is put on hold until an admin reviews it. Each side can dispute a match once.')) {
            disputeResult(event.id, match.id);
        }
    };
    const rule = async (ruling) => {
        if (await ruleOnMatch(event.id, match.id, ruling)) setDialog(null);
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
                    {(event.canManage || myChat) &&
                        <div className={styles.btnRow}>
                            {myChat
                                ? <button type="button" className={styles.ghostBtn} onClick={() => openChat(myChat.id)}><FaComments /> Open chat</button>
                                : event.canManage && view.chatId &&
                                    <button type="button" className={styles.ghostBtn} onClick={joinChat}><FaComments /> Join chat</button>}
                            {event.canManage && ['ready', 'complete'].includes(match.status) &&
                                <button type="button" className={styles.primaryBtn} onClick={() => setDialog('host')}>Decide this match</button>}
                            {event.canManage && <Link to={`/host/events/${event.id}/queue`} className={styles.ghostBtn}><FaUserShield /> Queue</Link>}
                            {chatError && <span className={styles.fieldHint} role="alert">{chatError}</span>}
                        </div>
                    }
                </div>

                <section className={`${styles.card} ${styles.versus}`}>
                    <Side id={match.a} entrant={byId[match.a]} match={match} isYou={match.a === viewerId} team={team} />
                    <span className={styles.versusTag}>vs</span>
                    <Side id={match.b} entrant={byId[match.b]} match={match} isYou={match.b === viewerId} team={team} />
                </section>

                {mine && match.status === 'ready' &&
                    <section className={`${styles.card} ${styles.myMatch}`}>
                        <h2 className={styles.sectionTitle}>Your match</h2>
                        {state === 'disputed' && <p className={styles.tagDisputed}>DISPUTED - an admin will decide</p>}
                        {state === 'no_show' && <p className={styles.tagNoShow}>NO SHOW REPORTED - waiting on an admin</p>}
                        {state === 'locked' && <p className={styles.tagNoShow}>ON HOLD - the match before this one is being reviewed</p>}
                        {state === 'awaiting' && (
                            view.reports?.[viewerId]
                                ? <p className={styles.blurb}>You reported a score. Waiting for {byId[opponentId]?.name} to report.</p>
                                : <p className={styles.blurb}>{byId[opponentId]?.name} reported a score. Report yours - if you both name the same winner, it's final.</p>
                        )}
                        {state === 'ready' && <p className={styles.blurb}>Play your match, then both sides report the score. If you both name the same winner, it's final.</p>}
                        {canAct
                            ? (
                                <div className={styles.stackBtns}>
                                    {view.canReport && <button type="button" className={styles.primaryBtn} onClick={() => setDialog('player')}>Report score</button>}
                                    {noShowAt && state !== 'no_show' && state !== 'locked' &&
                                        <button type="button" className={styles.ghostBtn} disabled={!canNoShow} onClick={submitNoShow}>Report No Show</button>}
                                    {noShowAt && !canNoShow && state !== 'no_show' &&
                                        <span className={styles.fieldHint}>Unlocks at {clock(noShowAt)} ({event.noShowMinutes} min after the match started)</span>}
                                </div>
                            )
                            : <p className={styles.fieldHint}>Your team's owner or a captain reports scores.</p>
                        }
                    </section>
                }

                {mine && match.status === 'complete' && canAct && canDispute &&
                    <section className={`${styles.card} ${styles.myMatch}`}>
                        <h2 className={styles.sectionTitle}>Think this result is wrong?</h2>
                        <p className={styles.blurb}>
                            You can dispute it until {clock(disputeUntil)}, as long as the next match hasn't been reported. The next match is put on
                            hold until an admin reviews it.
                        </p>
                        <button type="button" className={styles.dangerBtn} onClick={submitDispute}>Dispute this result</button>
                    </section>
                }

                <div className={styles.twoCol}>
                    <div>
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}><FaMap /> Maps</h2>
                            <p className={styles.muted}>Maps and modes for this match will be posted here.</p>
                        </section>
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Rules</h2>
                            <RulesetInfo event={event} />
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
                                {event.gameMode && <><dt>Mode</dt><dd>{event.gameMode}</dd></>}
                                <dt>Where</dt><dd>{locationLabel(event)}</dd>
                                <dt>Round</dt><dd>{round}</dd>
                                <dt>Best of</dt><dd>{bestOf}{event.finalBestOf && bestOf === event.finalBestOf && bestOf !== event.bestOf ? ' (finals)' : ''}</dd>
                                <dt>No-show timer</dt><dd>{event.noShowMinutes == null ? 'Off' : `${event.noShowMinutes} min after the match starts`}</dd>
                                <dt>Host</dt><dd>{event.host ? <Link to={profileUrl(event.host)}>{event.host.username}</Link> : '-'}</dd>
                            </dl>
                        </section>
                    </div>
                </div>
            </div>

            {dialog === 'player' && view.canReport &&
                <ReportMatchDialog
                    match={match}
                    entrants={byId}
                    bestOf={bestOf}
                    mode="player"
                    viewerId={viewerId}
                    reports={view.reports ?? {}}
                    onClose={() => setDialog(null)}
                    onSave={async (a, b) => { if (await reportScore(event.id, match.id, a, b)) setDialog(null); }}
                />
            }
            {dialog === 'host' && event.canManage &&
                <ReportMatchDialog
                    match={match}
                    entrants={byId}
                    bestOf={bestOf}
                    mode="host"
                    reports={view.reports ?? {}}
                    issues={view.issues ?? []}
                    onClose={() => setDialog(null)}
                    onSave={(a, b) => rule({ action: 'award', scoreA: a, scoreB: b })}
                    onClear={() => rule({ action: 'clear' })}
                    onUphold={() => rule({ action: 'uphold' })}
                    onForfeit={(winnerId) => {
                        const win = Math.ceil(bestOf / 2);
                        const aWins = winnerId === match.a;
                        rule({ action: 'award', scoreA: aWins ? win : 0, scoreB: aWins ? 0 : win, forfeit: true });
                    }}
                />
            }
        </div>
    );
};

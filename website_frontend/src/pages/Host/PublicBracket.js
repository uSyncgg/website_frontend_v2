import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth, useCurrentUser } from "hooks";
import { FaCalendarAlt, FaCheckCircle, FaClock, FaGamepad, FaMapMarkerAlt, FaSitemap, FaTicketAlt, FaTrophy } from "react-icons/fa";
import { Bracket } from "components/Bracket/Bracket";
import {
    useHostEvent, isFull, register, setPlayers, unregister as leaveEvent, isPending, signedUpEntrants, pendingEntrants, teamSizeOf,
    matchState, viewerMatch,
} from "services/brackets";
import { getMyTeams, getTeam } from "services/teams";
import { getApiErrorMessage } from "utils/apiError";
import { EVENT_TYPES, matchUrl } from "utils/hostEvents";
import { BracketError, Modal, ShareButton, StageChip, capacityLabel, entrantsById, formatDate, formatLabel, unitLabel, isTeamEvent, EventLoading, formatSummary, locationLabel, gameDisplayName, RestrictionList } from "./hostShared";
import { USYNC_FEE_RATE } from "utils/fees";
import styles from "./Host.module.css";


// Why one of your teams can't be entered in this event, or '' when it can. A team can enter
// with fewer players picked than the event needs - it shows as pending until the captain picks
// the rest. (The server checks all of this too.)
const teamEntryProblem = (team, event) => {
    if (!['owner', 'captain'].includes(team.my_role)) return 'Only the owner or a captain can enter this team';
    if (event.entrants.some(e => e.teamId === team.public_id)) return 'Already entered';
    if (!(team.games ?? []).some(g => g.key === event.gameKey)) return `Doesn't play ${event.game}`;
    return '';
};

// Pick which of a team's players play in this event (up to the team size). Used when signing up
// and by the captain to change the picks until the event starts.
const PlayerPicks = ({ members, need, picked, onChange }) => (
    <div className={styles.passList}>
        {members.map(m => {
            const on = picked.includes(m.public_id);
            return (
                <label key={m.public_id} className={`${styles.passOption} ${on ? styles.passOptionOn : ''}`}>
                    <input type="checkbox" checked={on} disabled={!on && picked.length >= need}
                        onChange={() => onChange(on ? picked.filter(x => x !== m.public_id) : [...picked, m.public_id])} />
                    <span>{m.username}</span>
                    <strong>{m.role === 'captain' ? 'Captain' : ''}</strong>
                </label>
            );
        })}
        <p className={styles.fieldHint}>{picked.length} of {need} picked. Each player can only play for one team in this event.</p>
    </div>
);

// The captain changes which players play, until the bracket is published.
const EditPlayersDialog = ({ event, entrant, onClose }) => {
    const { session } = useAuth();
    const need = teamSizeOf(event);
    const [members, setMembers] = useState(null);
    const [picked, setPicked] = useState(entrant.players.map(p => p.public_id));
    const [error, setError] = useState('');

    useEffect(() => {
        getTeam(entrant.teamId, session?.access_token).then(t => setMembers(t.members)).catch(err => setError(getApiErrorMessage(err)));
    }, [entrant.teamId, session?.access_token]);

    const save = async () => {
        if (await setPlayers(event.id, picked)) onClose();
    };

    return (
        <Modal title={`Players for ${event.name}`} onClose={onClose}>
            {error && <p className={styles.fieldError}>{error}</p>}
            {members === null && !error && <p className={styles.fieldHint}>Loading your team…</p>}
            {members && <PlayerPicks members={members} need={need} picked={picked} onChange={setPicked} />}
            <div className={styles.formActions}>
                <button type="button" className={styles.ghostBtn} onClick={onClose}>Cancel</button>
                <button type="button" className={styles.primaryBtn} onClick={save}>Save players</button>
            </div>
        </Modal>
    );
};

const RegisterDialog = ({ event, username, onClose }) => {
    const pay = event.payments?.enabled ? event.payments : null;
    const team = isTeamEvent(event);
    const need = teamSizeOf(event);
    const form = event.signupForm ?? { playerFields: [], questions: [] };
    const { session } = useAuth();
    const { profiles = [] } = useCurrentUser();
    const token = session?.access_token;
    // Accounts with an organization pick whether they're entering as themselves (a player's
    // teams) or as the organization (its teams). Everyone else never sees the choice.
    const org = profiles.find(p => p.type === 'org');
    const [signupAs, setSignupAs] = useState('player');
    const [allTeams, setMyTeams] = useState(team ? null : []);
    const myTeams = allTeams && org
        ? allTeams.filter(t => (signupAs === 'org') === (t.owner?.public_id === org.public_id))
        : allTeams;
    const [loadError, setLoadError] = useState('');
    const [teamId, setTeamId] = useState('');
    const [picked, setPicked] = useState([]);
    const [email, setEmail] = useState('');
    const [answers, setAnswers] = useState({});
    const [tried, setTried] = useState(false);
    const [saving, setSaving] = useState(false);
    const [tierIndex, setTierIndex] = useState(0);
    const tier = pay?.tiers[tierIndex];
    const price = tier ? Number(tier.price) : 0;
    const answer = (key) => (e) => setAnswers(a => ({ ...a, [key]: e.target.value }));
    const chosen = myTeams?.find(t => t.public_id === teamId);
    const short = chosen ? need - picked.length : 0;

    useEffect(() => {
        if (!team || !token) return;
        getMyTeams(token).then(setMyTeams).catch(err => { setMyTeams([]); setLoadError(getApiErrorMessage(err)); });
    }, [team, token]);

    const missing = [
        team && (!chosen || teamEntryProblem(chosen, event)) && 'a team you can enter',
        !/^\S+@\S+\.\S+$/.test(email) && 'email',
        ...form.questions.filter(q => q.required && !answers[q.label]?.trim()).map(q => q.label),
    ].filter(Boolean);

    const submit = async (e) => {
        e.preventDefault();
        setTried(true);
        if (missing.length) return;
        setSaving(true);
        const done = await register(event.id, {
            teamId: team ? chosen.public_id : null,
            players: team ? picked : [],
            email: email.trim(),
            answers,
            pass: tier?.name ?? null,
        });
        setSaving(false);
        if (done) onClose();
    };

    return (
        <Modal title={`Sign up for ${event.name}`} onClose={onClose}>
            <form onSubmit={submit} className={styles.form}>
                {team && org &&
                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>Sign up as</span>
                        <div className={styles.segmented} role="radiogroup" aria-label="Sign up as">
                            {[['player', 'Player'], ['org', 'Organization']].map(([value, label]) => (
                                <button key={value} type="button" role="radio" aria-checked={signupAs === value}
                                    className={`${styles.segment} ${signupAs === value ? styles.segmentActive : ''}`}
                                    onClick={() => { setSignupAs(value); setTeamId(''); }}>
                                    {value === 'org' ? `${label} (${org.username})` : label}
                                </button>
                            ))}
                        </div>
                    </div>
                }
                {team
                    ? (
                        <div>
                            <span className={styles.fieldLabel}>Choose your team ({need} players to be signed up)</span>
                            {myTeams === null && <p className={styles.fieldHint}>Loading your teams…</p>}
                            {loadError && <p className={styles.fieldError}>{loadError}</p>}
                            {myTeams?.length === 0 && !loadError && (signupAs === 'org' && org
                                ? <p className={styles.fieldHint}>{org.username} has no teams yet. <Link to="/dashboard?tab=teams">Make a team</Link>, invite players, then come back.</p>
                                : <p className={styles.fieldHint}>You're not on a team yet. <Link to="/dashboard?tab=teams">Make a team</Link>, invite players, then come back.</p>)}
                            {myTeams?.length > 0 &&
                                <div className={styles.passList}>
                                    {myTeams.map(t => {
                                        const problem = teamEntryProblem(t, event);
                                        return (
                                            <label key={t.public_id} className={`${styles.passOption} ${t.public_id === teamId ? styles.passOptionOn : ''}`}>
                                                <input type="radio" name="team" disabled={!!problem} checked={t.public_id === teamId}
                                                    onChange={() => { setTeamId(t.public_id); setPicked([]); }} />
                                                <span>{t.name}</span>
                                                <strong>{problem || `${t.members.length} on the team`}</strong>
                                            </label>
                                        );
                                    })}
                                </div>
                            }
                            {chosen &&
                                <>
                                    <span className={styles.fieldLabel} style={{ marginTop: '1rem' }}>Who's playing</span>
                                    <PlayerPicks members={chosen.members} need={need} picked={picked} onChange={setPicked} />
                                </>
                            }
                            {chosen && short > 0 &&
                                <p className={styles.fieldHint}>
                                    With {picked.length} of {need} picked, {chosen.name} shows to the host as <strong>pending</strong> and won't
                                    take a spot until you pick {short} more - you can do that from the event page later.
                                </p>
                            }
                        </div>
                    )
                    : <p className={styles.blurb}>You'll be entered as <strong>{username}</strong>.</p>
                }
                <div className={styles.field}>
                    <label htmlFor="reg-email">Contact email</label>
                    <input id="reg-email" type="email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                {form.playerFields.map(f => (
                    <div key={f} className={styles.field}>
                        <label htmlFor={`reg-${f}`}>{team ? `Captain's ${f}` : f}</label>
                        <input id={`reg-${f}`} className={styles.input} value={answers[f] ?? ''} onChange={answer(f)} />
                    </div>
                ))}
                {form.questions.map(q => (
                    <div key={q.label} className={styles.field}>
                        <label htmlFor={`reg-q-${q.label}`}>{q.label}{q.required ? '' : ' (optional)'}</label>
                        {q.type === 'select'
                            ? (
                                <select id={`reg-q-${q.label}`} className={styles.select} value={answers[q.label] ?? ''} onChange={answer(q.label)}>
                                    <option value="" disabled>Select...</option>
                                    {q.options.split(',').map(o => o.trim()).filter(Boolean).map(o => <option key={o}>{o}</option>)}
                                </select>
                            )
                            : <input id={`reg-q-${q.label}`} className={styles.input} value={answers[q.label] ?? ''} onChange={answer(q.label)} />
                        }
                    </div>
                ))}
                {tried && missing.length > 0 && <p className={styles.fieldError}>Fill in: {missing.join(', ')}.</p>}

                {pay &&
                    <>
                        <div>
                            <span className={styles.fieldLabel}>Choose your pass</span>
                            <div className={styles.passList}>
                                {pay.tiers.map((t, i) => (
                                    <label key={i} className={`${styles.passOption} ${i === tierIndex ? styles.passOptionOn : ''}`}>
                                        <input type="radio" name="pass" checked={i === tierIndex} onChange={() => setTierIndex(i)} />
                                        <span>{t.name}</span>
                                        <strong>${Number(t.price).toFixed(2)}</strong>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <dl className={styles.detailList}>
                            <dt>Pass</dt><dd>${price.toFixed(2)}</dd>
                            <dt>uSync fee (5%)</dt><dd>${(price * USYNC_FEE_RATE).toFixed(2)}</dd>
                            <dt><strong>Total</strong></dt><dd><strong>${(price * (1 + USYNC_FEE_RATE)).toFixed(2)}</strong></dd>
                        </dl>
                        <p className={styles.fieldHint}>Mockup: in the live version this continues to secure Stripe checkout, the same as our event pass pages.</p>
                    </>
                }

                <div className={styles.formActions}>
                    <button type="button" className={styles.ghostBtn} onClick={onClose}>Cancel</button>
                    <button type="submit" className={styles.primaryBtn} disabled={saving}>
                        {saving ? 'Signing up…' : pay ? `Continue to payment` : 'Sign up'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// /brackets/:eventId - the public event page: everything players need to know,
// sign-up, and (once it's live) the bracket and their own match.
export const PublicBracket = () => {
    const { eventId } = useParams();
    const event = useHostEvent(eventId);
    const { defaultProfile } = useCurrentUser();
    const navigate = useNavigate();
    const username = defaultProfile?.username;
    const [registering, setRegistering] = useState(false);
    const [editingPlayers, setEditingPlayers] = useState(false);
    const [tab, setTab] = useState(null);

    if (!event) return <EventLoading event={event} backTo="/" backLabel="Back home" />;

    // Your entrant (solo, or a team you're on). Only a solo player, or a team's owner or
    // captain, can unregister or report (on the match page); teammates don't see those buttons.
    const viewerId = event.viewerEntrantId ?? '';
    const canAct = event.viewerCanAct;

    const stage = event.stage;
    const byId = entrantsById(event);
    const me = byId[viewerId];
    const published = !!event.bracket && event.bracket.status !== 'draft';
    const built = published ? event.bracket.built : null;
    const stateOf = (m) => matchState(event, m);
    const unit = unitLabel(event);
    const pay = event.payments?.enabled ? event.payments : null;
    const lastDelay = event.delays?.[event.delays.length - 1];

    const myMatch = viewerMatch(event, built);
    const myState = myMatch && stateOf(myMatch);
    const opponent = myMatch && byId[myMatch.a === me.id ? myMatch.b : myMatch.a];

    // Before the bracket is live a full event still shows its sign-up button, disabled.
    const full = isFull(event);
    const canRegister = !me && event.registrationOpen && !published && !full;
    const showFull = !me && event.registrationOpen && !published && full;
    // Live events open on the bracket; upcoming ones on the event info.
    const activeTab = tab ?? (published ? 'bracket' : 'info');

    const unregister = () => {
        if (window.confirm(`Unregister ${me.name} from ${event.name}?`)) {
            leaveEvent(event.id);
        }
    };

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>{`uSync | ${event.name}`}</title>

            <div className={styles.inner}>
                <BracketError />

                {lastDelay &&
                    <div className={styles.delayBanner}>
                        <FaClock /> <span>Start time moved to <strong>{formatDate(event.startsAt)}</strong>{lastDelay.reason && <> - {lastDelay.reason}</>}</span>
                    </div>
                }

                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}>{event.game} · {EVENT_TYPES[event.eventType] ?? 'Event'}</p>
                        <h1 className={styles.title}>{event.name}</h1>
                        <div className={styles.metaRow}>
                            <StageChip stage={stage} />
                            <span><FaGamepad /> {event.teamSize}</span>
                            <span><FaCalendarAlt /> {formatDate(event.startsAt)}</span>
                            <span><FaSitemap /> {formatLabel(event)} · Bo{event.bestOf}</span>
                            <span><FaMapMarkerAlt /> {locationLabel(event)}</span>
                            {event.prize && <span><FaTrophy /> {event.prize}</span>}
                        </div>
                    </div>
                    <div className={styles.btnRow}>
                        <ShareButton event={event} className={styles.ghostBtn} />
                        {canRegister && (username
                            ? <button type="button" className={styles.primaryBtn} onClick={() => setRegistering(true)}>Sign up</button>
                            : <Link to="/login" className={styles.primaryBtn}>Log in to sign up</Link>)}
                        {showFull && <button type="button" className={styles.primaryBtn} disabled>Event is Full</button>}
                    </div>
                </div>

                <nav className={styles.tabs} aria-label="Event sections">
                    {[['info', 'Event info'], ['bracket', 'Bracket']].map(([key, label]) => (
                        <button key={key} type="button" aria-pressed={activeTab === key}
                            className={`${styles.tab} ${styles.tabButton} ${activeTab === key ? styles.tabActive : ''}`}
                            onClick={() => setTab(key)}>
                            {label}
                            {key === 'bracket' && myMatch && <span className={styles.tabDot} aria-label="you have a match to play" />}
                        </button>
                    ))}
                </nav>

                {activeTab === 'info' &&
                <div className={styles.publicLayout}>
                    <div className={styles.publicMain}>
                        {event.description &&
                            <section className={styles.card}>
                                <h2 className={styles.sectionTitle}>About this event</h2>
                                <p className={styles.preWrap}>{event.description}</p>
                            </section>
                        }

                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Details</h2>
                            <dl className={styles.detailList}>
                                <dt>Type</dt><dd>{EVENT_TYPES[event.eventType] ?? '-'}</dd>
                                <dt>Game</dt><dd>{gameDisplayName(event)}</dd>
                                <dt>Format</dt><dd>{formatSummary(event)}</dd>
                                <dt>Team size</dt><dd>{event.teamSize}</dd>
                                <dt>Starts</dt><dd>{formatDate(event.startsAt)}</dd>
                                <dt>Location</dt><dd>{locationLabel(event)}</dd>
                                {event.restrictions?.length > 0 && <><dt>Restrictions</dt><dd><RestrictionList event={event} /></dd></>}
                                <dt>Entry</dt><dd>{event.entryFee || 'Free'}</dd>
                                <dt>Prize</dt><dd>{event.prize || '-'}</dd>
                                <dt>Spots</dt><dd>{event.maxEntrants == null ? 'No limit' : `${event.maxEntrants} ${unit}`}</dd>
                                {event.minEntrants != null && <><dt>Minimum</dt><dd>Needs at least {event.minEntrants} {unit} to run</dd></>}
                            </dl>
                        </section>

                        {event.rules &&
                            <section className={styles.card}>
                                <h2 className={styles.sectionTitle}>Rules</h2>
                                <p className={styles.preWrap}>{event.rules}</p>
                            </section>
                        }

                    </div>

                    <aside className={styles.publicSide}>
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Registration</h2>
                            <p className={styles.blurb}>
                                {capacityLabel(event)} {unit} signed up
                                {pay && <> · <FaTicketAlt /> from ${Math.min(...pay.tiers.map(t => Number(t.price))).toFixed(2)}</>}
                            </p>

                            {myMatch &&
                                <Link to={matchUrl(event.id, myMatch.id)} className={`${styles.secondaryBtn} ${styles.fullBtn}`} style={{ marginBottom: '.75rem' }}>
                                    You have a match vs {opponent?.name} - view it
                                </Link>
                            }
                            {me
                                ? (
                                    <>
                                        {isPending(event, me)
                                            ? <p className={styles.blurb}><strong>{me.name}</strong> is pending: {me.rosterSize ?? 0} of {teamSizeOf(event)} players picked{isFull(event) ? ', and the event is full' : ''}.</p>
                                            : <p className={styles.registeredNote}><FaCheckCircle /> You're signed up as <strong>{me.name}</strong></p>}
                                        {me.players?.length > 0 && isTeamEvent(event) &&
                                            <p className={styles.fieldHint}>Playing: {me.players.map(p => p.username).join(', ')}</p>}
                                        {!published && canAct && isTeamEvent(event) &&
                                            <button type="button" className={`${styles.secondaryBtn} ${styles.fullBtn}`} style={{ marginBottom: '.5rem' }}
                                                onClick={() => setEditingPlayers(true)}>Change players</button>}
                                        {!published && canAct &&
                                            <button type="button" className={`${styles.dangerBtn} ${styles.fullBtn}`} onClick={unregister}>Unregister</button>}
                                        {!published && !canAct &&
                                            <p className={styles.fieldHint}>Your team's owner or a captain manages its sign-up.</p>}
                                    </>
                                )
                                : canRegister
                                    ? (username
                                        ? <button type="button" className={`${styles.primaryBtn} ${styles.fullBtn}`} onClick={() => setRegistering(true)}>{pay ? 'Sign up & pay' : 'Sign up'}</button>
                                        : <Link to="/login" className={`${styles.primaryBtn} ${styles.fullBtn}`}>Log in to sign up</Link>)
                                    : showFull
                                        ? <button type="button" className={`${styles.primaryBtn} ${styles.fullBtn}`} disabled>Event is Full</button>
                                        : <p className={styles.blurb}>{published ? 'The bracket is live - sign-ups are closed.' : 'Sign-ups are closed.'}</p>
                            }
                        </section>

                    </aside>
                </div>
                }

                {activeTab === 'bracket' &&
                    <>
                        {myMatch &&
                            <section className={`${styles.card} ${styles.myMatch}`}>
                                <h2 className={styles.sectionTitle}>Your match</h2>
                                <p className={styles.blurb}>vs <strong>{opponent?.name}</strong> · <Link to={matchUrl(event.id, myMatch.id)}>Match page: roster, rules and maps</Link></p>
                                {myState === 'disputed' && <p className={styles.tagDisputed}>DISPUTED - an admin will decide</p>}
                                {myState === 'no_show' && <p className={styles.tagNoShow}>NO SHOW REPORTED - waiting on an admin</p>}
                                {myState === 'locked' && <p className={styles.tagNoShow}>ON HOLD - the match before this one is being reviewed</p>}
                                {myState === 'awaiting' && <p className={styles.blurb}>One side has reported a score.</p>}
                                <Link to={matchUrl(event.id, myMatch.id)} className={styles.primaryBtn}>
                                    {canAct ? 'Go to your match to report' : 'View your match'}
                                </Link>
                            </section>
                        }
                {published
                    ? (
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Bracket</h2>
                            <Bracket
                                format={event.format}
                                built={built}
                                entrants={byId}
                                stateOf={stateOf}
                                viewerId={viewerId}
                                view
                                onSelect={(m) => navigate(matchUrl(event.id, m.id))}
                                canSelect={(m) => m.status === 'ready' || m.status === 'complete'}
                            />
                        </section>
                    )
                    : (
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Who's playing</h2>
                            <p className={styles.blurb}>The bracket is posted once sign-ups close.</p>
                            <div className={styles.chipWrap}>
                                {signedUpEntrants(event).map(e => (
                                    <span key={e.id} className={`${styles.chip} ${styles.nameChip} ${e.id === viewerId ? styles.nameChipYou : ''}`}>{e.name}</span>
                                ))}
                                {pendingEntrants(event).map(e => (
                                    <span key={e.id} className={`${styles.chip} ${styles.nameChip} ${e.id === viewerId ? styles.nameChipYou : ''}`} style={{ opacity: .6 }}
                                        title={`Pending: ${e.rosterSize ?? 0} of ${teamSizeOf(event)} players`}>{e.name} (pending)</span>
                                ))}
                                {event.entrants.length === 0 && <span className={styles.muted}>No one yet - be the first.</span>}
                            </div>
                        </section>
                    )
                }
                    </>
                }

            </div>

            {registering && <RegisterDialog event={event} username={username} onClose={() => setRegistering(false)} />}
            {editingPlayers && me && <EditPlayersDialog event={event} entrant={me} onClose={() => setEditingPlayers(false)} />}

        </div>
    );
};

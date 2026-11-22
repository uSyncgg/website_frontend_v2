import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth, useCurrentUser } from "hooks";
import { FaBan, FaCalendarAlt, FaCheckCircle, FaClock, FaGamepad, FaMapMarkerAlt, FaMoneyBillWave, FaSitemap, FaTicketAlt, FaTrophy } from "react-icons/fa";
import { Bracket } from "components/Bracket/Bracket";
import {
    useHostEvent, isFull, isSolo, register, setPlayers, unregister as leaveEvent, needsPlayers, signedUpEntrants, entrantsNeedingPlayers, teamSizeOf,
    matchState, viewerMatch, hasEntryFee, entryCostCents, payoutPercents, requestAutoPay, useBracketError, clearBracketError,
    ordinal, payoutStatus,
} from "services/brackets";
import { useWallet, refreshWallet, formatMoney } from "services/wallet";
import { getMyTeams, getTeam } from "services/teams";
import { getApiErrorMessage } from "utils/apiError";
import { EVENT_TYPES, matchUrl } from "utils/hostEvents";
import { BracketError, Modal, ShareButton, StageChip, capacityLabel, entrantsById, formatDate, formatLabel, unitLabel, isTeamEvent, EventLoading, formatSummary, locationLabel, gameDisplayName, RestrictionList } from "./hostShared";
import { USYNC_FEE_RATE } from "utils/fees";
import styles from "./Host.module.css";


// Why one of your teams can't be entered in this event, or '' when it can. Every entry needs a
// full roster: exactly the team size in players. In a solo event a team can enter several of its
// players, one entry each. (The server checks all of this too.)
const teamEntryProblem = (team, event) => {
    const need = teamSizeOf(event);
    if (!['owner', 'captain'].includes(team.my_role)) return 'Only the owner or a captain can enter this team';
    if (!isSolo(event) && event.entrants.some(e => e.teamId === team.public_id)) return 'Already entered';
    if (!(team.games ?? []).some(g => g.key === event.gameKey)) return `Doesn't play ${event.game}`;
    if (team.members.length < need) return `Not enough players on the roster (needs ${need}, has ${team.members.length})`;
    return '';
};

const placeLabel = (i) => ordinal(i + 1);

// "1st 70% · 2nd 30%"
const PayoutSplit = ({ structure }) => (
    <ul className={styles.payoutList}>
        {payoutPercents(structure).map((pct, i) => <li key={i}>{placeLabel(i)} <strong>{pct}%</strong></li>)}
    </ul>
);

// The prize line for the details card and header: the guarantee, or the pool so far.
const prizeSummary = (event) => {
    const money = event.money ?? {};
    if (money.prizeFunding === 'guaranteed') return `${formatMoney(money.guaranteeCents)} guaranteed`;
    if (money.prizeFunding === 'entry_funded') return `From entry fees (${formatMoney(money.poolCents ?? 0)} paid in so far)`;
    return event.prize || '';
};

// Final standings, best first: each entrant's placement (shared placements say so) and, once the
// event has paid out, what it won.
const Standings = ({ event }) => {
    const names = Object.fromEntries(event.entrants.map(e => [e.id, e.name]));
    const counts = event.standings.reduce((n, s) => ({ ...n, [s.placement]: (n[s.placement] ?? 0) + 1 }), {});
    const paid = !!event.money?.paidOutAt;
    return (
        <ol className={styles.standingsList}>
            {event.standings.map(s => (
                <li key={s.entrantId} className={s.entrantId === event.viewerEntrantId ? styles.standingsMine : undefined}>
                    <span className={styles.standingsPlace}>{counts[s.placement] > 1 ? `T-${ordinal(s.placement)}` : ordinal(s.placement)}</span>
                    <span className={styles.standingsName}>{names[s.entrantId] ?? 'Removed entrant'}</span>
                    {paid && s.prizeCents > 0 && <span className={styles.standingsPrize}>{formatMoney(s.prizeCents)}</span>}
                </li>
            ))}
        </ol>
    );
};

// Profile public ids already playing in this event (for any entrant).
const playingIds = (event) => new Set(event.entrants.flatMap(e => (e.players ?? []).map(p => p.public_id)));

// Pick which of a team's players play in this event (exactly the team size; one in a solo
// event). Used when signing up and by the captain to change the picks until the event starts.
// Players already in the event (for another entrant) can't be picked.
const PlayerPicks = ({ members, need, picked, onChange, taken = new Set() }) => (
    <div className={styles.passList}>
        {members.map(m => {
            const on = picked.includes(m.public_id);
            const busy = !on && taken.has(m.public_id);
            const pick = () => {
                if (need === 1) onChange(on ? [] : [m.public_id]);
                else onChange(on ? picked.filter(x => x !== m.public_id) : [...picked, m.public_id]);
            };
            return (
                <label key={m.public_id} className={`${styles.passOption} ${on ? styles.passOptionOn : ''}`}>
                    <input type={need === 1 ? 'radio' : 'checkbox'} checked={on} disabled={busy || (!on && need > 1 && picked.length >= need)}
                        onChange={pick} />
                    <span>{m.username}</span>
                    <strong>{busy ? 'Already in this event' : m.role === 'captain' ? 'Captain' : ''}</strong>
                </label>
            );
        })}
        <p className={styles.fieldHint}>
            {need === 1 ? 'Pick who competes: you or a teammate.' : `${picked.length} of ${need} picked.`} Each player can only play once in this event.
        </p>
    </div>
);

// The captain changes which players play, until the bracket is published.
const EditPlayersDialog = ({ event, entrant, onClose }) => {
    const { session } = useAuth();
    const need = teamSizeOf(event);
    const [members, setMembers] = useState(null);
    const [picked, setPicked] = useState(entrant.players.map(p => p.public_id));
    const [error, setError] = useState('');
    // Players this entrant already has aren't "taken"; other entrants' players are.
    const taken = new Set([...playingIds(event)].filter(id => !entrant.players.some(p => p.public_id === id)));

    useEffect(() => {
        getTeam(entrant.teamId, session?.access_token).then(t => setMembers(t.members)).catch(err => setError(getApiErrorMessage(err)));
    }, [entrant.teamId, session?.access_token]);

    const save = async () => {
        if (await setPlayers(event.id, picked, entrant.id)) {
            if (entrant.payMode) refreshWallet();
            onClose();
        }
    };

    return (
        <Modal title={`Players for ${event.name}`} onClose={onClose}>
            {error && <p className={styles.fieldError}>{error}</p>}
            {members === null && !error && <p className={styles.fieldHint}>Loading your team…</p>}
            {members && <PlayerPicks members={members} need={need} picked={picked} onChange={setPicked} taken={taken} />}
            {entrant.payMode === 'each' &&
                <p className={styles.fieldHint}>
                    Each player pays their own {formatMoney(event.money.entryFeeCents)} entry fee: anyone new pays from their wallet now
                    (they need Auto-Pay on), and anyone you take out gets theirs back.
                </p>}
            <div className={styles.formActions}>
                <button type="button" className={styles.ghostBtn} onClick={onClose}>Cancel</button>
                <button type="button" className={styles.primaryBtn} onClick={save} disabled={picked.length !== need}>Save players</button>
            </div>
        </Modal>
    );
};

// Every entry comes from a team: the owner or a captain picks the team and exactly the team size
// in players (in a solo event, the one player who competes).
const RegisterDialog = ({ event, onClose }) => {
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
    const [allTeams, setMyTeams] = useState(null);
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
    // Wallet entry fee: the captain pays for the team, or each picked player pays their own.
    const fee = hasEntryFee(event) ? event.money.entryFeeCents : 0;
    const teamCost = entryCostCents(event);
    const [payMode, setPayMode] = useState('team');
    const { wallet } = useWallet(!!fee);
    const shortForTeam = fee > 0 && payMode === 'team' && !!wallet && (wallet.frozen || wallet.totalCents < teamCost);
    const error = useBracketError();
    const myIds = new Set(profiles.map(p => p.public_id));
    const teammates = picked.filter(id => !myIds.has(id));
    const [asked, setAsked] = useState(false);
    const askForAutoPay = async () => {
        if (await requestAutoPay(event.id, chosen.public_id, teammates)) {
            setAsked(true);
            clearBracketError();
        }
    };

    // Start clean: an old error from elsewhere on the page shouldn't show in here.
    useEffect(() => { clearBracketError(); }, []);

    useEffect(() => {
        if (!token) return;
        getMyTeams(token).then(setMyTeams).catch(err => { setMyTeams([]); setLoadError(getApiErrorMessage(err)); });
    }, [token]);

    const missing = [
        (!chosen || teamEntryProblem(chosen, event)) && 'a team you can enter',
        chosen && picked.length !== need && (need === 1 ? 'who competes' : `${need} players`),
        !/^\S+@\S+\.\S+$/.test(email) && 'email',
        ...form.questions.filter(q => q.required && !answers[q.label]?.trim()).map(q => q.label),
    ].filter(Boolean);

    const submit = async (e) => {
        e.preventDefault();
        setTried(true);
        if (missing.length) return;
        setSaving(true);
        const done = await register(event.id, {
            teamId: chosen.public_id,
            players: picked,
            email: email.trim(),
            answers,
            pass: tier?.name ?? null,
            payMode: fee ? payMode : null,
        });
        setSaving(false);
        if (done) {
            if (fee) refreshWallet();
            onClose();
        }
    };

    return (
        <Modal title={`Sign up for ${event.name}`} onClose={onClose}>
            <form onSubmit={submit} className={styles.form}>
                {org &&
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
                <div>
                    <span className={styles.fieldLabel}>
                        {team ? `Choose your team (${need} players)` : 'Choose your team, then who competes'}
                    </span>
                    {myTeams === null && <p className={styles.fieldHint}>Loading your teams…</p>}
                    {loadError && <p className={styles.fieldError}>{loadError}</p>}
                    {myTeams?.length === 0 && !loadError && (signupAs === 'org' && org
                        ? <p className={styles.fieldHint}>{org.username} has no teams yet. <Link to="/dashboard?tab=teams">Make a team</Link>, invite players, then come back.</p>
                        : <p className={styles.fieldHint}>You need a team to enter, even for 1v1 events. <Link to="/dashboard?tab=teams">Make a team</Link>, invite players, then come back.</p>)}
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
                            <span className={styles.fieldLabel} style={{ marginTop: '1rem' }}>{team ? "Who's playing" : 'Who competes'}</span>
                            <PlayerPicks members={chosen.members} need={need} picked={picked} onChange={setPicked} taken={playingIds(event)} />
                        </>
                    }
                </div>
                <div className={styles.field}>
                    <label htmlFor="reg-email">Contact email</label>
                    <input id="reg-email" type="email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                {form.playerFields.map(f => (
                    <div key={f} className={styles.field}>
                        <label htmlFor={`reg-${f}`}>{`Captain's ${f}`}</label>
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
                {fee > 0 &&
                    <div className={styles.feeBox}>
                        <span className={styles.fieldLabel}>Entry fee: {formatMoney(fee)} per player{need > 1 ? ` (${formatMoney(teamCost)} a team)` : ''}</span>
                        <div className={styles.passList}>
                            <label className={`${styles.passOption} ${payMode === 'team' ? styles.passOptionOn : ''}`}>
                                <input type="radio" name="payMode" checked={payMode === 'team'} onChange={() => setPayMode('team')} />
                                <span>{need > 1 ? 'I pay for the whole team' : 'I pay'}</span>
                                <strong>{formatMoney(teamCost)} from your wallet</strong>
                            </label>
                            <label className={`${styles.passOption} ${payMode === 'each' ? styles.passOptionOn : ''}`}>
                                <input type="radio" name="payMode" checked={payMode === 'each'} onChange={() => setPayMode('each')} />
                                <span>{need > 1 ? 'Each player pays their own' : 'The player pays their own'}</span>
                                <strong>{formatMoney(fee)} each</strong>
                            </label>
                        </div>
                        {payMode === 'team' && wallet &&
                            <p className={styles.fieldHint}>
                                Your wallet: {formatMoney(wallet.totalCents)}.{' '}
                                {shortForTeam && (wallet.frozen
                                    ? "It's frozen, so it can't pay entry fees right now."
                                    : <>That's not enough. <Link to="/profile#wallet">Add funds</Link>, then sign up.</>)}
                            </p>}
                        {payMode === 'each' &&
                            <p className={styles.fieldHint}>
                                Each player's fee comes out of their own wallet when you sign up. Your teammates need Auto-Pay turned on
                                (in their wallet) and enough in it.
                            </p>}
                        {payMode === 'each' && chosen && teammates.length > 0 && /Auto-Pay/.test(error) && !asked &&
                            <button type="button" className={styles.secondaryBtn} onClick={askForAutoPay}>Ask my teammates to turn on Auto-Pay</button>}
                        {asked && <p className={styles.fieldHint}>Asked. You'll be able to sign up once they've turned it on.</p>}
                        <p className={styles.fieldHint}>Refunded to the same wallets if you unregister before the bracket is posted, or if the event is cancelled.</p>
                    </div>
                }

                {tried && missing.length > 0 && <p className={styles.fieldError}>Fill in: {missing.join(', ')}.</p>}
                {error && <p className={styles.fieldError}>{error}</p>}

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
                    <button type="submit" className={styles.primaryBtn} disabled={saving || shortForTeam}>
                        {saving ? 'Signing up…' : pay ? `Continue to payment`
                            : fee ? (payMode === 'team' ? `Sign up & pay ${formatMoney(teamCost)}` : 'Sign up & take entry fees') : 'Sign up'}
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
    // The entrant id whose players are being changed, or null.
    const [editingPlayers, setEditingPlayers] = useState(null);
    const [tab, setTab] = useState(null);

    if (!event) return <EventLoading event={event} backTo="/" backLabel="Back home" />;

    // Your entrant (one you play for, or your team's). Only a team's owner or captain - or in a
    // solo event the player - can change players, unregister or report (on the match page). In a
    // solo event a captain can have several entrants: viewerActsFor lists them all.
    const viewerId = event.viewerEntrantId ?? '';
    const canAct = event.viewerCanAct;
    const solo = isSolo(event);

    const stage = event.stage;
    const byId = entrantsById(event);
    const me = byId[viewerId];
    const mine = solo ? (event.viewerActsFor ?? []).map(id => byId[id]).filter(Boolean) : [];
    const published = !!event.bracket && event.bracket.status !== 'draft';
    const built = published ? event.bracket.built : null;
    const stateOf = (m) => matchState(event, m);
    const unit = unitLabel(event);
    const pay = event.payments?.enabled ? event.payments : null;
    const lastDelay = event.delays?.[event.delays.length - 1];

    const myMatch = viewerMatch(event, built);
    const myState = myMatch && stateOf(myMatch);
    const opponent = myMatch && byId[myMatch.a === me.id ? myMatch.b : myMatch.a];

    // Before the bracket is live a full event still shows its sign-up button, disabled. In a solo
    // event a captain can keep entering teammates, so the button stays for them.
    const full = isFull(event);
    const mayEnter = !me || solo;
    const canRegister = mayEnter && event.registrationOpen && !published && !full;
    const showFull = mayEnter && event.registrationOpen && !published && full;
    // Live events open on the bracket; upcoming ones on the event info.
    const activeTab = tab ?? (published ? 'bracket' : 'info');

    const cancelled = stage === 'cancelled';
    const prize = prizeSummary(event);
    const payout = payoutStatus(event);

    const unregister = async (entrant) => {
        const refund = entrant.payMode ? ' Entry fees go back to the wallets they came from.' : '';
        if (window.confirm(`Unregister ${entrant.name} from ${event.name}?${refund}`)) {
            if (await leaveEvent(event.id, entrant.id) && entrant.payMode) refreshWallet();
        }
    };

    // One of your entrants: its status and, before the bracket is published, its buttons.
    const entrantPanel = (entrant, acting) => (
        <div key={entrant.id} style={{ marginBottom: '.75rem' }}>
            {needsPlayers(event, entrant)
                ? <p className={styles.blurb}><strong>{entrant.name}</strong> needs players: {entrant.rosterSize ?? 0} of {teamSizeOf(event)} picked. Pick a replacement before the bracket is published or it'll be dropped.</p>
                : <p className={styles.registeredNote}><FaCheckCircle /> {solo && entrant.id !== viewerId ? <>Entered: <strong>{entrant.name}</strong></> : <>You're signed up as <strong>{entrant.name}</strong></>}</p>}
            {solo && entrant.teamName && <p className={styles.fieldHint}>For {entrant.teamName}</p>}
            {entrant.players?.length > 0 && isTeamEvent(event) &&
                <p className={styles.fieldHint}>Playing: {entrant.players.map(p => p.username).join(', ')}</p>}
            {entrant.payMode &&
                <p className={styles.fieldHint}>
                    {entrant.payMode === 'team' ? 'Entry fees paid by the captain.' : `Each player pays their own: ${entrant.paidPlayers?.length ?? 0} of ${teamSizeOf(event)} paid.`}
                </p>}
            {!published && !cancelled && acting &&
                <button type="button" className={`${styles.secondaryBtn} ${styles.fullBtn}`} style={{ marginBottom: '.5rem' }}
                    onClick={() => setEditingPlayers(entrant.id)}>{solo ? 'Change player' : 'Change players'}</button>}
            {!published && !cancelled && acting &&
                <button type="button" className={`${styles.dangerBtn} ${styles.fullBtn}`} onClick={() => unregister(entrant)}>Unregister</button>}
        </div>
    );
    const panels = solo && mine.length > 0
        ? [...(me && !mine.includes(me) ? [me] : []), ...mine]
        : me ? [me] : [];

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>{`uSync | ${event.name}`}</title>

            <div className={styles.inner}>
                <BracketError />

                {cancelled &&
                    <div className={styles.cancelBanner}>
                        <FaBan /> <span><strong>This event was cancelled</strong>{event.money?.cancelReason === 'min_entrants' ? ': not enough signed up by the start time' : ''}.
                            {event.money?.entryFeeCents || event.money?.guaranteeCents ? ' Every entry fee and prize was refunded to the wallet it came from.' : ''}</span>
                    </div>
                }

                {payout &&
                    <div className={styles.payoutBanner}>
                        <FaMoneyBillWave /> <span>{payout.state === 'paid'
                            ? <><strong>Prizes paid out</strong> on {formatDate(payout.at)}. Winnings are in each player's wallet Earnings.</>
                            : <><strong>Prizes pay out {formatDate(payout.at)}</strong>, as long as nothing is under review. A corrected result restarts the 24-hour wait.</>}</span>
                    </div>
                }

                {lastDelay && !cancelled &&
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
                            {prize && <span><FaTrophy /> {prize}</span>}
                        </div>
                    </div>
                    <div className={styles.btnRow}>
                        <ShareButton event={event} className={styles.ghostBtn} />
                        {canRegister && (username
                            ? <button type="button" className={styles.primaryBtn} onClick={() => setRegistering(true)}>Sign up</button>
                            : <Link to="/login" className={styles.primaryBtn}>Log in to sign up</Link>)}
                        {showFull && <button type="button" className={styles.primaryBtn} disabled>Currently full</button>}
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
                        {event.standings?.length > 0 &&
                            <section className={styles.card}>
                                <h2 className={styles.sectionTitle}>Final standings</h2>
                                <Standings event={event} />
                            </section>
                        }

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
                                <dt>Entry</dt><dd>{hasEntryFee(event) ? `${formatMoney(event.money.entryFeeCents)} per player, paid from your uSync wallet` : (event.entryFee || 'Free')}</dd>
                                <dt>Prize</dt><dd>{prize || '-'}</dd>
                                {event.money?.payoutStructure && <><dt>Payout</dt><dd><PayoutSplit structure={event.money.payoutStructure} /></dd></>}
                                {event.money?.prizeFunding === 'entry_funded' &&
                                    <><dt>Fees</dt><dd>uSync takes {event.money.platformFeeBps / 100}% of the entry fees, then the host takes {event.money.hostCutBps / 100}% of the rest. The remainder is the prize pool.</dd></>}
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
                                {hasEntryFee(event) && <> · <FaTicketAlt /> {formatMoney(event.money.entryFeeCents)} per player</>}
                            </p>

                            {myMatch &&
                                <Link to={matchUrl(event.id, myMatch.id)} className={`${styles.secondaryBtn} ${styles.fullBtn}`} style={{ marginBottom: '.75rem' }}>
                                    You have a match vs {opponent?.name} - view it
                                </Link>
                            }
                            {panels.map(e => entrantPanel(e, (event.viewerActsFor ?? []).includes(e.id) || (e.id === viewerId && canAct)))}
                            {me && !published && !canAct && !mine.length &&
                                <p className={styles.fieldHint}>Your team's owner or a captain manages its sign-up.</p>}
                            {panels.length > 0 && !canRegister && !showFull
                                ? null
                                : canRegister
                                    ? (username
                                        ? <button type="button" className={`${styles.primaryBtn} ${styles.fullBtn}`} onClick={() => setRegistering(true)}>{panels.length ? 'Enter another player' : (pay || hasEntryFee(event)) ? 'Sign up & pay' : 'Sign up'}</button>
                                        : <Link to="/login" className={`${styles.primaryBtn} ${styles.fullBtn}`}>Log in to sign up</Link>)
                                    : showFull
                                        ? <button type="button" className={`${styles.primaryBtn} ${styles.fullBtn}`} disabled>Currently full</button>
                                        : <p className={styles.blurb}>{cancelled ? 'This event was cancelled.' : published ? 'The bracket is live - sign-ups are closed.' : 'Sign-ups are closed.'}</p>
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
                                {entrantsNeedingPlayers(event).map(e => (
                                    <span key={e.id} className={`${styles.chip} ${styles.nameChip} ${e.id === viewerId ? styles.nameChipYou : ''}`} style={{ opacity: .6 }}
                                        title={`Needs players: ${e.rosterSize ?? 0} of ${teamSizeOf(event)}`}>{e.name} (needs players)</span>
                                ))}
                                {event.entrants.length === 0 && <span className={styles.muted}>No one yet - be the first.</span>}
                            </div>
                        </section>
                    )
                }
                    </>
                }

            </div>

            {registering && <RegisterDialog event={event} onClose={() => setRegistering(false)} />}
            {editingPlayers && byId[editingPlayers] && <EditPlayersDialog event={event} entrant={byId[editingPlayers]} onClose={() => setEditingPlayers(null)} />}

        </div>
    );
};

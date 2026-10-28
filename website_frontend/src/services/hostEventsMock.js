import { useSyncExternalStore } from "react";
import { buildBracket, bracketProgress, allMatches, sameMatchup, withResult, withoutResult } from "utils/bracket";

// MOCKUP STORE for host events and brackets. Nothing here talks to the backend
// or the database - events live in this browser's localStorage so the flow can
// be clicked through end to end. Each exported action maps to the API call the
// backend will need (noted beside it), so swapping in real requests later only
// touches this file.

const STORAGE_KEY = 'usync.mock.hostEvents.v3';

// ---- demo data -------------------------------------------------------------

const TAGS = ["Zyphr", "NovaKing", "Blitzz", "ghostlyy", "Rampage", "Kairo", "SnipeGod", "Vexx", "Lumen", "Tempo",
    "Drifter", "OkayJay", "Mako", "Reaper", "Saint", "Phantom", "Juke", "Cypher", "Hex", "Rook", "Valk", "Nyx"];
const TEAMS = ["Night Owls", "Static Gaming", "Lowkey Esports", "Apex Five", "Rogue Unit", "Midnight Club",
    "Cold Front", "Paper Tigers", "Second Wind", "Overtime"];

const minutesFromNow = (minutes) => new Date(Date.now() + minutes * 60000).toISOString();
const daysFromNow = (days, hour = 19) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hour, 0, 0, 0);
    return d.toISOString();
};

const logEntry = (match, scoreA, scoreB, source, prev, extra = {}) => ({
    id: `log-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    matchId: match.id,
    a: match.a,
    b: match.b,
    scoreA,
    scoreB,
    source, // 'host' | 'players' | 'forfeit' | 'cleared'
    prev,
    at: new Date().toISOString(),
    reverted: false,
    ...extra,
});

// What a decision wipes besides the result, kept on the log entry for Revert.
const priorMeta = (bracket, matchId) => ({
    prevReports: bracket.reports?.[matchId] ?? null,
    prevNoShow: bracket.noShows?.[matchId] ?? null,
});

const clearMatchMeta = (bracket, matchId) => ({
    reports: withoutResult(bracket.reports ?? {}, matchId),
    noShows: withoutResult(bracket.noShows ?? {}, matchId),
});

const makeEntrants = (names, { teams = false, checkedIn = () => true } = {}) => names.map((name, i) => ({
    id: `e${i + 1}-${name.toLowerCase().replace(/\W/g, '')}`,
    name,
    captain: teams ? TAGS[(i * 3) % TAGS.length] : name,
    rating: 2400 - ((i * 137) % 1500),
    checkedIn: checkedIn(i),
    registeredAt: daysFromNow(-10 + i * 0.4, 12),
}));

const emptyBracket = (format, seeds) => ({
    format, seeds, results: {}, reports: {}, noShows: {}, log: [], published: false, generatedAt: new Date().toISOString(),
});

const withBracket = (event) => {
    const seeds = [...event.entrants].sort((a, b) => b.rating - a.rating).map(e => e.id);
    return { ...event, bracket: { ...emptyBracket(event.format, seeds), published: true } };
};

// Plays out the next `limit` ready matches (higher seed usually wins).
const playMatches = (event, limit) => {
    let { results, log } = event.bracket;
    const win = Math.ceil(event.bestOf / 2);
    for (let n = 0; n < limit; n++) {
        const next = allMatches(buildBracket(event.format, event.bracket.seeds, results)).find(m => m.status === 'ready');
        if (!next) break;
        const aWins = (next.seedA ?? 0) <= (next.seedB ?? 99) ? n % 4 !== 3 : n % 4 === 3;
        const lose = n % win;
        const [scoreA, scoreB] = aWins ? [win, lose] : [lose, win];
        log = [...log, logEntry(next, scoreA, scoreB, 'players', null)];
        results = withResult(results, next, scoreA, scoreB);
    }
    return { ...event, bracket: { ...event.bracket, results, log } };
};

const readyMatches = (event) =>
    allMatches(buildBracket(event.format, event.bracket.seeds, event.bracket.results)).filter(m => m.status === 'ready');

const baseEvent = {
    description: '',
    rules: '',
    entryFee: 'Free',
    prize: '',
    locationType: 'online',
    venue: '',
    checkInRequired: true,
    registrationOpen: true,
    noShowMinutes: 10,
    payments: { enabled: false },
    // What each player fills in at sign-up (always asked, free or paid).
    signupForm: { playerFields: ['Discord'], questions: [] },
    delays: [],
    bracket: null,
};

// Fills in plausible sign-up answers for the demo entrants.
const demoAnswer = (field, entrant, i) => {
    const tag = entrant.captain.toLowerCase();
    if (field === 'Discord') return `${tag}`;
    if (field === 'Activision ID') return `${entrant.captain}#${4821 + i * 37}`;
    if (field === 'Riot ID') return `${entrant.captain}#NA${i + 1}`;
    if (field === 'Preferred platform') return ['PC', 'PlayStation', 'Xbox'][i % 3];
    return `${entrant.captain}`;
};

const withSignupAnswers = (event) => ({
    ...event,
    entrants: event.entrants.map((entrant, i) => ({
        ...entrant,
        email: `${entrant.captain.toLowerCase()}@example.com`,
        answers: Object.fromEntries([
            ...(event.signupForm?.playerFields ?? []),
            ...(event.signupForm?.questions ?? []).map(q => q.label),
        ].map(field => [field, demoAnswer(field, entrant, i)])),
        teammates: event.teamSize === '1v1' ? [] : Array.from({ length: Number(event.teamSize[0]) - 1 }, (_, n) => TAGS[(i * 5 + n + 3) % TAGS.length]),
    })),
});

const buildDemoEvents = () => {
    const friday = {
        ...baseEvent,
        id: 'evt-friday-1v1s',
        name: "uSync Friday Night 1v1s",
        game: "Call of Duty",
        format: 'single_elim',
        teamSize: '1v1',
        bestOf: 3,
        maxEntrants: 16,
        startsAt: daysFromNow(3),
        entryFee: '$10',
        prize: '$100 to 1st',
        description: 'Weekly open 1v1 bracket. Gunfight maps, first to 6 rounds.\n\nCheck in opens an hour before start. Brackets go live at start time.',
        rules: 'Gunfight, BO3. Higher seed picks the first map.\nBoth players report the score after every match - if you disagree, the host decides.\nNo-shows can be reported 10 minutes after your match is called.',
        payments: {
            enabled: true,
            payoutEmail: 'host@example.com',
            tiers: [{ name: 'Player Pass', price: '10.00', capacity: '' }],
        },
        signupForm: {
            playerFields: ['Activision ID', 'Discord'],
            questions: [{ label: 'Preferred platform', type: 'select', options: 'PC, PlayStation, Xbox', required: true }],
        },
        entrants: makeEntrants(TAGS.slice(0, 13), { checkedIn: i => i % 4 !== 2 }),
        createdAt: daysFromNow(-12),
    };

    // Live event: some results in, one match awaiting confirmation, one disputed, one no-show reported.
    let valorant = playMatches(withBracket({
        ...baseEvent,
        id: 'evt-valorant-cup',
        name: "Valorant Community Cup",
        game: "Valorant",
        format: 'single_elim',
        teamSize: '5v5',
        bestOf: 3,
        maxEntrants: 8,
        startsAt: minutesFromNow(-90),
        prize: '$500 pool',
        registrationOpen: false,
        description: '8-team invitational, single elimination. Captains report scores from the event page.',
        rules: 'BO3, standard map veto. Captains report every result. Disputes go to the host with screenshots.',
        entrants: makeEntrants(TEAMS.slice(0, 8), { teams: true }),
        createdAt: daysFromNow(-20),
    }), 1);
    const [awaiting, disputed, noShow] = readyMatches(valorant);
    valorant.bracket.reports = {
        [awaiting.id]: { [awaiting.a]: { a: awaiting.a, b: awaiting.b, scoreA: 2, scoreB: 1, at: minutesFromNow(-4) } },
        [disputed.id]: {
            [disputed.a]: { a: disputed.a, b: disputed.b, scoreA: 2, scoreB: 0, at: minutesFromNow(-12) },
            [disputed.b]: { a: disputed.a, b: disputed.b, scoreA: 1, scoreB: 2, at: minutesFromNow(-10) },
        },
    };
    valorant.bracket.noShows = {
        [noShow.id]: { a: noShow.a, b: noShow.b, reportedBy: noShow.a, against: noShow.b, at: minutesFromNow(-6) },
    };

    const doubleElim = playMatches(withBracket({
        ...baseEvent,
        id: 'evt-halo-double-elim',
        name: "Halo 4v4 Double Elim",
        game: "Halo",
        format: 'double_elim',
        teamSize: '4v4',
        bestOf: 3,
        maxEntrants: null,
        startsAt: minutesFromNow(-60),
        registrationOpen: false,
        description: 'Open double elimination - lose twice and you\'re out.',
        entrants: makeEntrants(TEAMS.slice(0, 6), { teams: true }),
        createdAt: daysFromNow(-9),
    }), 6);

    const pool = playMatches(withBracket({
        ...baseEvent,
        id: 'evt-rl-pool-play',
        name: "Rocket League 2v2 Pool Play",
        game: "Rocket League",
        format: 'round_robin',
        teamSize: '2v2',
        bestOf: 1,
        maxEntrants: 6,
        startsAt: daysFromNow(-6),
        locationType: 'in_person',
        venue: 'Level Up Gaming Lounge, Austin TX',
        registrationOpen: false,
        description: 'LAN pool play - everyone plays everyone.',
        entrants: makeEntrants(TEAMS.slice(4, 10), { teams: true }),
        createdAt: daysFromNow(-30),
    }), 99);

    return [friday, valorant, doubleElim, pool].map(e => withSignupAnswers({ ...baseEvent, ...e }));
};

// ---- store -----------------------------------------------------------------

const load = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch {
        // storage blocked or corrupt - fall back to the demo data
    }
    return buildDemoEvents();
};

let events = load();
const listeners = new Set();

const save = (next) => {
    events = next;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
        // storage unavailable - keep working in memory
    }
    listeners.forEach(fn => fn());
};

const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
};

const update = (id, change) => save(events.map(e => (e.id === id ? { ...e, ...change(e) } : e)));
const updateBracket = (id, change) => update(id, e => ({ bracket: { ...e.bracket, ...change(e.bracket, e) } }));

// ---- reads -----------------------------------------------------------------

export const useHostEvents = () => useSyncExternalStore(subscribe, () => events);

export const useHostEvent = (id) => useSyncExternalStore(subscribe, () => events.find(e => e.id === id) ?? null);

export const isFull = (event) => event.maxEntrants != null && event.entrants.length >= event.maxEntrants;

// Where an event is in its life cycle, derived from its data.
export const eventStage = (event) => {
    if (event.bracket?.published) {
        const { done, total } = bracketProgress(buildBracket(event.format, event.bracket.seeds, event.bracket.results));
        return total > 0 && done === total ? 'complete' : 'live';
    }
    if (event.bracket) return 'seeding';
    return event.registrationOpen ? 'registration' : 'closed';
};

export const STAGE_LABELS = {
    registration: 'Registration open',
    closed: 'Registration closed',
    seeding: 'Seeding',
    live: 'Live',
    complete: 'Complete',
};

// Reports that still apply to the players currently in the match.
const liveReports = (bracket, match) =>
    Object.entries(bracket.reports?.[match.id] ?? {}).filter(([, r]) => sameMatchup(r, match));

// A ready match can be waiting on one side's report, disputed, or have a no-show reported.
// Returns 'no_show' | 'disputed' | 'awaiting' | the match's own status.
export const matchState = (bracket, match) => {
    if (match.status !== 'ready') return match.status;
    if (sameMatchup(bracket.noShows?.[match.id], match)) return 'no_show';
    const reports = liveReports(bracket, match);
    if (reports.length >= 2) return 'disputed';
    if (reports.length === 1) return 'awaiting';
    return 'ready';
};

export const matchReports = (bracket, match) => Object.fromEntries(liveReports(bracket, match));

export const matchNoShow = (bracket, match) =>
    sameMatchup(bracket.noShows?.[match.id], match) ? bracket.noShows[match.id] : null;

// When players can start reporting no-shows: the host's timer after the start time.
// null when the host turned the no-show timer off.
export const noShowUnlocksAt = (event) =>
    event.noShowMinutes == null ? null : new Date(new Date(event.startsAt).getTime() + event.noShowMinutes * 60000);

// ---- writes (mock) ---------------------------------------------------------

// POST /host/events
export const createEvent = (fields) => {
    const id = `evt-${Date.now().toString(36)}`;
    save([{ ...baseEvent, ...fields, id, entrants: [], createdAt: new Date().toISOString() }, ...events]);
    return id;
};

// PATCH /host/events/:id
export const updateEvent = (id, fields) => update(id, () => fields);

// DELETE /host/events/:id
export const deleteEvent = (id) => save(events.filter(e => e.id !== id));

// PATCH /host/events/:id { starts_at } - the backend will notify every registered player.
export const delayStart = (id, newStartsAt, reason) => update(id, e => ({
    startsAt: newStartsAt,
    delays: [...(e.delays ?? []), { from: e.startsAt, to: newStartsAt, reason, at: new Date().toISOString() }],
}));

// POST /host/events/:id/entrants (manual add by the host, or a player registering)
export const addEntrant = (id, name, fields = {}) => {
    const entrantId = `e${Date.now().toString(36)}`;
    update(id, e => ({
        entrants: [...e.entrants, {
            id: entrantId,
            name,
            captain: name,
            rating: 1200,
            checkedIn: !e.checkInRequired,
            registeredAt: new Date().toISOString(),
            ...fields,
        }],
    }));
    return entrantId;
};

// DELETE /host/events/:id/entrants/:entrantId (host removes, or player unregisters)
export const removeEntrant = (id, entrantId) => update(id, e => ({
    entrants: e.entrants.filter(x => x.id !== entrantId),
}));

// PATCH /host/events/:id/entrants/:entrantId { checked_in }
export const setCheckedIn = (id, entrantId, checkedIn) => update(id, e => ({
    entrants: e.entrants.map(x => (x.id === entrantId ? { ...x, checkedIn } : x)),
}));

// PUT /host/events/:id/bracket - saves a draft bracket from the seeding screen.
export const saveBracketDraft = (id, seeds) => update(id, e => ({ bracket: emptyBracket(e.format, seeds) }));

// POST /host/events/:id/bracket/publish - players can see it and results can be reported.
export const publishBracket = (id) => update(id, e => ({
    registrationOpen: false,
    bracket: { ...e.bracket, published: true },
}));

// DELETE /host/events/:id/bracket
export const resetBracket = (id) => update(id, () => ({ bracket: null }));

// PUT /host/events/:id/bracket/matches/:matchId { score_a, score_b } - the host's call is final.
export const hostReportMatch = (id, match, scoreA, scoreB, { forfeit = false } = {}) => updateBracket(id, b => ({
    results: withResult(b.results, match, scoreA, scoreB, forfeit ? { forfeit: true } : {}),
    ...clearMatchMeta(b, match.id),
    log: [...b.log, logEntry(match, scoreA, scoreB, forfeit ? 'forfeit' : 'host', b.results[match.id] ?? null, priorMeta(b, match.id))],
}));

// POST /host/events/:id/bracket/matches/:matchId/reports { score_a, score_b }
// When both sides agree on the winner the result is confirmed and the winner advances.
// Returns 'confirmed' | 'disputed' | 'waiting'.
export const playerReportMatch = (id, match, entrantId, scoreA, scoreB) => {
    const event = events.find(e => e.id === id);
    const opponentId = entrantId === match.a ? match.b : match.a;
    const theirs = matchReports(event.bracket, match)[opponentId];
    const mine = { a: match.a, b: match.b, scoreA, scoreB, at: new Date().toISOString() };

    if (theirs && (theirs.scoreA > theirs.scoreB) === (scoreA > scoreB)) {
        updateBracket(id, b => ({
            results: withResult(b.results, match, scoreA, scoreB),
            ...clearMatchMeta(b, match.id),
            log: [...b.log, logEntry(match, scoreA, scoreB, 'players', b.results[match.id] ?? null)],
        }));
        return 'confirmed';
    }
    updateBracket(id, b => ({
        reports: { ...b.reports, [match.id]: { ...(b.reports?.[match.id] ?? {}), [entrantId]: mine } },
    }));
    return theirs ? 'disputed' : 'waiting';
};

// POST /host/events/:id/bracket/matches/:matchId/no-show
export const reportNoShow = (id, match, reporterId) => updateBracket(id, b => ({
    noShows: {
        ...b.noShows,
        [match.id]: { a: match.a, b: match.b, reportedBy: reporterId, against: reporterId === match.a ? match.b : match.a, at: new Date().toISOString() },
    },
}));

// DELETE /host/events/:id/bracket/matches/:matchId/no-show
export const dismissNoShow = (id, matchId) => updateBracket(id, b => ({ noShows: withoutResult(b.noShows ?? {}, matchId) }));

// DELETE /host/events/:id/bracket/matches/:matchId - un-report a match.
export const clearMatch = (id, match) => updateBracket(id, b => ({
    results: withoutResult(b.results, match.id),
    ...clearMatchMeta(b, match.id),
    log: [...b.log, logEntry(match, null, null, 'cleared', b.results[match.id] ?? null, priorMeta(b, match.id))],
}));

// POST /host/events/:id/bracket/log/:entryId/revert - put the match back how it was before that decision.
export const revertDecision = (id, entryId) => updateBracket(id, b => {
    const entry = b.log.find(l => l.id === entryId);
    if (!entry || entry.reverted) return {};
    const restore = (map, value) => (value ? { ...map, [entry.matchId]: value } : withoutResult(map ?? {}, entry.matchId));
    return {
        results: restore(b.results, entry.prev),
        reports: restore(b.reports, entry.prevReports),
        noShows: restore(b.noShows, entry.prevNoShow),
        log: b.log.map(l => (l.id === entryId ? { ...l, reverted: true, revertedAt: new Date().toISOString() } : l)),
    };
});

// Mockup only: put the demo events back.
export const resetDemoEvents = () => save(buildDemoEvents());

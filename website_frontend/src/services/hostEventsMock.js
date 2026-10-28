import { useSyncExternalStore } from "react";
import { buildBracket, bracketProgress, withResult, withoutResult } from "utils/bracket";

// MOCKUP STORE for host events and brackets. Nothing here talks to the backend
// or the database - events live in this browser's localStorage so the flow can
// be clicked through end to end. Each exported action maps to the API call the
// backend will need (noted beside it), so swapping in real requests later only
// touches this file.

const STORAGE_KEY = 'usync.mock.hostEvents.v1';

// ---- demo data -------------------------------------------------------------

const TAGS = ["Zyphr", "NovaKing", "Blitzz", "ghostlyy", "Rampage", "Kairo", "SnipeGod", "Vexx", "Lumen", "Tempo",
    "Drifter", "OkayJay", "Mako", "Reaper", "Saint", "Phantom", "Juke", "Cypher", "Hex", "Rook", "Valk", "Nyx"];
const TEAMS = ["Night Owls", "Static Gaming", "Lowkey Esports", "Apex Five", "Rogue Unit", "Midnight Club",
    "Cold Front", "Paper Tigers", "Second Wind", "Overtime"];

const daysFromNow = (days, hour = 19) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hour, 0, 0, 0);
    return d.toISOString();
};

const makeEntrants = (names, { teams = false, checkedIn = () => true } = {}) => names.map((name, i) => ({
    id: `e${i + 1}-${name.toLowerCase().replace(/\W/g, '')}`,
    name,
    captain: teams ? TAGS[(i * 3) % TAGS.length] : name,
    rating: 2400 - ((i * 137) % 1500),
    checkedIn: checkedIn(i),
    registeredAt: daysFromNow(-10 + i * 0.4, 12),
}));

const withBracket = (event, results = {}) => {
    const seeds = [...event.entrants].sort((a, b) => b.rating - a.rating).map(e => e.id);
    return { ...event, bracket: { format: event.format, seeds, results, published: true, generatedAt: daysFromNow(-1) } };
};

// Plays out every match the bracket currently allows, `limit` at a time.
const playMatches = (event, limit) => {
    let results = event.bracket.results;
    for (let n = 0; n < limit; n++) {
        const built = buildBracket(event.format, event.bracket.seeds, results);
        const next = built.rounds.flat().find(m => m.status === 'ready');
        if (!next) break;
        const aWins = (next.seedA ?? 0) <= (next.seedB ?? 99) ? n % 4 !== 3 : n % 4 === 3;
        const win = Math.ceil(event.bestOf / 2);
        const lose = (n % win);
        results = withResult(results, next, aWins ? win : lose, aWins ? lose : win);
    }
    return { ...event, bracket: { ...event.bracket, results } };
};

const baseEvent = {
    description: '',
    rules: '',
    entryFee: 'Free',
    prize: '',
    locationType: 'online',
    venue: '',
    checkInRequired: true,
    registrationOpen: true,
    bracket: null,
};

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
        prize: '$100 to 1st',
        description: 'Weekly open 1v1 bracket. Gunfight maps, first to 6 rounds.',
        rules: 'Gunfight, BO3. Higher seed picks the first map. Screenshot every result.',
        entrants: makeEntrants(TAGS.slice(0, 13), { checkedIn: i => i % 4 !== 2 }),
        createdAt: daysFromNow(-12),
    };

    const valorant = playMatches(withBracket({
        ...baseEvent,
        id: 'evt-valorant-cup',
        name: "Valorant Community Cup",
        game: "Valorant",
        format: 'single_elim',
        teamSize: '5v5',
        bestOf: 3,
        maxEntrants: 8,
        startsAt: daysFromNow(0, 14),
        prize: '$500 pool',
        registrationOpen: false,
        description: '8-team invitational, single elimination.',
        entrants: makeEntrants(TEAMS.slice(0, 8), { teams: true }),
        createdAt: daysFromNow(-20),
    }), 5);

    const rocket = playMatches(withBracket({
        ...baseEvent,
        id: 'evt-rl-round-robin',
        name: "Rocket League 2v2 Round Robin",
        game: "Rocket League",
        format: 'round_robin',
        teamSize: '2v2',
        bestOf: 1,
        maxEntrants: 6,
        startsAt: daysFromNow(-6),
        locationType: 'in_person',
        venue: 'Level Up Gaming Lounge, Austin TX',
        registrationOpen: false,
        description: 'LAN round robin - everyone plays everyone.',
        entrants: makeEntrants(TEAMS.slice(4, 10), { teams: true }),
        createdAt: daysFromNow(-30),
    }), 99);

    return [friday, valorant, rocket];
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

// ---- reads -----------------------------------------------------------------

export const useHostEvents = () => useSyncExternalStore(subscribe, () => events);

export const useHostEvent = (id) => useSyncExternalStore(subscribe, () => events.find(e => e.id === id) ?? null);

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

// POST /host/events/:id/entrants (manual add by the host)
export const addEntrant = (id, name) => update(id, e => ({
    entrants: [...e.entrants, {
        id: `e${Date.now().toString(36)}`,
        name,
        captain: name,
        rating: 1200,
        checkedIn: !e.checkInRequired,
        registeredAt: new Date().toISOString(),
    }],
}));

// DELETE /host/events/:id/entrants/:entrantId
export const removeEntrant = (id, entrantId) => update(id, e => ({
    entrants: e.entrants.filter(x => x.id !== entrantId),
}));

// PATCH /host/events/:id/entrants/:entrantId { checked_in }
export const setCheckedIn = (id, entrantId, checkedIn) => update(id, e => ({
    entrants: e.entrants.map(x => (x.id === entrantId ? { ...x, checkedIn } : x)),
}));

// PUT /host/events/:id/bracket - saves a draft bracket from the seeding screen.
export const saveBracketDraft = (id, seeds) => update(id, e => ({
    bracket: { format: e.format, seeds, results: {}, published: false, generatedAt: new Date().toISOString() },
}));

// POST /host/events/:id/bracket/publish - players can see it and results can be reported.
export const publishBracket = (id) => update(id, e => ({
    registrationOpen: false,
    bracket: { ...e.bracket, published: true },
}));

// DELETE /host/events/:id/bracket
export const resetBracket = (id) => update(id, () => ({ bracket: null }));

// PUT /host/events/:id/bracket/matches/:matchId { score_a, score_b }
export const reportMatch = (id, match, scoreA, scoreB) => update(id, e => ({
    bracket: { ...e.bracket, results: withResult(e.bracket.results, match, scoreA, scoreB) },
}));

// DELETE /host/events/:id/bracket/matches/:matchId
export const clearMatch = (id, matchId) => update(id, e => ({
    bracket: { ...e.bracket, results: withoutResult(e.bracket.results, matchId) },
}));

// Mockup only: put the demo events back.
export const resetDemoEvents = () => save(buildDemoEvents());

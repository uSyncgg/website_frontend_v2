import apiClient from "./apiClient";

// Read-only admin analytics. Nothing here writes to the database.
//
// Reads GET /admin/analytics and GET /admin/events. The backend only answers accounts listed in
// the admins table and runs these on a READ ONLY database transaction.
// Set REACT_APP_ADMIN_ANALYTICS_MOCK=true to use sample data instead (e.g. without a backend).
const USE_MOCK = process.env.REACT_APP_ADMIN_ANALYTICS_MOCK === 'true';

// Expected response shape (the mock returns the same thing):
// {
//   generated_at: ISO timestamp,
//   totals:  { total, unfinished, players, hosts, venues },  // total is every sign-up; the role
//                                                            // counts are completed profiles
//   signups: [{ date: 'YYYY-MM-DD', total, unfinished, players, hosts, venues }],  // days with sign-ups, oldest first
//   games:   { players: { [game]: count }, hosts: { [game]: count } }  // profiles listing each game now
// }
export const getAdminAnalytics = () => {
    if (USE_MOCK) return Promise.resolve(buildMockAnalytics());
    return apiClient.get(`/admin/analytics`).then(res => ({ ...res.data, signups: fillDays(res.data.signups) }));
};

// Response shape:
// {
//   generated_at: ISO timestamp,
//   events: [{ id, name, event_type: 'LAN' | 'LEAGUE' | 'LEAGUE_GROUP' | 'WAGER' | 'XP', game, path,
//              status, verified, host_owned, updated_at, updated_by }]   // newest update first
// }
// updated_by is always null until the backend records who made each edit.
export const getAdminEvents = () => {
    if (USE_MOCK) return Promise.resolve(buildMockEvents());
    return apiClient.get(`/admin/events`).then(res => res.data);
};

export const LINK_PLATFORMS = [
    { key: 'battlenet', label: 'Battle.net' },
    { key: 'activision', label: 'Activision' },
    { key: 'steam', label: 'Steam' },
    { key: 'riot', label: 'Riot' },
    { key: 'discord', label: 'Discord' },
    { key: 'twitch', label: 'Twitch' },
    { key: 'twitter', label: 'X / Twitter' },
    { key: 'youtube', label: 'YouTube' },
    { key: 'kick', label: 'Kick' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'cmg', label: 'CMG' },
    { key: 'gankster', label: 'Gankster' },
    { key: 'faceit', label: 'FACEIT' },
    { key: 'battlefy', label: 'Battlefy' },
];

// Response shape: { generated_at, accounts: [{ id, username, email, created_at, is_player, is_host,
// is_venue, profile_complete, games: [string], linked: { [platform]: handle } }] }
export const getAdminAccounts = () => {
    if (USE_MOCK) return Promise.resolve(buildMockAccounts());
    return apiClient.get(`/admin/accounts`).then(res => res.data);
};

export const isoDay = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// The backend only returns days that had sign-ups; the charts slice by day count, so add
// zero rows for every missing day, covering at least the last year up to today.
function fillDays(rows) {
    const byDate = new Map(rows.map(r => [r.date, r]));
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - (MOCK_DAYS - 1));
    if (rows.length && new Date(`${rows[0].date}T00:00:00`) < day) day.setTime(new Date(`${rows[0].date}T00:00:00`).getTime());

    const today = isoDay(new Date());
    const filled = [];
    for (let iso = isoDay(day); iso <= today; day.setDate(day.getDate() + 1), iso = isoDay(day)) {
        filled.push(byDate.get(iso) ?? { date: iso, total: 0, unfinished: 0, players: 0, hosts: 0, venues: 0 });
    }
    return filled;
}

export const isMockAnalytics = USE_MOCK;

// ---- mock data -------------------------------------------------------------

const MOCK_DAYS = 365;

// Small seeded PRNG so the mock is the same on every load.
const seeded = (seed) => () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
};

const MOCK_GAME_WEIGHTS = {
    players: { "Call of Duty": 34, "Valorant": 22, "Rocket League": 14, "CS 2": 12, "Warzone": 11, "League of Legends": 9, "Halo": 6, "Other": 4 },
    hosts:   { "Call of Duty": 18, "Valorant": 9, "CS 2": 7, "Rocket League": 6, "Halo": 5, "Warzone": 4, "League of Legends": 3, "Other": 2 },
};

function buildMockAnalytics() {
    const rand = seeded(42);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const signups = [];
    for (let i = MOCK_DAYS - 1; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        // Growth trend plus noise and a weekend bump.
        const trend = 2 + (MOCK_DAYS - i) / 40;
        const weekend = [0, 6].includes(day.getDay()) ? 1.4 : 1;
        const players = Math.round(trend * weekend * (0.5 + rand()));
        const hosts = rand() < 0.35 ? Math.round(rand() * 2) : 0;
        const venues = rand() < 0.08 ? 1 : 0;
        // Some sign-ups are both player and host - one account, counted once in total.
        const both = Math.min(hosts, rand() < 0.3 ? 1 : 0);
        const unfinished = rand() < 0.3 ? 1 : 0;
        signups.push({
            date: day.toISOString().slice(0, 10),
            total: players + hosts + venues - both + unfinished,
            unfinished,
            players,
            hosts,
            venues,
        });
    }

    const sum = (key) => signups.reduce((n, d) => n + d[key], 0);
    const totals = { total: sum('total'), unfinished: sum('unfinished'), players: sum('players'), hosts: sum('hosts'), venues: sum('venues') };

    // Spread each role's accounts across games by weight; people pick ~1.6 games on average.
    const spread = (weights, accounts) => {
        const weightTotal = Object.values(weights).reduce((a, b) => a + b, 0);
        return Object.fromEntries(Object.entries(weights).map(([game, w]) =>
            [game, Math.round(accounts * 1.6 * (w / weightTotal) * (0.9 + rand() * 0.2))]
        ));
    };

    return {
        generated_at: new Date().toISOString(),
        totals,
        signups,
        games: {
            players: spread(MOCK_GAME_WEIGHTS.players, totals.players),
            hosts: spread(MOCK_GAME_WEIGHTS.hosts, totals.hosts),
        },
    };
}

const MOCK_EVENT_TYPES = ['LAN', 'LEAGUE', 'LEAGUE', 'LEAGUE', 'LEAGUE_GROUP', 'WAGER', 'XP'];

function buildMockEvents() {
    const rand = seeded(7);
    const games = Object.keys(MOCK_GAME_WEIGHTS.players).filter(g => g !== 'Other');
    const events = Array.from({ length: 60 }, (_, i) => {
        const updated = new Date();
        updated.setDate(updated.getDate() - Math.floor(rand() * rand() * 200));
        return {
            id: `mock-${i}`,
            name: `Sample Event ${i + 1}`,
            event_type: MOCK_EVENT_TYPES[Math.floor(rand() * MOCK_EVENT_TYPES.length)],
            game: games[Math.floor(rand() * games.length)],
            path: null,
            status: rand() < 0.8 ? 'approved' : 'pending',
            verified: rand() < 0.3,
            host_owned: rand() < 0.2,
            updated_at: updated.toISOString(),
            updated_by: null,
        };
    });
    events.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    return { generated_at: new Date().toISOString(), events };
}

const MOCK_ACCOUNT_GAMES = ['Call of Duty', 'Valorant', 'Rocket League', 'CS 2', 'Warzone', 'League of Legends', 'Halo'];

function buildMockAccounts() {
    const rand = seeded(11);
    const accounts = Array.from({ length: 120 }, (_, i) => {
        const created = new Date();
        created.setDate(created.getDate() - Math.floor(rand() * 365));
        const isHost = rand() < 0.2;
        const isVenue = rand() < 0.05;
        const isPlayer = !isVenue || rand() < 0.5;
        const complete = rand() < 0.7;
        const linkOdds = complete ? 0.3 : 0.05;
        return {
            id: `mock-${i}`,
            username: `player${i + 1}`,
            email: `player${i + 1}@example.com`,
            created_at: created.toISOString(),
            is_player: isPlayer,
            is_host: isHost,
            is_venue: isVenue,
            profile_complete: complete,
            games: complete ? MOCK_ACCOUNT_GAMES.filter(() => rand() < 0.25) : [],
            linked: Object.fromEntries(LINK_PLATFORMS.map(p => [p.key, rand() < linkOdds ? `${p.key}_user${i}` : null])),
        };
    });
    return { generated_at: new Date().toISOString(), accounts };
}

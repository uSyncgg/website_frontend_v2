import apiClient from "./apiClient";

// Read-only admin analytics. Nothing here writes to the database.
//
// Reads GET /admin/analytics and GET /admin/events. The backend only answers accounts listed in
// its ADMIN_EMAILS and runs these on a READ ONLY database transaction.
// Set REACT_APP_ADMIN_ANALYTICS_MOCK=true to use sample data instead (e.g. without a backend).
const USE_MOCK = process.env.REACT_APP_ADMIN_ANALYTICS_MOCK === 'true';

// Expected response shape (the mock returns the same thing):
// {
//   generated_at: ISO timestamp,
//   totals:  { total, players, hosts, venues },   // total counts each account once,
//                                                 // so it can be less than the sum
//   signups: [{ date: 'YYYY-MM-DD', total, players, hosts, venues }],  // days with sign-ups, oldest first
//   games:   { players: { [game]: count }, hosts: { [game]: count } }  // games picked at sign-up
// }
export const getAdminAnalytics = (token) => {
    if (USE_MOCK) return Promise.resolve(buildMockAnalytics());
    return apiClient.get(`/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => ({ ...res.data, signups: fillDays(res.data.signups) }));
};

// Response shape:
// {
//   generated_at: ISO timestamp,
//   events: [{ id, name, event_type: 'LAN' | 'LEAGUE' | 'LEAGUE_GROUP' | 'WAGER' | 'XP', game, path,
//              status, verified, host_owned, updated_at, updated_by }]   // newest update first
// }
// updated_by is always null until the backend records who made each edit.
export const getAdminEvents = (token) => {
    if (USE_MOCK) return Promise.resolve(buildMockEvents());
    return apiClient.get(`/admin/events`, {
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data);
};

const isoDay = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

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
        filled.push(byDate.get(iso) ?? { date: iso, total: 0, players: 0, hosts: 0, venues: 0 });
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
        signups.push({
            date: day.toISOString().slice(0, 10),
            total: players + hosts + venues - both,
            players,
            hosts,
            venues,
        });
    }

    const sum = (key) => signups.reduce((n, d) => n + d[key], 0);
    const totals = { total: sum('total'), players: sum('players'), hosts: sum('hosts'), venues: sum('venues') };

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

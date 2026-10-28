import apiClient from "./apiClient";

// Read-only admin analytics. Nothing here writes to the database.
//
// Until the backend exposes GET /admin/analytics, the page runs on mock data.
// Set REACT_APP_ADMIN_ANALYTICS_MOCK=false once the endpoint is live.
const USE_MOCK = process.env.REACT_APP_ADMIN_ANALYTICS_MOCK !== 'false';

// Expected response shape (the mock returns the same thing):
// {
//   generated_at: ISO timestamp,
//   totals:  { total, players, hosts, venues },   // total counts each account once,
//                                                 // so it can be less than the sum
//   signups: [{ date: 'YYYY-MM-DD', total, players, hosts, venues }],  // one row per day, oldest first
//   games:   { players: { [game]: count }, hosts: { [game]: count } }  // games picked at sign-up
// }
export const getAdminAnalytics = (token) => {
    if (USE_MOCK) return Promise.resolve(buildMockAnalytics());
    return apiClient.get(`/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data);
};

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

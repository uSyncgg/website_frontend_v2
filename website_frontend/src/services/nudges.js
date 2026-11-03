import apiClient from "./apiClient";
import { isMockAnalytics } from "./adminAnalytics";

// Admin account list + "nudges": short popups an admin sends to a filtered set of accounts.
// Each recipient sees the popup once on their next visit, until they close it.
//
// Backend: GET /admin/accounts is live (read-only). The nudge endpoints are not built yet, and
// sending is off (NUDGE_SENDING_ENABLED) so the dashboard never writes to the backend for now.
// Set REACT_APP_ADMIN_ANALYTICS_MOCK=true to use sample data and browser storage instead.
//   GET  /admin/accounts                 admin only -> { generated_at, accounts: [Account] }
//   POST /admin/nudges                   admin only, { title, message, link_url, link_label, user_ids: [id] }
//                                        -> { id, sent: number }
//   GET  /users/me/nudges                signed in -> { nudges: [Nudge] }   // not yet dismissed, newest first
//   POST /users/me/nudges/{id}/dismiss   signed in
//
// Account = {
//   id, username, email, created_at: ISO timestamp,
//   is_player, is_host, is_venue, profile_complete: boolean,
//   games: [string],
//   linked: { [platform]: handle }   // only the platforms the account has linked
// }
// Nudge = { id, title, message, link_url, link_label, created_at }

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

// Flip on once POST /admin/nudges and GET /users/me/nudges exist.
export const NUDGE_SENDING_ENABLED = isMockAnalytics;

const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

// Nudges sent while mocking, or from the /dev/nudge-test page, live in browser storage.
const LOCAL_KEY = 'usync_local_nudges';

const readLocal = () => {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? [];
    } catch {
        return [];
    }
};

const writeLocal = (nudges) => {
    try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(nudges));
    } catch {
        // Storage blocked - local nudges just won't persist.
    }
};

// The mock "you" account, so a mock send can reach the person testing.
export const MOCK_ME_ID = 'me';

export const sendLocalNudge = (fields, userIds = [MOCK_ME_ID]) => {
    const nudge = { ...fields, id: `local-${Date.now()}`, created_at: new Date().toISOString(), user_ids: userIds, dismissed: false };
    writeLocal([nudge, ...readLocal()]);
    window.dispatchEvent(new Event('usync-nudges-changed'));
    return nudge;
};

export const clearLocalNudges = () => {
    writeLocal([]);
    window.dispatchEvent(new Event('usync-nudges-changed'));
};

const localNudgesForMe = () => readLocal().filter(n => !n.dismissed && n.user_ids.includes(MOCK_ME_ID));

export const getAdminAccounts = async (token) => {
    if (isMockAnalytics) return buildMockAccounts();
    const res = await apiClient.get('/admin/accounts', { headers: authHeaders(token) });
    return res.data.accounts;
};

// fields: { title, message, link_url, link_label }
export const sendNudge = async (token, fields, userIds) => {
    if (isMockAnalytics) {
        const nudge = sendLocalNudge(fields, userIds);
        return { id: nudge.id, sent: userIds.length };
    }
    if (!NUDGE_SENDING_ENABLED) throw new Error('Sending popups is turned off until the backend supports it.');
    const res = await apiClient.post('/admin/nudges', { ...fields, user_ids: userIds }, { headers: authHeaders(token) });
    return res.data;
};

// Local nudges always count, so the test page works against the real backend too.
export const getMyNudges = async (token) => {
    const local = localNudgesForMe();
    if (!NUDGE_SENDING_ENABLED || isMockAnalytics || !token) return local;
    const res = await apiClient.get('/users/me/nudges', { headers: authHeaders(token) });
    return [...local, ...res.data.nudges];
};

export const dismissNudge = async (token, id) => {
    if (String(id).startsWith('local-')) {
        writeLocal(readLocal().map(n => (n.id === id ? { ...n, dismissed: true } : n)));
        return;
    }
    await apiClient.post(`/users/me/nudges/${encodeURIComponent(id)}/dismiss`, null, { headers: authHeaders(token) });
};

// ---- mock data -------------------------------------------------------------

const seeded = (seed) => () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
};

const MOCK_GAMES = ['Call of Duty', 'Valorant', 'Rocket League', 'CS 2', 'Warzone', 'League of Legends', 'Halo'];

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
            games: complete ? MOCK_GAMES.filter(() => rand() < 0.25) : [],
            linked: Object.fromEntries(LINK_PLATFORMS.map(p => [p.key, rand() < linkOdds ? `${p.key}_user${i}` : null])),
        };
    });
    accounts.unshift({
        id: MOCK_ME_ID, username: 'you (test)', email: 'you@example.com', created_at: new Date().toISOString(),
        is_player: true, is_host: false, is_venue: false, profile_complete: false, games: ['Call of Duty'],
        linked: Object.fromEntries(LINK_PLATFORMS.map(p => [p.key, null])),
    });
    return accounts;
}

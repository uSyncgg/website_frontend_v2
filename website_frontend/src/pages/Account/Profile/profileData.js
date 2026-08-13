import { FaTrophy, FaMedal, FaStar, FaFire, FaCrosshairs } from "react-icons/fa";
import { GAMES } from "../SignUp/accountData";

// One place that turns a game key into the name people actually read.
export const gameLabel = (value) => (GAMES.find(g => g.value === value) || {}).label || value;

export const ACHIEVEMENT_ICON_OPTIONS = [
    { value: "trophy", label: "Trophy", icon: FaTrophy },
    { value: "medal", label: "Medal", icon: FaMedal },
    { value: "star", label: "Star", icon: FaStar },
    { value: "fire", label: "Fire", icon: FaFire },
    { value: "crosshairs", label: "Crosshairs", icon: FaCrosshairs },
];

export const getAchievementIcon = (value) => (ACHIEVEMENT_ICON_OPTIONS.find(o => o.value === value) || ACHIEVEMENT_ICON_OPTIONS[0]).icon;

// GB (GameBattles) rank — mocked here as a stand-in for a future live pull
// from uSync's GameBattles rank database, keyed off the player's gb username.
// Ordered lowest to highest.
export const GB_RANK_TIERS = [
    { value: "unranked", label: "Unranked", color: "rgba(255,255,255,.4)" },
    { value: "bronze", label: "Bronze", color: "#cd7f32" },
    { value: "silver", label: "Silver", color: "#c0c0c0" },
    { value: "gold", label: "Gold", color: "#d9c34f" },
    { value: "platinum", label: "Platinum", color: "#6bcf8f" },
    { value: "diamond", label: "Diamond", color: "#7ecbe0" },
    { value: "elite", label: "Elite", color: "#b18af0" },
];

export const getGbRankTier = (value) => GB_RANK_TIERS.find(t => t.value === value) || GB_RANK_TIERS[0];

// Which fields apply to each host event type, per the uSync fields doc.
// Drives both the profile display and the "Add event" edit form.
export const HOST_EVENT_TYPE_FIELDS = {
    lans: ["name", "date", "location", "details", "feePrice", "feeDetails", "url", "headerImg", "bannerImg"],
    leagues: ["name", "seasonality", "details", "region", "teamSize", "feePrice", "feeDetails", "url", "headerImg", "bannerImg"],
    "head-to-head": ["name", "details", "restrictions", "url", "headerImg", "bannerImg"],
    wagers: ["name", "fees", "details", "restrictions", "url", "headerImg", "bannerImg"],
};

export const HOST_EVENT_FIELD_LABELS = {
    name: "Event name",
    date: "Date",
    location: "Location",
    details: "Details",
    feePrice: "Fee price",
    feeDetails: "Fee details",
    url: "Event URL",
    headerImg: "Header image",
    bannerImg: "Banner image",
    seasonality: "Seasonality",
    region: "Region",
    teamSize: "Team size",
    restrictions: "Restrictions",
    fees: "Fees",
};

export const HOST_EVENT_TYPE_LABELS = {
    lans: "LAN",
    leagues: "League",
    "head-to-head": "Head-to-Head",
    wagers: "Wager",
};

// ============================================================
// Demo data — this repo has no backend yet, so both sample
// profiles below stand in for what would otherwise come from
// the signed-in user's account record.
// ============================================================

export const SAMPLE_PLAYER_PROFILE = {
    accountType: "player",
    username: "frostbyte",
    email: "frostbyte@email.com",
    avatar: "",
    firstName: "Jordan",
    lastName: "Reyes",
    phone: "(555) 555-5555",
    gender: "other",
    birthday: "1999-04-12",
    country: "United States",
    state: "Texas",
    zip: "78701",
    timezone: "America/Chicago",
    // Roles are added from Edit profile, not at signup, so a fresh account
    // starts with none — this sample has one to show the badge treatment.
    personas: ["player"],
    games: ["cod", "wz", "cs2"],
    otherGame: "",
    bracketHosting: false,
    bio: "Controller CoD player & part-time wager grinder. Been grinding ranked since Cold War, main SMGs.",
    links: {
        twitch: "frostbytettv",
        twitter: "frostbyte_gg",
        discord: "frostbyte#0001",
        battlenet: "Frostbyte#1234",
        activision: "FrostbyteXO",
        steam: "frostbyte_steam",
        cmg: "frostbyte",
        gb: "FrostbyteGB",
    },
    hidden: { email: true, phone: true, gender: true, birthday: true },

    stats: {
        tournament: [
            { label: "Elites", value: 3 },
            { label: "Golds", value: 7 },
            { label: "Silvers", value: 12 },
            { label: "Bronzes", value: 9 },
        ],
        wager: [
            { label: "Earnings", value: "$2,140" },
            { label: "Wins", value: 58 },
            { label: "Losses", value: 31 },
        ],
        xp: [
            { label: "Wins", value: 214 },
            { label: "Losses", value: 132 },
        ],
    },

    // ---- Player card ----
    // Which calling card is equipped, and the one social + one event platform
    // that get printed on the downloadable card.
    callingCard: "nightfall",
    cardSocial: "twitter",
    cardPlatform: "cmg",
    // Optional cut-out headshot for the card hero. Empty here because a fresh
    // account has none — the card falls back to the avatar block.
    photo: "",

    // Account level. Earned by playing, shown on the card and the dashboard.
    xp: {
        level: 24,
        current: 6840,
        next: 10000,
        note: "24 events played · high-volume competitor",
    },
    // Counters the calling-card unlocks are checked against. These would be
    // derived from real results; here they're set so the picker shows a mix of
    // earned and still-locked cards.
    unlockProgress: {
        eventsEntered: 64,
        tournamentWins: 7,
        lansAttended: 6,
        winStreak: 8,
    },

    // Event counts shown on the card and the dashboard metrics.
    //   events       — everything entered, including wager nights and ladders
    //   competitions — the structured ones: LANs + tournaments + leagues
    eventCounts: { lans: 6, tournaments: 24, leagues: 4, events: 64, competitions: 34 },

    earnings: {
        total: 8450,
        byGame: [
            { label: "Call of Duty: Black Ops 7", value: 5200 },
            { label: "Warzone", value: 1850 },
            { label: "Rocket League", value: 1400 },
        ],
        byType: [
            { label: "Leagues", value: 3100 },
            { label: "LANs", value: 2900 },
            { label: "Tournaments", value: 2450 },
        ],
    },

    record: {
        overall: { w: 333, l: 193 },
        breakdown: [
            { label: "Leagues", w: 61, l: 29, note: "4 seasons · 2 titles" },
            { label: "LANs", w: 34, l: 22, note: "6 events attended" },
            { label: "Wagers", w: 142, l: 88, note: "Verified hosts only" },
            { label: "XP matches", w: 96, l: 54, note: "Ladder play" },
        ],
    },

    // In-game ranks pulled from each title — deliberately separate from the
    // uSync match record above, which only counts uSync events.
    ranks: [
        { game: "Black Ops 7 · Ranked Play", tier: "Crimson II", rating: "5,120 SR", short: "BO7", tint: "#C2703A" },
        { game: "Warzone · Ranked", tier: "Diamond I", rating: "3,640 SR", short: "WZ", tint: "#6E7B8B" },
        { game: "Rocket League · Doubles", tier: "Champion II", rating: "1,285 MMR", short: "RL", tint: "#3E7FC1" },
    ],

    teams: [
        { name: "Iron Vanguard", short: "IV", role: "Starting AR", game: "Black Ops 7", type: "Team", officer: false },
        { name: "Nightfall", short: "NF", role: "Officer", game: "Multi-title", type: "Clan", officer: true },
        { name: "Redline RL", short: "RL", role: "Substitute", game: "Rocket League", type: "Team", officer: false },
    ],

    // Verified-only fields
    lanStats: [
        { placing: "2nd", event: "uSync Winter LAN 2025", proof: "https://example.com/proof/winter-lan-2025" },
        { placing: "1st", event: "Frostbyte Regional Open", proof: "https://example.com/proof/regional-open" },
    ],
    gbRank: "diamond",

    achievements: [
        { id: "a1", icon: "trophy", title: "MVP — Winter Championship 2025", description: "Top fragger across the 64-team bracket.", date: "2025-01-18" },
        { id: "a2", icon: "medal", title: "100 Wager Wins", description: "Hit triple digits on wager wins with a 65% win rate.", date: "2024-11-02" },
        { id: "a3", icon: "star", title: "Community Choice", description: "Voted Player of the Month by the uSync Discord.", date: "2024-08-30" },
    ],
};

export const SAMPLE_HOST_PROFILE = {
    accountType: "host",
    username: "apexcircuit",
    email: "contact@apexcircuit.gg",
    avatar: "",
    accountName: "Apex Circuit Events",
    country: "United States",
    state: "California",
    zip: "90001",
    // No contact-person fields: the org name + account email is the contact.
    games: ["cod", "valorant", "rl"],
    otherGame: "",
    eventTypes: ["tournaments", "leagues", "lans", "wagers"],
    bio: "Running competitive CoD, Valorant, and Rocket League events across the West Coast since 2021.",
    links: {
        twitch: "apexcircuitlive",
        twitter: "apexcircuit",
        youtube: "ApexCircuit",
        instagram: "apexcircuit.gg",
    },
    hidden: { email: true },

    events: [
        {
            id: "e1",
            type: "lans",
            name: "Apex Winter LAN",
            date: "2026-01-24",
            location: "Los Angeles, CA",
            details: "64-player CoD LAN, double elimination.",
            feePrice: "$40",
            feeDetails: "Includes venue access + swag bag.",
            url: "https://apexcircuit.gg/events/winter-lan",
            headerImg: "",
            bannerImg: "",
        },
        {
            id: "e2",
            type: "leagues",
            name: "Apex Valorant League",
            seasonality: "Season 4 — Spring 2026",
            details: "8-week regular season + playoffs.",
            region: "West Coast",
            teamSize: "5",
            feePrice: "$120 / team",
            feeDetails: "Per-team, covers the full season.",
            url: "https://apexcircuit.gg/events/valorant-league",
            headerImg: "",
            bannerImg: "",
        },
        {
            id: "e3",
            type: "wagers",
            name: "Friday Night Wagers",
            details: "Weekly 1v1 and 2v2 wager night.",
            restrictions: "Diamond rank and above only.",
            fees: "$10 entry, winner take all",
            url: "https://apexcircuit.gg/events/friday-wagers",
            headerImg: "",
            bannerImg: "",
        },
    ],
};

// ============================================================
// Per-game stats
//
// A profile is not one career — it's one career per title, and the
// numbers only mean something next to the game they were earned in.
// Everything the dashboard shows is stored per game here; the "All
// games" view is derived by summing, so the two can never disagree.
// ============================================================

export const PLAYER_GAME_STATS = {
    cod: {
        earnings: 5200,
        earningsByType: [
            { label: "Leagues", value: 1900 },
            { label: "LANs", value: 1800 },
            { label: "Tournaments", value: 1500 },
        ],
        record: { w: 201, l: 108 },
        recordBreakdown: [
            { label: "Leagues", w: 38, l: 17, note: "3 seasons" },
            { label: "LANs", w: 21, l: 13, note: "4 events attended" },
            { label: "Wagers", w: 88, l: 52, note: "Verified hosts only" },
            { label: "XP matches", w: 54, l: 26, note: "Ladder play" },
        ],
        counts: { lans: 4, tournaments: 15, leagues: 2, events: 38 },
        placements: { elites: 2, golds: 4, silvers: 7, bronzes: 5 },
        rank: { game: "Black Ops 7 · Ranked Play", tier: "Crimson II", rating: "5,120 SR", short: "BO7", tint: "#C2703A" },
        teams: [{ name: "Iron Vanguard", short: "IV", role: "Starting AR", game: "Black Ops 7", type: "Team", officer: false }],
        achievements: [
            { id: "a1", icon: "trophy", title: "MVP — Winter Championship 2025", description: "Top fragger across the 64-team bracket.", date: "2025-01-18" },
            { id: "a2", icon: "medal", title: "100 Wager Wins", description: "Hit triple digits on wager wins with a 65% win rate.", date: "2024-11-02" },
        ],
        lanStats: [
            { placing: "2nd", event: "uSync Winter LAN 2025", proof: "https://example.com/proof/winter-lan-2025" },
            { placing: "1st", event: "Frostbyte Regional Open", proof: "https://example.com/proof/regional-open" },
        ],
    },

    wz: {
        earnings: 1850,
        earningsByType: [
            { label: "Leagues", value: 700 },
            { label: "LANs", value: 650 },
            { label: "Tournaments", value: 500 },
        ],
        record: { w: 78, l: 52 },
        recordBreakdown: [
            { label: "Leagues", w: 13, l: 7, note: "1 season" },
            { label: "LANs", w: 7, l: 5, note: "1 event attended" },
            { label: "Wagers", w: 34, l: 24, note: "Verified hosts only" },
            { label: "XP matches", w: 24, l: 16, note: "Ladder play" },
        ],
        counts: { lans: 1, tournaments: 6, leagues: 1, events: 16 },
        placements: { elites: 1, golds: 2, silvers: 3, bronzes: 2 },
        rank: { game: "Warzone · Ranked", tier: "Diamond I", rating: "3,640 SR", short: "WZ", tint: "#6E7B8B" },
        teams: [],
        achievements: [
            { id: "a3", icon: "fire", title: "Top 250 Finish", description: "Closed the season inside the Warzone ranked top 250.", date: "2025-03-04" },
        ],
        lanStats: [{ placing: "5th", event: "Desert Clash Warzone LAN", proof: "https://example.com/proof/desert-clash" }],
    },

    cs2: {
        earnings: 1400,
        earningsByType: [
            { label: "Leagues", value: 500 },
            { label: "LANs", value: 450 },
            { label: "Tournaments", value: 450 },
        ],
        record: { w: 54, l: 33 },
        recordBreakdown: [
            { label: "Leagues", w: 10, l: 5, note: "1 season" },
            { label: "LANs", w: 6, l: 4, note: "1 event attended" },
            { label: "Wagers", w: 20, l: 12, note: "Verified hosts only" },
            { label: "XP matches", w: 18, l: 12, note: "Ladder play" },
        ],
        counts: { lans: 1, tournaments: 3, leagues: 1, events: 10 },
        placements: { elites: 0, golds: 1, silvers: 2, bronzes: 2 },
        rank: { game: "CS2 · Premier", tier: "Elite", rating: "18,400", short: "CS2", tint: "#D8A13A" },
        teams: [{ name: "Static Rush", short: "SR", role: "Entry fragger", game: "CS2", type: "Team", officer: false }],
        achievements: [
            { id: "a4", icon: "star", title: "Community Choice", description: "Voted Player of the Month by the uSync Discord.", date: "2024-08-30" },
        ],
        lanStats: [],
    },
};

// Teams that aren't tied to one title, so they show under every game.
export const PLAYER_MULTI_TEAMS = [
    { name: "Nightfall", short: "NF", role: "Officer", game: "Multi-title", type: "Clan", officer: true },
];

const sumBy = (rows) => {
    const merged = [];
    rows.forEach(row => {
        const hit = merged.filter(m => m.label === row.label)[0];
        if (hit) {
            if (row.value != null) hit.value += row.value;
            if (row.w != null) { hit.w += row.w; hit.l += row.l; }
        } else {
            merged.push({ ...row });
        }
    });
    return merged;
};

/**
 * The dashboard's view of a player for one game, or for all of them.
 *
 * @param {object} profile
 * @param {string} gameKey  a game value, or "all"
 */
export const getPlayerView = (profile, gameKey) => {
    const keys = gameKey === "all"
        ? (profile.games || []).filter(g => PLAYER_GAME_STATS[g])
        : [gameKey].filter(g => PLAYER_GAME_STATS[g]);

    const parts = keys.map(k => PLAYER_GAME_STATS[k]);
    const zero = { lans: 0, tournaments: 0, leagues: 0, events: 0 };

    const counts = parts.reduce((acc, p) => ({
        lans: acc.lans + p.counts.lans,
        tournaments: acc.tournaments + p.counts.tournaments,
        leagues: acc.leagues + p.counts.leagues,
        events: acc.events + p.counts.events,
    }), zero);

    const placements = parts.reduce((acc, p) => ({
        elites: acc.elites + p.placements.elites,
        golds: acc.golds + p.placements.golds,
        silvers: acc.silvers + p.placements.silvers,
        bronzes: acc.bronzes + p.placements.bronzes,
    }), { elites: 0, golds: 0, silvers: 0, bronzes: 0 });

    // Multi-title teams belong to every view; single-title ones only to theirs.
    const teams = parts.reduce((acc, p) => acc.concat(p.teams), []).concat(PLAYER_MULTI_TEAMS);

    return {
        games: keys,
        isAll: gameKey === "all",
        counts: { ...counts, competitions: counts.lans + counts.tournaments + counts.leagues },
        earnings: {
            total: parts.reduce((n, p) => n + p.earnings, 0),
            byGame: keys.map(k => ({ label: gameLabel(k), value: PLAYER_GAME_STATS[k].earnings })),
            byType: sumBy(parts.reduce((acc, p) => acc.concat(p.earningsByType), [])),
        },
        record: {
            overall: parts.reduce((acc, p) => ({ w: acc.w + p.record.w, l: acc.l + p.record.l }), { w: 0, l: 0 }),
            breakdown: sumBy(parts.reduce((acc, p) => acc.concat(p.recordBreakdown), [])),
        },
        placements: [
            { label: "Elites", value: placements.elites },
            { label: "Golds", value: placements.golds },
            { label: "Silvers", value: placements.silvers },
            { label: "Bronzes", value: placements.bronzes },
        ],
        ranks: parts.map(p => p.rank),
        teams,
        achievements: parts.reduce((acc, p) => acc.concat(p.achievements), []),
        lanStats: parts.reduce((acc, p) => acc.concat(p.lanStats), []),
    };
};

// ============================================================
// Host stats
//
// A venue's profile has to carry as much weight as a player's, so a
// host gets the same treatment: headline numbers, a breakdown of what
// they run, and a shareable card of their own.
// ============================================================

export const HOST_STATS = {
    totals: {
        events: 48,
        players: 3120,
        prizePaid: 62400,
        seasons: 9,
        verifiedSince: "2023",
    },
    byType: [
        { label: "Tournaments", value: 22 },
        { label: "Wagers", value: 11 },
        { label: "Leagues", value: 9 },
        { label: "LANs", value: 6 },
    ],
    byGame: [
        { label: "Call of Duty", value: 24 },
        { label: "Valorant", value: 14 },
        { label: "Rocket League", value: 10 },
    ],
    // What a player checking out this venue actually wants to know.
    reliability: [
        { label: "Events completed", value: "48 / 48" },
        { label: "Payouts on time", value: "100%" },
        { label: "Avg. entrants", value: "65" },
        { label: "Repeat players", value: "41%" },
    ],
};

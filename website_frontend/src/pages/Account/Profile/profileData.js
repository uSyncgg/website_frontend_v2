import { FaTrophy, FaMedal, FaStar, FaFire, FaCrosshairs } from "react-icons/fa";

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

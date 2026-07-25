import { FaChessKnight, FaSkullCrossbones, FaFistRaised, FaEllipsisH, FaGamepad } from "react-icons/fa";
import { GiPistolGun } from "react-icons/gi";
import {
    SiTwitch, SiYoutube, SiKick, SiBattledotnet, SiActivision, SiSteam,
    SiRiotgames, SiDiscord, SiInstagram
} from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

export const COUNTRIES = [
    "United States", "Canada", "United Kingdom", "Australia", "New Zealand",
    "Germany", "France", "Netherlands", "Belgium", "Sweden", "Norway", "Denmark",
    "Finland", "Ireland", "Spain", "Portugal", "Italy", "Poland", "Austria", "Switzerland",
    "Mexico", "Brazil", "Argentina", "Chile", "Colombia",
    "Japan", "South Korea", "Philippines", "Singapore", "India",
    "South Africa", "United Arab Emirates", "Other",
];

export const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming",
];

export const GENDERS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other / Prefer not to say" },
];

// Same logo assets already used for these games elsewhere on the site (GameImage.jsx)
export const GAMES = [
    { value: "cod", label: "Call of Duty", logo: "https://i.imgur.com/gNvoNEo.png" },
    { value: "cs2", label: "CS2", logo: "https://i.imgur.com/60FwDKN.png" },
    { value: "halo", label: "Halo", logo: "https://i.imgur.com/wqKJfEu.png" },
    { value: "lol", label: "League of Legends", logo: "https://i.imgur.com/5riYNow.png" },
    { value: "rl", label: "Rocket League", logo: "https://i.imgur.com/GJO8JIZ.png" },
    { value: "valorant", label: "Valorant", logo: "https://i.imgur.com/Gsl3oIp.png" },
    { value: "wz", label: "Warzone", logo: "https://i.imgur.com/IBGIbY2.png" },
    { value: "other", label: "None / Other" },
];

// Only Call of Duty has a live Tournaments section today (see src/index.js);
// everything else routes to Coming Soon. Surfaced on the Bracket Hosting step
// so players know what's actually hostable right now.
export const GAME_TOURNAMENT_SUPPORT = {
    cod: true,
    cs2: false,
    halo: false,
    lol: false,
    rl: false,
    valorant: false,
    wz: false,
};

export const PLAYER_GENRES = [
    { value: "fps", label: "FPS", description: "Call of Duty, Valorant, CS2, Halo" },
    { value: "moba", label: "MOBA", description: "League of Legends" },
    { value: "br", label: "Battle Royale", description: "Warzone, Fortnite" },
    { value: "fighting", label: "Fighting Games", description: "1v1 and versus titles" },
    { value: "other", label: "Other", description: "Something else entirely" },
];

export const PERSONA_OPTIONS = [
    { value: "player", label: "Player", description: "Compete in tournaments, leagues, LANs, and wagers" },
    { value: "coach", label: "Coach", description: "Lead and develop a roster" },
    { value: "analyst", label: "Analyst", description: "Break down VODs and scout the meta" },
    { value: "caster", label: "Caster", description: "Commentate and cast matches" },
    { value: "talent", label: "Talent", description: "Host, interview, or create content" },
    { value: "organizer", label: "Organizer", description: "Run brackets and events" },
    { value: "partner", label: "Partner", description: "Sponsor or collaborate with uSync" },
];

export const HOST_EVENT_TYPES = [
    { value: "tournaments", label: "Tournaments" },
    { value: "leagues", label: "Leagues" },
    { value: "lans", label: "LANs" },
    { value: "wagers", label: "Wagers" },
    { value: "head-to-head", label: "Head-to-Head" },
];

export const VERIFIED_BENEFITS = [
    "Verified badge shown on all of your events",
    "Your events are shown above everyone else's",
    "Event analytics for every listing you run",
    "Custom branding on your event's social images",
    "Lower event pass fees for your players",
    "Dedicated placement on the uSync home page",
];

// GB (Gamebattles) is intentionally not offered here, it's reserved for a
// future uSync Verified perk for CoD players, not a general signup option.
export const LINK_PLATFORMS = [
    { value: "twitch", label: "Twitch", icon: SiTwitch },
    { value: "twitter", label: "Twitter / X", icon: FaXTwitter },
    { value: "youtube", label: "YouTube", icon: SiYoutube },
    { value: "kick", label: "Kick", icon: SiKick },
    { value: "battlenet", label: "Battle.net", icon: SiBattledotnet },
    { value: "activision", label: "Activision", icon: SiActivision },
    { value: "steam", label: "Steam", icon: SiSteam },
    { value: "riot", label: "Riot", icon: SiRiotgames },
    { value: "discord", label: "Discord", icon: SiDiscord },
    { value: "instagram", label: "Instagram", icon: SiInstagram },
    { value: "cmg", label: "CMG", icon: FaGamepad },
];

// Host accounts are organizations, not players, so only their public/social
// presence makes sense to link here. Player-identity platforms (Steam, Riot,
// Battle.net, Activision, CMG) only show up if the host also says they play.
export const HOST_LINK_PLATFORMS = [
    { value: "twitch", label: "Twitch", icon: SiTwitch },
    { value: "twitter", label: "Twitter / X", icon: FaXTwitter },
    { value: "youtube", label: "YouTube", icon: SiYoutube },
    { value: "kick", label: "Kick", icon: SiKick },
    { value: "discord", label: "Discord", icon: SiDiscord },
    { value: "instagram", label: "Instagram", icon: SiInstagram },
];

export const GENRE_ICONS = {
    fps: GiPistolGun,
    moba: FaChessKnight,
    br: FaSkullCrossbones,
    fighting: FaFistRaised,
    other: FaEllipsisH,
};

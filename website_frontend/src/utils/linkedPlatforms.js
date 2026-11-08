// Every account a profile can link, in display order. Shared by the profile header (showing
// links) and the link editor (adding/changing them), so both agree on labels, icons and URLs.
// - `group`: 'social', 'competitive' (players) and 'brand' (hosts and venues: their own site and
//   pages) are stored in the profile's `links`; 'game' are the player-only game accounts
//   (details.battlenet, ...). Those will be linked by signing in to the platform (to pull live
//   stats), so they aren't typed in - the editor shows a "Link" button for each instead.
// - `types`: the profile types that can link it.
// - `comingSoon`: shown in the editor but can't be filled in yet.
// - `url(handle)`: the page a linked handle opens. Missing means the handle is only shown/copied.
// - `Icon` (react-icons) or `icon` (image) is the platform's mark.
//
// Only the handle is ever stored, and the URL is always built from our own base for the
// platform. So pasting "https://x.com/name", "x.com/name/", "@name" or even
// "https://anything.com/name" all save "name" and link to https://x.com/name - a link can never
// point people off to another site. See toHandle below.

import { FaFacebook, FaGlobe, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiLinktree, SiTiktok } from "react-icons/si";
import twitterIcon from "assets/images/social_icons/social-icon-x-purple_9.6.26.webp";
import linkedinIcon from "assets/images/social_icons/social-icon-linkedin-purple_9.6.26.webp";
import twitchIcon from "assets/images/linked_platforms/twitch_09-17-26_transparent.webp";
import kickIcon from "assets/images/linked_platforms/kick_logo_09-17-26.webp";
import discordIcon from "assets/images/linked_platforms/discord_logo_09-17-26.webp";
import battlenetIcon from "assets/images/linked_platforms/Battlenet_logo_09-17-26.webp";
import activisionIcon from "assets/images/linked_platforms/Activision_logo_09-17-26.webp";
import steamIcon from "assets/images/linked_platforms/Steam_logo_09-17-26_transparent.webp";
import riotIcon from "assets/images/linked_platforms/Riot_09-17-26_transparent.webp";
import cmgIcon from "assets/images/linked_platforms/cmg_logo_09-17-26.webp";
import ganksterIcon from "assets/images/linked_platforms/gankster_logo_09-17-26.webp";
import faceitIcon from "assets/images/linked_platforms/faceit_logo_09-17-26.webp";
import battlefyIcon from "assets/images/linked_platforms/battefly_logo_09-17-26.webp";

const enc = encodeURIComponent;
const ALL = ['player', 'host', 'venue', 'org'];
const ORGS = ['host', 'venue', 'org'];

// LinkedIn pages live under a section ("company/usync", "in/jake"), which is kept with the name.
const LINKEDIN_SECTIONS = ['company', 'in', 'school', 'showcase'];

export const LINKED_PLATFORMS = [
    { key: 'twitch', label: 'Twitch', group: 'social', icon: twitchIcon, types: ALL, url: h => `https://www.twitch.tv/${enc(h)}` },
    { key: 'youtube', label: 'YouTube', group: 'social', Icon: FaYoutube, types: ALL, url: h => `https://www.youtube.com/@${enc(h)}` },
    { key: 'kick', label: 'Kick', group: 'social', icon: kickIcon, types: ALL, url: h => `https://kick.com/${enc(h)}` },
    { key: 'twitter', label: 'X', group: 'social', icon: twitterIcon, types: ALL, url: h => `https://x.com/${enc(h)}` },
    { key: 'instagram', label: 'Instagram', group: 'social', Icon: FaInstagram, types: ALL, url: h => `https://www.instagram.com/${enc(h)}` },
    // A player's Discord is a plain username, never a link: the profile shows just the logo,
    // which copies it. Hosts and venues link their server instead (see DISCORD_SERVER).
    { key: 'discord', label: 'Discord', group: 'social', icon: discordIcon, types: ALL, iconOnly: true },

    { key: 'faceit', label: 'FACEIT', group: 'competitive', icon: faceitIcon, types: ['player'], comingSoon: true },
    { key: 'battlefy', label: 'Battlefy', group: 'competitive', icon: battlefyIcon, types: ['player'], comingSoon: true },
    { key: 'cmg', label: 'CMG', group: 'competitive', icon: cmgIcon, types: ['player'], comingSoon: true },
    { key: 'gankster', label: 'Gankster', group: 'competitive', icon: ganksterIcon, types: ['player'], comingSoon: true },

    // A website is the one link that's the user's own domain, so it keeps the domain (and path).
    { key: 'website', label: 'Website', group: 'brand', Icon: FaGlobe, types: ORGS, url: h => `https://${h}` },
    { key: 'linkedin', label: 'LinkedIn', group: 'brand', icon: linkedinIcon, types: ORGS, url: h => `https://www.linkedin.com/${h.split('/').map(enc).join('/')}` },
    { key: 'tiktok', label: 'TikTok', group: 'brand', Icon: SiTiktok, types: ORGS, url: h => `https://www.tiktok.com/@${enc(h)}` },
    { key: 'facebook', label: 'Facebook', group: 'brand', Icon: FaFacebook, types: ORGS, url: h => `https://www.facebook.com/${enc(h)}` },
    { key: 'linktree', label: 'Linktree', group: 'brand', Icon: SiLinktree, types: ORGS, url: h => `https://linktr.ee/${enc(h)}` },

    { key: 'steam', label: 'Steam', group: 'game', icon: steamIcon, types: ['player'] },
    { key: 'riot', label: 'Riot', group: 'game', icon: riotIcon, types: ['player'] },
    { key: 'battlenet', label: 'Battle.net', group: 'game', icon: battlenetIcon, types: ['player'] },
    { key: 'activision', label: 'Activision', group: 'game', icon: activisionIcon, types: ['player'] },
];

// Players' socials, most used first. Platforms not listed keep their LINKED_PLATFORMS order after these.
const PLAYER_ORDER = ['twitter', 'twitch', 'discord', 'instagram', 'youtube', 'kick'];

// Hosts and venues are organisations: their socials and brand links are one "brand" list,
// led by the links an org most wants people to find.
const ORG_ORDER = ['website', 'discord', 'twitter', 'twitch', 'youtube', 'instagram', 'tiktok', 'kick', 'linkedin', 'facebook', 'linktree'];

// An org links its Discord server: only the invite code is kept, and the link is always built on
// discord.gg, like every other platform's.
const DISCORD_SERVER = { label: 'Discord server', invite: true, iconOnly: false, url: code => `https://discord.gg/${enc(code)}` };

export const platformsFor = (type) => {
    const platforms = LINKED_PLATFORMS.filter(p => p.types.includes(type));
    if (!ORGS.includes(type)) {
        const rank = (p) => (PLAYER_ORDER.includes(p.key) ? PLAYER_ORDER.indexOf(p.key) : PLAYER_ORDER.length);
        return platforms.sort((a, b) => rank(a) - rank(b));
    }
    return platforms
        .map(p => (p.group === 'social' ? { ...p, group: 'brand' } : p))
        .map(p => (p.key === 'discord' ? { ...p, ...DISCORD_SERVER } : p))
        .sort((a, b) => ORG_ORDER.indexOf(a.key) - ORG_ORDER.indexOf(b.key));
};

// Splits whatever was typed or pasted into path segments, dropping the scheme, any
// "domain.tld" in front, the query string and the #fragment.
const pathSegments = (input) => {
    const parts = input
        .replace(/^[a-z][a-z0-9+.-]*:\/\//i, '')
        .split(/[?#]/)[0]
        .split('/')
        .filter(Boolean);
    // A first segment with a dot is a domain ("x.com", "www.youtube.com"), unless it's the only
    // thing there - a handle on its own can contain dots ("jake.b" on Instagram).
    if (parts.length > 1 && parts[0].includes('.')) parts.shift();
    else if (parts.length === 1 && /^(www\.)?[a-z0-9-]+\.[a-z]{2,}$/i.test(parts[0]) && /^https?:|\//i.test(input)) parts.shift();
    return parts;
};

const cleanHandle = (value = '') => value.replace(/^@+/, '').replace(/[^\w.-]/g, '');

// What gets stored for a typed or pasted value: just the handle for that platform, with any
// domain thrown away. Game IDs are kept as typed (Riot "Name#TAG", Battle.net "Name#1234").
// Returns '' when there's no handle in it.
export function toHandle(platform, input) {
    const raw = (input ?? '').trim();
    if (!raw) return '';
    if (platform.group === 'game') return raw;

    if (platform.key === 'website') {
        const site = raw.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '').split(/[?#]/)[0].replace(/\/+$/, '');
        return /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/[^\s]*)?$/i.test(site) ? site.toLowerCase() : '';
    }

    // Discord usernames are lower case letters, numbers, "." and "_"; strip anything else.
    // Server invites: discord.gg/code, discord.com/invite/code or just the code.
    if (platform.invite) {
        const segments = pathSegments(raw).filter(s => s.toLowerCase() !== 'invite');
        return cleanHandle(segments[0]);
    }

    // A player's Discord: a pasted link (an invite, a profile URL) isn't a username, so it's rejected.
    if (platform.key === 'discord') return /[/:]/.test(raw) ? '' : raw.replace(/^@+/, '').toLowerCase().replace(/[^a-z0-9._]/g, '');

    const segments = pathSegments(raw);

    if (platform.key === 'linkedin') {
        const at = segments.findIndex(s => LINKEDIN_SECTIONS.includes(s.toLowerCase()));
        if (at >= 0 && segments[at + 1]) return `${segments[at].toLowerCase()}/${cleanHandle(segments[at + 1])}`;
        // Just a name: hosts and venues are organisations, so assume a company page.
        return segments[0] ? `company/${cleanHandle(segments[segments.length - 1])}` : '';
    }

    // YouTube and TikTok put the handle after an "@" ("youtube.com/@name/videos"); prefer that
    // segment, otherwise YouTube's older "c/name" and "user/name" pages.
    const atSegment = segments.find(s => s.startsWith('@'));
    if (atSegment) return cleanHandle(atSegment);
    if (platform.key === 'youtube' && ['c', 'user'].includes(segments[0]) && segments[1]) return cleanHandle(segments[1]);

    return cleanHandle(segments[0]);
}

// A profile's linked accounts as [{ platform, handle }] in display order. Socials and brand
// links come from `links`; game IDs from `details` (player only). Coming-soon platforms aren't
// shown yet even if a handle was saved before.
export const linkedAccounts = (profile) => platformsFor(profile.type)
    .filter(platform => !platform.comingSoon)
    .map(platform => ({
        platform,
        handle: platform.group === 'game' ? profile.details?.[platform.key] : profile.links?.[platform.key],
    }))
    .filter(({ handle }) => handle);

// The profile's `links` for a set of link inputs ({ platform key: typed value }), each reduced
// by toHandle. `links` replaces the whole set when saved, so coming-soon links saved before (which
// can't be edited) are carried over from `existing`. Game accounts aren't typed in, so they're
// never part of it (and a save leaves them alone).
export function linkChanges({ type, links: existing = {} }, values = {}) {
    const links = {};
    for (const p of platformsFor(type)) {
        if (p.group === 'game') continue;
        const value = p.comingSoon ? existing?.[p.key] : toHandle(p, values[p.key]);
        if (value) links[p.key] = value;
    }
    return links;
}

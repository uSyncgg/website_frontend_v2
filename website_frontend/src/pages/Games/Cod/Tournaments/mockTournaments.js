// ============================================================================
// MOCK DATA — DELETE THIS FILE WHEN THE SCRAPERS SEND A `title` FIELD
// ============================================================================
// The live feed (/tournaments/cod) only returns Black Ops 7 and has no game
// field at all, so every other tile in the title selector would sit empty.
// These stand-ins let the multi-title view be demoed end to end.
//
// Only Warzone, Black Ops II and Black Ops are covered — those are the titles
// with tournaments actually running alongside BO7. Counts here are loosely in
// proportion to what CheckMate Gaming had live on 2026-08-09 (BO7 60,
// Warzone 17, BO2 13, BO1 8), scaled down so the mock stays obviously a mock.
//
// The `url` on each one points at the host's game page rather than a real
// bracket — they are placeholders, not joinable tournaments.
//
// To turn the mockup off, flip USE_MOCK_TOURNAMENTS to false in
// CodTournaments.js (or delete this file and its import).

// "Aug 9" — matches the date format the scrapers send. Offsets keep the mock
// data looking live instead of going stale the day after it was written.
const dayLabel = (dayOffset) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`;
};

// Expand the readable fields into the boolean flags the filters run on, using
// the same conventions the real feed uses (note "All" platforms sets is_pc,
// not is_console — that mirrors the live data).
const mock = ({ title, site, dayOffset, time, entry, region, platforms, skill, team_size, gamemode, series, requirements = 'None', url }) => {
    const isFree = /free/i.test(entry);
    const allSkill = /^all$/i.test(skill);

    return {
        title,
        site,
        url,
        date: dayLabel(dayOffset),
        time,
        entry,
        region,
        platforms,
        requirements,
        skill,
        team_size,
        gamemode,
        series,

        is_1v1: team_size === '1v1',
        is_2v2: team_size === '2v2',
        is_3v3: team_size === '3v3',
        is_4v4: team_size === '4v4',

        is_na: region.includes('NA'),
        is_eu: region.includes('EU'),
        is_latam: region.includes('LATAM'),
        is_usa: region.includes('US'),
        is_apac: region.includes('APAC'),
        is_worldwide: /worldwide/i.test(region),

        is_pc: platforms === 'PC' || platforms === 'All',
        is_console: platforms === 'Console',
        is_all_platforms: platforms === 'All',

        is_novice: !allSkill && /nov/i.test(skill),
        is_amateur: !allSkill && /am/i.test(skill),
        is_expert: !allSkill && /exp/i.test(skill),
        is_agent: !allSkill && /agent/i.test(skill),
        is_master: !allSkill && /master/i.test(skill),
        is_challenger: !allSkill && /chal/i.test(skill),
        is_all_skill: allSkill,

        is_free: isFree,
        is_paid: !isFree,
        is_eco: isFree,
        is_elite: false
    };
};

const CMG = 'https://www.checkmategaming.com';
const CONSOLE_KINGS = 'https://consolekings.com';

// Real listing pages for each title, so the placeholder links land somewhere
// that exists rather than on a 404.
const WZ = `${CMG}/tournament/cross-platform/warzone`;
const BO2 = `${CMG}/tournament/ps5/call-of-duty-black-ops-ii`;
const BO1 = `${CMG}/tournament/ps5/call-of-duty-black-ops`;
const CK = `${CONSOLE_KINGS}/tournaments`;

export const MOCK_TOURNAMENTS = [
    // --- Warzone -----------------------------------------------------------
    mock({ title: 'warzone', site: 'cmg', dayOffset: 0, time: '12:30 PM EDT', entry: 'Free Entry', region: 'NA/EU', platforms: 'All', skill: 'All', team_size: '1v1', gamemode: 'KILL RACE', series: 'Best of 1', url: WZ }),
    mock({ title: 'warzone', site: 'consolekings', dayOffset: 0, time: '2:15 PM EDT', entry: 'Free Entry', region: 'NA/EU', platforms: 'Console', skill: 'All', team_size: '1v1', gamemode: 'RESURGENCE', series: 'Best of 1', url: CK }),
    mock({ title: 'warzone', site: 'cmg', dayOffset: 0, time: '5:00 PM EDT', entry: '10 Credits', region: 'NA/EU', platforms: 'All', skill: 'All', team_size: '3v3', gamemode: 'KILL RACE', series: 'Best of 1', url: WZ }),
    mock({ title: 'warzone', site: 'cmg', dayOffset: 0, time: '9:00 PM EDT', entry: 'Free Entry', region: 'NA', platforms: 'All', skill: 'All', team_size: '2v2', gamemode: 'RESURGENCE', series: 'Best of 1', url: WZ }),
    mock({ title: 'warzone', site: 'cmg', dayOffset: 1, time: '3:30 PM EDT', entry: '5 Credits', region: 'NA/EU', platforms: 'All', skill: 'NOV/AM', team_size: '4v4', gamemode: 'KILL RACE', series: 'Best of 1', url: WZ }),
    mock({ title: 'warzone', site: 'cmg', dayOffset: 2, time: '8:00 PM EDT', entry: '20 Credits', region: 'EU', platforms: 'All', skill: 'Challenger', team_size: '4v4', gamemode: 'KILL RACE', series: 'Best of 3', url: WZ }),

    // --- Black Ops II (retro scene) ----------------------------------------
    mock({ title: 'bo2', site: 'consolekings', dayOffset: 0, time: '11:10 AM EDT', entry: '10 Credits', region: 'NA/EU', platforms: 'Console', skill: 'All', team_size: '2v2', gamemode: 'SND', series: 'Best of 1', requirements: '3 Team Gold Cap', url: CK }),
    mock({ title: 'bo2', site: 'cmg', dayOffset: 0, time: '4:45 PM EDT', entry: '5 Credits', region: 'NA/EU', platforms: 'Console', skill: 'All', team_size: '2v2', gamemode: 'SND', series: 'Best of 1', url: BO2 }),
    mock({ title: 'bo2', site: 'cmg', dayOffset: 0, time: '8:30 PM EDT', entry: 'Free Entry', region: 'NA', platforms: 'Console', skill: 'All', team_size: '3v3', gamemode: 'SND', series: 'Best of 3', url: BO2 }),
    mock({ title: 'bo2', site: 'consolekings', dayOffset: 0, time: '10:00 PM EDT', entry: 'Free Entry', region: 'NA/EU', platforms: 'Console', skill: 'All', team_size: '4v4', gamemode: 'HARDPOINT', series: 'Best of 5', url: CK }),
    mock({ title: 'bo2', site: 'cmg', dayOffset: 2, time: '9:00 PM EDT', entry: '5 Credits', region: 'NA', platforms: 'Console', skill: 'Expert', team_size: '2v2', gamemode: 'SND', series: 'Best of 3', url: BO2 }),

    // --- Black Ops (retro scene) -------------------------------------------
    mock({ title: 'bo1', site: 'consolekings', dayOffset: 0, time: '12:40 PM EDT', entry: '10 Credits', region: 'NA/EU', platforms: 'Console', skill: 'All', team_size: '3v3', gamemode: 'SND', series: 'Best of 1', requirements: 'No Golds', url: CK }),
    mock({ title: 'bo1', site: 'cmg', dayOffset: 0, time: '6:15 PM EDT', entry: '5 Credits', region: 'NA/EU', platforms: 'Console', skill: 'All', team_size: '2v2', gamemode: 'SND', series: 'Best of 1', url: BO1 }),
    mock({ title: 'bo1', site: 'cmg', dayOffset: 0, time: '9:30 PM EDT', entry: 'Free Entry', region: 'NA', platforms: 'Console', skill: 'All', team_size: '4v4', gamemode: 'SND', series: 'Best of 3', url: BO1 }),
    mock({ title: 'bo1', site: 'cmg', dayOffset: 2, time: '10:00 PM EDT', entry: 'Free Entry', region: 'NA/EU', platforms: 'Console', skill: 'All', team_size: '3v3', gamemode: 'CTF', series: 'Best of 1', url: BO1 })
];

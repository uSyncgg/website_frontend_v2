/**
 * Single source of truth for verified organizers, shared across every
 * catalog's `heroAside` verifiedBoard.
 *
 * Each row is one organizer verified for exactly one section — a
 * VerifiedBoard row is a single link, so an organizer verified in more than
 * one section (Checkmate Gaming: wagers and head-to-head) gets one entry per
 * section it should actually be linkable from. Every path here must be
 * verified={true} on its own page, checked directly against the live host
 * page, not assumed.
 *
 * Catalogs derive their own board with `verifiedRowsFor` rather than
 * hand-copying rows, so a host verified for a section can't go missing from
 * one catalog's board while showing up on another's, and a host that isn't
 * verified for a section (e.g. a wagers host) can't leak onto a
 * leagues-only board.
 */
export const VERIFIED_ORGANIZERS = [
    { name: 'LockdownCL',       game: 'Call of Duty',      section: 'leagues', path: '/games/call-of-duty/leagues/lockdowncl-leagues' },
    { name: 'Titan Esports',    game: 'League of Legends', section: 'leagues', path: '/games/LoL/leagues/titan-leagues' },
    { name: 'Nemesis Leagues',  game: 'Rocket League',     section: 'leagues', path: '/games/RocketLeague/leagues/nemesis-leagues' },
    { name: 'College Halo',     game: 'Halo',              section: 'leagues', path: '/games/halo/leagues/ugc-halo' },
    { name: 'Checkmate Gaming', game: 'Call of Duty',      section: 'wagers',  path: '/games/call-of-duty/wagers/cmg' },
];

const SECTION_TAG_SUFFIX = {
    leagues: 'league',
    lans: 'LAN',
    tournaments: 'tournament',
    wagers: 'wagers',
    h2h: 'head-to-head',
};

/**
 * Rows for a verifiedBoard, scoped to the given section(s).
 *
 * `tagSection: false` drops the section suffix from the tag, for a catalog
 * already scoped to one section (e.g. leagues.catalog.js), where the tag is
 * just the game name.
 */
export const verifiedRowsFor = (sections, { tagSection = true } = {}) => {
    const wanted = Array.isArray(sections) ? sections : [sections];

    return VERIFIED_ORGANIZERS
        .filter(organizer => wanted.includes(organizer.section))
        .map(({ name, game, section, path }) => ({
            name,
            tag: tagSection ? `${game} ${SECTION_TAG_SUFFIX[section]}` : game,
            path,
        }));
};

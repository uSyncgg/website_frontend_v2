/**
 * Search aliases per game, keyed by the entry `slug` every catalog shares.
 *
 * Kept separate from the catalogs themselves so an abbreviation only needs
 * to be taught once — every catalog (games, leagues, lans, tournaments)
 * repeats the same slugs, and useCatalogFilter looks them up from here
 * rather than each catalog carrying its own copy.
 */
export const GAME_ALIASES = {
    'call-of-duty': ['cod'],
    'warzone': ['wz'],
    'league-of-legends': ['lol'],
    'rocket-league': ['rl'],
    'valorant': ['val', 'valo'],
    'cs2': ['cs', 'counter-strike', 'counter strike'],
};

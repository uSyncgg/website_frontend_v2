import { buildEventPath } from 'utils/eventPaths';

const SECTION_TAG_SUFFIX = {
    leagues: 'league',
    lans: 'LAN',
    tournaments: 'tournament',
    wagers: 'wagers',
    h2h: 'head-to-head',
};

// Which /events/{game}/verified response buckets feed which catalog section.
const SECTION_EVENT_BUCKETS = {
    leagues: ['league_parent_events', 'league_events'],
    wagers: ['wager_events'],
    h2h: ['xp_events'],
    lans: ['lan_events'],
};

// Rows for a verifiedBoard built from a single /events/{type}/verified/event/type
// fetch. Like /events/{game}/verified, the payload is bucketed by event kind
// (e.g. { league_events: [...] }), not a flat array. Each event's own `game`
// field is matched back to the catalog entry with that `apiGame`, to find the
// right link prefix and to build the tag; an event with no matching `game`
// (or a game not in this catalog) is skipped rather than guessed at.
export const liveVerifiedRowsForType = (payload, entries, section, { tagSection = true } = {}) => {
    if (!payload) return [];

    const buckets = SECTION_EVENT_BUCKETS[section] ?? [];

    return buckets.flatMap(bucket => payload[bucket] ?? []).flatMap(event => {
        const entry = entries.find(e => e.apiGame === event.game);
        const sectionPath = entry?.sections?.[section];
        if (!sectionPath) return [];

        return [{
            name: event.name,
            tag: tagSection ? `${event.game} ${SECTION_TAG_SUFFIX[section]}` : event.game,
            path: buildEventPath(sectionPath, event.path),
        }];
    });
};

// Rows for a verifiedBoard built from live /events/{game}/verified data
// (see useVerifiedBoardRows, which samples and caches from the full result).
export const liveVerifiedRowsFor = (sections, entries, eventsByGame) => {
    const wanted = Array.isArray(sections) ? sections : [sections];
    if (!eventsByGame) return [];

    return entries.flatMap(entry => {
        const payload = entry.apiGame && eventsByGame[entry.apiGame];
        if (!payload) return [];

        return wanted.flatMap(section => {
            const sectionPath = entry.sections?.[section];
            if (!sectionPath) return [];

            const buckets = SECTION_EVENT_BUCKETS[section] ?? [];
            return buckets
                .flatMap(bucket => payload[bucket] ?? [])
                .map(item => ({
                    name: item.name,
                    tag: `${entry.name} ${SECTION_TAG_SUFFIX[section]}`,
                    path: buildEventPath(sectionPath, item.path),
                }));
        });
    });
};

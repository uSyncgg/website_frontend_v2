import { useEffect, useMemo, useState } from 'react';
import { useAsync, useVerifiedEventsByGame } from './useEvents';
import { getVerifiedEventsByType } from 'services/events';
import { liveVerifiedRowsFor, liveVerifiedRowsForType } from 'catalog/verifiedOrganizers';

const SAMPLE_SIZE = 5;
const NO_GAMES = [];

const pickRandom = (items, count) => {
    const pool = [...items];
    const picked = [];
    while (pool.length && picked.length < count) {
        picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    }
    return picked;
};

const readCache = (storageKey) => {
    try {
        const cached = sessionStorage.getItem(storageKey);
        return cached ? JSON.parse(cached) : null;
    } catch {
        return null;
    }
};

const writeCache = (storageKey, rows) => {
    try {
        sessionStorage.setItem(storageKey, JSON.stringify(rows));
    } catch {
        // sessionStorage unavailable (private mode, quota) -- sample still renders this visit
    }
};

/**
 * A catalog's live verifiedBoard, capped to SAMPLE_SIZE and picked at random
 * from the full payload, then pinned in sessionStorage so the board doesn't
 * reshuffle -- or refetch -- on every visit to the same catalog in the same
 * tab. `sections` empty/undefined means this catalog has no live board.
 *
 * For a catalog fetching one request per game (see games.catalog.js).
 */
export const useVerifiedBoardRows = (cacheKey, sections, entries) => {
    const enabled = sections?.length > 0;
    const storageKey = `verifiedBoard:${cacheKey}`;

    const [rows, setRows] = useState(() => (enabled ? readCache(storageKey) : null));

    const games = useMemo(
        () => (!enabled || rows) ? NO_GAMES : entries.filter(e => e.apiGame).map(e => e.apiGame),
        [enabled, rows, entries]
    );
    const { data: eventsByGame } = useVerifiedEventsByGame(games);

    useEffect(() => {
        if (!enabled || rows || !eventsByGame) return;

        const sample = pickRandom(liveVerifiedRowsFor(sections, entries, eventsByGame), SAMPLE_SIZE);
        // Don't pin an empty result for the whole session -- an empty payload
        // is often transient (a field the backend hasn't added yet, a flaky
        // request), so leave `rows` unset and let the next visit retry.
        if (sample.length === 0) return;

        setRows(sample);
        writeCache(storageKey, sample);
    }, [enabled, rows, eventsByGame, sections, entries, storageKey]);

    return enabled ? (rows ?? []) : [];
};

/**
 * Same sample-and-cache behaviour as useVerifiedBoardRows, but sourced from
 * a single /events/{type}/verified/event/type fetch (a flat list spanning
 * every game) instead of one request per game. `eventType` falsy/undefined
 * means this catalog has no live board.
 *
 * For a catalog fetching by event type (see leagues.catalog.js).
 */
export const useVerifiedBoardRowsByType = (cacheKey, eventType, entries, section, { tagSection = true } = {}) => {
    const enabled = Boolean(eventType);
    const storageKey = `verifiedBoard:${cacheKey}`;

    const [rows, setRows] = useState(() => (enabled ? readCache(storageKey) : null));

    const needsFetch = enabled && !rows;
    const { data: events } = useAsync(
        () => needsFetch ? getVerifiedEventsByType({ event_type: eventType }) : Promise.resolve(null),
        [needsFetch, eventType]
    );

    useEffect(() => {
        if (!needsFetch || !events) return;

        const sample = pickRandom(liveVerifiedRowsForType(events, entries, section, { tagSection }), SAMPLE_SIZE);
        // Don't pin an empty result for the whole session -- an empty payload
        // is often transient (a field the backend hasn't added yet, a flaky
        // request), so leave `rows` unset and let the next visit retry.
        if (sample.length === 0) return;

        setRows(sample);
        writeCache(storageKey, sample);
    }, [needsFetch, events, entries, section, tagSection, storageKey]);

    return enabled ? (rows ?? []) : [];
};

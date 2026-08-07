import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

/**
 * Filter state for a catalog, persisted in the URL so a filtered view is
 * linkable and survives a refresh — the same convention CodTournaments uses.
 *
 * The chip row filters on whatever entry property `catalog.facet.field` names,
 * and the chip set is derived from the distinct values actually present. A
 * second catalog gets its own facet by naming a different field.
 *
 * Chips are multi-select and OR'd together: picking FPS and MOBA shows every
 * entry that is either. Each selection is its own repeated query param
 * (?genre=FPS&genre=MOBA), matching how CodTournaments encodes its filters.
 *
 * Absent params mean "no filter", so a bare /games renders every entry. That
 * matters for prerendering: react-snap crawls the default state, so every
 * entry's link must be in the initial HTML.
 */
export const useCatalogFilter = (catalog) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchKey = catalog.search?.param ?? 'q';
    const facetKey = catalog.facet?.param ?? 'filter';
    const facetField = catalog.facet?.field ?? 'genre';

    const query = searchParams.get(searchKey) ?? '';
    const activeFacets = useMemo(() => searchParams.getAll(facetKey), [searchParams, facetKey]);

    // Replace rather than push so filtering doesn't stack up history entries.
    const commit = useCallback((mutate) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            mutate(next);
            return next;
        }, { replace: true });
    }, [setSearchParams]);

    const setQuery = useCallback(value => commit(next => {
        const trimmed = value.trim();
        if (trimmed) {
            next.set(searchKey, trimmed);
        } else {
            next.delete(searchKey);
        }
    }), [commit, searchKey]);

    const toggleFacet = useCallback(value => commit(next => {
        const current = next.getAll(facetKey);
        const updated = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];

        next.delete(facetKey);
        updated.forEach(v => next.append(facetKey, v));
    }), [commit, facetKey]);

    const clearFacets = useCallback(() => commit(next => next.delete(facetKey)), [commit, facetKey]);

    const clear = useCallback(() => commit(next => {
        next.delete(searchKey);
        next.delete(facetKey);
    }), [commit, searchKey, facetKey]);

    const entries = useMemo(() => {
        const needle = query.trim().toLowerCase();

        return catalog.entries.filter(entry => {
            const matchesQuery = !needle || entry.name.toLowerCase().includes(needle);
            const matchesFacet = activeFacets.length === 0 || activeFacets.includes(entry[facetField]);
            return matchesQuery && matchesFacet;
        });
    }, [catalog.entries, query, activeFacets, facetField]);

    // Chip options: the distinct values present, in the order entries declare them.
    const facetOptions = useMemo(() => {
        const seen = [];
        catalog.entries.forEach(entry => {
            const value = entry[facetField];
            if (value && !seen.includes(value)) seen.push(value);
        });
        return seen;
    }, [catalog.entries, facetField]);

    // Only list a section on a card if at least one entry has it.
    const sections = useMemo(
        () => catalog.sections.filter(section =>
            catalog.entries.some(entry => Boolean(entry.sections?.[section.key]))
        ),
        [catalog.sections, catalog.entries]
    );

    const isFiltered = Boolean(query || activeFacets.length > 0);

    return {
        query, setQuery,
        activeFacets, toggleFacet, clearFacets,
        clear, entries, sections, facetOptions, isFiltered,
    };
};

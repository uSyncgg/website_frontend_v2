import { useEffect, useRef, useState } from 'react';
import styles from './CatalogFacets.module.css';

const SEARCH_DEBOUNCE_MS = 300;

/**
 * Toolbar for a catalog index: search box plus a multi-select chip row.
 *
 * Both controls are optional and config-driven, so a catalog with no `search`
 * or no `facet` simply renders fewer controls. `options` is derived from the
 * entries themselves (see useCatalogFilter), so the chips can never offer a
 * value nothing matches.
 *
 * Chips are independent toggles (aria-pressed, not radio semantics) — any
 * number can be active at once and matches are OR'd.
 *
 * The search input is debounced locally: `onQueryChange` (which updates the
 * URL and re-filters) only fires after the user pauses typing, but the input
 * itself is a local, uncontrolled-feeling value so it never lags a keystroke.
 */
export const CatalogFacets = ({
    search,
    facet,
    options = [],
    query,
    onQueryChange,
    activeFacets = [],
    onFacetToggle,
    onFacetClear,
}) => {
    const [inputValue, setInputValue] = useState(query);
    const debounceRef = useRef(null);

    // Stay in sync with external changes to `query` (e.g. a "clear filters"
    // action elsewhere) without fighting the user mid-keystroke.
    useEffect(() => {
        setInputValue(query);
    }, [query]);

    useEffect(() => () => clearTimeout(debounceRef.current), []);

    const handleChange = (value) => {
        setInputValue(value);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => onQueryChange(value), SEARCH_DEBOUNCE_MS);
    };

    const showSearch = Boolean(search);
    const showFacet = Boolean(facet) && options.length > 0;

    if (!showSearch && !showFacet) return null;

    return (
        <div className={styles.toolbar}>
            {showSearch &&
                <label className={styles.search}>
                    <span className={styles.srOnly}>{search.label}</span>
                    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M20 20l-3.5-3.5" />
                    </svg>
                    <input
                        className={styles.input}
                        type="search"
                        value={inputValue}
                        placeholder={search.placeholder}
                        onChange={e => handleChange(e.target.value)}
                    />
                </label>
            }

            {showFacet &&
                <div className={styles.chips} role="group" aria-label={facet.allLabel}>
                    <button
                        type="button"
                        className={`${styles.chip} ${activeFacets.length === 0 ? styles.chipActive : ''}`}
                        aria-pressed={activeFacets.length === 0}
                        onClick={onFacetClear}
                    >
                        {facet.allLabel}
                    </button>

                    {options.map(option => (
                        <button
                            key={option}
                            type="button"
                            className={`${styles.chip} ${activeFacets.includes(option) ? styles.chipActive : ''}`}
                            aria-pressed={activeFacets.includes(option)}
                            onClick={() => onFacetToggle(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            }
        </div>
    );
}

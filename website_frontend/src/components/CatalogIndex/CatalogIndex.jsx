import styles from './CatalogIndex.module.css';
import { CatalogHero } from 'components/CatalogHero/CatalogHero';
import { VerifiedBoard } from 'components/VerifiedBoard/VerifiedBoard';
import { HeroCta } from 'components/HeroCta/HeroCta';
import { CatalogFacets } from 'components/CatalogFacets/CatalogFacets';
import { CatalogGrid } from 'components/CatalogGrid/CatalogGrid';
import { SectionHeading } from 'components/SectionHeading/SectionHeading';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { useCatalogFilter } from 'hooks/useCatalogFilter';

/**
 * The catalog index pattern: split hero, filter toolbar, filtered grid,
 * empty state.
 *
 * Everything comes from `catalog` — see catalog/games.catalog.js for the shape.
 * A second catalog needs a new config and a page that renders this component;
 * no changes here.
 */
export const CatalogIndex = ({ catalog }) => {
    const {
        query, setQuery,
        activeFacets, toggleFacet, clearFacets,
        clear, entries, sections, facetOptions, isFiltered,
    } = useCatalogFilter(catalog);

    const count = entries.length;
    const total = catalog.entries.length;

    const aside = catalog.heroAside?.type === 'verifiedBoard' && catalog.heroAside.rows?.length > 0
        ? <VerifiedBoard label={catalog.heroAside.label} rows={catalog.heroAside.rows} />
        : catalog.heroAside?.type === 'cta'
            ? <HeroCta {...catalog.heroAside} />
            : undefined;

    return (
        <>
            <CatalogHero {...catalog.hero} aside={aside} />

            <CatalogFacets
                search={catalog.search}
                facet={catalog.facet}
                options={facetOptions}
                query={query}
                onQueryChange={setQuery}
                activeFacets={activeFacets}
                onFacetToggle={toggleFacet}
                onFacetClear={clearFacets}
            />

            <SectionHeading
                label={catalog.heading}
                aside={isFiltered ? `${count} of ${total}` : undefined}
            />

            <p className={styles.srOnly} role="status" aria-live="polite">
                {count} {count === 1 ? 'result' : 'results'}
            </p>

            {count > 0
                ? <CatalogGrid entries={entries} sections={sections} />
                : <div className={styles.emptyWrap}>
                    <EmptyState
                        title="No titles match that search"
                        body="Try different wording, or clear the filter to see everything."
                        action={
                            <button type="button" className={styles.clear} onClick={clear}>
                                Clear filters
                            </button>
                        }
                    />
                </div>
            }
        </>
    );
}

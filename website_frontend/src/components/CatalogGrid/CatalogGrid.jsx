import styles from './CatalogGrid.module.css';
import { CatalogCard } from 'components/CatalogCard/CatalogCard';

/** Four-column grid of catalog entries, collapsing to three then two. */
export const CatalogGrid = ({ entries, sections }) => {
    return (
        <div className={styles.grid}>
            {entries.map(entry => (
                <CatalogCard key={entry.slug} entry={entry} sections={sections} />
            ))}
        </div>
    );
}

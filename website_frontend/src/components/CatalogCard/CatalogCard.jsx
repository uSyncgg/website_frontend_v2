import styles from './CatalogCard.module.css';
import { Link } from 'react-router';

/**
 * One catalog entry: 3:4 cover art, the entry name, and the list of sections
 * that entry actually has, separated by an accent slash.
 *
 * The whole card is a single link to the entry's hub, matching the prototype.
 * Sections with no path are omitted rather than linked to a "coming soon"
 * page, so the list only ever advertises real destinations.
 *
 * Three nested elements, deliberately: <Link> owns the hover transform,
 * `.shell` owns the shadow, `.clip` owns the border-radius + overflow clip.
 * Putting a rounded clip on the same element as a box-shadow, under an
 * ancestor that animates, is a known way to get the browser to drop the
 * clip mask mid-repaint — each concern gets its own element so none of them
 * share a rasterization path with the others.
 *
 * `entry.cornerRadius` picks how wide that clip is (see games.catalog.js for
 * the full rationale) — 'standard' for art confirmed to render cleanly,
 * 'wide' (the default) for everything else, giving the clip more margin over
 * the image's own baked-in corner so there's nothing left for the browser to
 * expose if it drops the mask on hover. Applied to both .shell and .clip so
 * the shadow's shape always matches what's actually visible.
 */
export const CatalogCard = ({ entry, sections }) => {
    const available = sections.filter(section => Boolean(entry.sections?.[section.key]));
    const radiusClass = entry.cornerRadius === 'standard' ? styles.radiusStandard : styles.radiusWide;

    return (
        <Link to={entry.path} className={styles.card}>
            <div className={`${styles.shell} ${radiusClass}`}>
                <div className={`${styles.clip} ${radiusClass}`}>
                    <div className={styles.art}>
                        {/* Decorative: the link's accessible name comes from the visible
                            title below, so alt text here would just announce it twice. */}
                        <img
                            className={styles.image}
                            src={entry.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    <div className={styles.body}>
                        <span className={styles.name}>{entry.name}</span>

                        {available.length > 0 &&
                            <span className={styles.sections}>
                                {available.map((section, i) => (
                                    <span key={section.key}>
                                        {i > 0 && <span className={styles.sep} aria-hidden="true">/</span>}
                                        {section.label}
                                    </span>
                                ))}
                            </span>
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
}

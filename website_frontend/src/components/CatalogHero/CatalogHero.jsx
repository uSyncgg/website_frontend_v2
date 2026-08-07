import styles from './CatalogHero.module.css';

/**
 * Text hero for a catalog index: eyebrow, two-line headline with a gradient
 * accent, the slant rule, and a lede — with an optional panel alongside it.
 *
 * Type treatment matches the site's existing HeaderImage (same eyebrow colour,
 * same gradient-clipped accent, same muted lede) so this reads as the same
 * site, just laid out as a split hero rather than a centred banner.
 */
export const CatalogHero = ({ eyebrow, headline, accent, lede, aside }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.inner}>
                <div className={styles.copy}>
                    {eyebrow !== undefined && <p className={styles.eyebrow}>{eyebrow}</p>}

                    <h1 className={styles.headline}>
                        <span className={styles.white}>{headline}</span>
                        {accent !== undefined && <><br /><span className={styles.accent}>{accent}</span></>}
                    </h1>

                    <hr className={styles.slant} />

                    {lede !== undefined && <p className={styles.lede}>{lede}</p>}
                </div>

                {aside !== undefined && <div className={styles.aside}>{aside}</div>}
            </div>
        </section>
    );
}

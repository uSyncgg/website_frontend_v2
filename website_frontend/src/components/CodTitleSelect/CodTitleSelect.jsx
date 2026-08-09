import { useState } from "react";
import { FaCheck, FaLayerGroup } from "react-icons/fa";
import styles from './CodTitleSelect.module.css';
import { COD_TITLES, ALL_TITLE_ART } from './codTitles';

// One cover tile. Falls back to the generated accent panel when a title has no
// art set, or when the image fails to load.
const TitleTile = ({ title, selected, count, onToggle }) => {
    const [artFailed, setArtFailed] = useState(false);
    const showArt = title.art && !artFailed;

    return (
        <button
            type="button"
            className={`${styles.tile} ${selected ? styles.tileActive : ''} ${count === 0 ? styles.tileEmpty : ''}`}
            onClick={onToggle}
            aria-pressed={selected}
            title={`${title.label} · ${count} tournaments`}
        >
            <div className={styles.art} style={{ '--accent': title.accent }}>
                {selected && <span className={styles.check}><FaCheck /></span>}

                {showArt
                    ? <img className={styles.artImg} src={title.art} alt="" onError={() => setArtFailed(true)} />
                    : (
                        <>
                            <span className={styles.artGlow} />
                            <span className={styles.artStripes} />
                            <span className={styles.artShort}>{title.short}</span>
                            <span className={styles.artYear}>{title.year}</span>
                        </>
                    )
                }

                {/* Cover art carries its own title, so it only needs a light
                    footer shadow — the generated panel needs the full veil to
                    keep its text readable. */}
                <span className={`${styles.artVeil} ${showArt ? styles.artVeilLight : ''}`} />
            </div>

            <div className={styles.tileMeta}>
                <span className={styles.tileLabel}>{title.label}</span>
                <span className={styles.tileCount}>
                    {count > 0 ? `${count} live` : 'None today'}
                </span>
            </div>
        </button>
    );
};

// The row of Call of Duty cover tiles above the tournament list. Multi-select:
// nothing selected means "every title", same as the "All" chip in the filters.
export const CodTitleSelect = ({ titles = COD_TITLES, selectedTitles = [], counts = {}, onChange }) => {
    const [allArtFailed, setAllArtFailed] = useState(false);
    const allActive = selectedTitles.length === 0;

    const toggleTitle = (id) => {
        if (!onChange) return;
        onChange(selectedTitles.includes(id)
            ? selectedTitles.filter(selected => selected !== id)
            : [...selectedTitles, id]);
    };

    const totalCount = titles.reduce((total, title) => total + (counts[title.id] || 0), 0);

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>Choose your Call of Duty</p>
                {!allActive && (
                    <button type="button" className={styles.resetButton} onClick={() => onChange && onChange([])}>
                        Show all titles
                    </button>
                )}
            </div>

            <div className={styles.rail}>
                <button
                    type="button"
                    className={`${styles.tile} ${allActive ? styles.tileActive : ''}`}
                    onClick={() => onChange && onChange([])}
                    aria-pressed={allActive}
                >
                    <div className={`${styles.art} ${styles.artAll}`}>
                        {allActive && <span className={styles.check}><FaCheck /></span>}

                        {/* The purple gradient underneath doubles as the
                            fallback if the backdrop fails to load. */}
                        {!allArtFailed && (
                            <img className={styles.artImg} src={ALL_TITLE_ART} alt="" onError={() => setAllArtFailed(true)} />
                        )}
                        <span className={styles.artAllWash} />
                        <span className={styles.artVeil} />

                        <FaLayerGroup className={styles.allIcon} />
                        <span className={styles.artShort}>ALL</span>
                    </div>

                    <div className={styles.tileMeta}>
                        <span className={styles.tileLabel}>All Titles</span>
                        <span className={styles.tileCount}>{totalCount} live</span>
                    </div>
                </button>

                {titles.map(title => (
                    <TitleTile
                        key={title.id}
                        title={title}
                        selected={selectedTitles.includes(title.id)}
                        count={counts[title.id] || 0}
                        onToggle={() => toggleTitle(title.id)}
                    />
                ))}
            </div>
        </div>
    );
};

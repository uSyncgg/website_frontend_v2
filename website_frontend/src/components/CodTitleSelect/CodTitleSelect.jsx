import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import styles from './CodTitleSelect.module.css';
import { COD_TITLES } from './codTitles';

// One title bubble: mini cover, name, and how many are on today.
const TitleBubble = ({ title, selected, count, onToggle }) => {
    const [artFailed, setArtFailed] = useState(false);

    return (
        <button
            type="button"
            className={`${styles.bubble} ${selected ? styles.bubbleActive : ''} ${count === 0 ? styles.bubbleEmpty : ''}`}
            onClick={onToggle}
            aria-pressed={selected}
            title={`${title.label} · ${count} tournaments`}
        >
            {title.art && !artFailed
                ? <img className={styles.cover} src={title.art} alt="" onError={() => setArtFailed(true)} />
                : <span className={styles.coverFallback} style={{ '--accent': title.accent }}>{title.short.slice(0, 2)}</span>
            }

            {/* Both names ship; CSS picks one, because three-up on a phone has
                no room for "Black Ops Cold War". */}
            <span className={styles.nameFull}>{title.label}</span>
            <span className={styles.nameShort}>{title.short}</span>

            <span className={styles.count}>{count}</span>
        </button>
    );
};

// The title bubbles, sitting above the tournament list and kept deliberately
// separate from the filter panel on the left.
//
// Rounded where the filter chips are squared — the two controls do different
// jobs, and the shape is what tells them apart at a glance.
//
// Multi-select: nothing selected means "every title", same as the filters' All.
export const CodTitleSelect = ({ titles = COD_TITLES, selectedTitles = [], counts = {}, onChange }) => {
    const allActive = selectedTitles.length === 0;
    const total = titles.reduce((sum, title) => sum + (counts[title.id] || 0), 0);

    const toggleTitle = (id) => {
        if (!onChange) return;
        onChange(selectedTitles.includes(id)
            ? selectedTitles.filter(selected => selected !== id)
            : [...selectedTitles, id]);
    };

    return (
        <div className={styles.section}>
            <p className={styles.eyebrow}>Select your title</p>

            {/* Wraps rather than scrolls, and goes to a fixed three-up grid on
                phones so the row never runs off the side of the screen. */}
            <div className={styles.bubbles}>
                <button
                    type="button"
                    className={`${styles.bubble} ${allActive ? styles.bubbleActive : ''}`}
                    onClick={() => onChange && onChange([])}
                    aria-pressed={allActive}
                >
                    <span className={styles.allIcon}><FaLayerGroup /></span>
                    <span className={styles.nameFull}>All Titles</span>
                    <span className={styles.nameShort}>All</span>
                    <span className={styles.count}>{total}</span>
                </button>

                {titles.map(title => (
                    <TitleBubble
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

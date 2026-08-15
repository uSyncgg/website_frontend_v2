import styles from './CodTitleSelect.module.css';
import { COD_TITLES } from './codTitles';

// The Call of Duty title bubbles, sitting above the tournament list and kept
// deliberately separate from the filter panel on the left.
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
            <div className={styles.row}>
                <p className={styles.label}>Game</p>

                {/* Intrinsically sized and centred, never a stretched grid, so
                    three titles read as deliberate rather than half-empty. */}
                <div className={styles.bubbles}>
                    <button
                        type="button"
                        className={`${styles.bubble} ${allActive ? styles.bubbleActive : ''}`}
                        onClick={() => onChange && onChange([])}
                        aria-pressed={allActive}
                    >
                        All Call of Duty
                        <span className={styles.count}>{total}</span>
                    </button>

                    {titles.map(title => {
                        const count = counts[title.id] || 0;
                        const selected = selectedTitles.includes(title.id);

                        return (
                            <button
                                type="button"
                                key={title.id}
                                className={`${styles.bubble} ${selected ? styles.bubbleActive : ''} ${count === 0 ? styles.bubbleEmpty : ''}`}
                                onClick={() => toggleTitle(title.id)}
                                aria-pressed={selected}
                                title={`${title.label} · ${count} tournaments`}
                            >
                                {title.label}
                                <span className={styles.count}>{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

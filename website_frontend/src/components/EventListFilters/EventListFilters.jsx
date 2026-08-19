import styles from './EventListFilters.module.css';

const DEFAULT_SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'az', label: 'Name A–Z' },
    { value: 'za', label: 'Name Z–A' },
];

const ChipGroup = ({ label, options, selected, onChange }) => {
    const toggle = (option) => {
        const next = selected.includes(option)
            ? selected.filter(o => o !== option)
            : [...selected, option];
        onChange && onChange(next);
    };

    return (
        <div className={styles.filterGroup}>
            <span className={styles.groupLabel}>{label}</span>
            <div className={styles.chipRow}>
                <button
                    type="button"
                    className={`${styles.chip} ${selected.length === 0 ? styles.chipActive : ''}`}
                    onClick={() => onChange && onChange([])}
                >
                    All
                </button>
                {options.map(option => (
                    <button
                        key={option}
                        type="button"
                        className={`${styles.chip} ${selected.includes(option) ? styles.chipActive : ''}`}
                        onClick={() => toggle(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const EventListFilters = ({
    sort,
    onSortChange,
    sortOptions = DEFAULT_SORT_OPTIONS,
    regionOptions = [],
    selectedRegions = [],
    onRegionChange,
    categoryOptions = [],
    selectedCategories = [],
    onCategoryChange,
    categoryLabel = "League Type",
    verifiedOnly = false,
    onVerifiedChange,
    resultCount,
    onClear,
}) => {
    const hasActiveFilters = selectedRegions.length > 0 || selectedCategories.length > 0 || verifiedOnly;

    return (
        <div className={styles.toolbar}>
            <div className={styles.row}>
                <div className={styles.sortGroup}>
                    <label htmlFor="eventSort" className={styles.groupLabel}>Sort by</label>
                    <select
                        id="eventSort"
                        className={styles.sortSelect}
                        value={sort}
                        onChange={(e) => onSortChange && onSortChange(e.target.value)}
                    >
                        {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                {categoryOptions.length > 0 && (
                    <ChipGroup
                        label={categoryLabel}
                        options={categoryOptions}
                        selected={selectedCategories}
                        onChange={onCategoryChange}
                    />
                )}

                {regionOptions.length > 0 && (
                    <ChipGroup
                        label="Location"
                        options={regionOptions}
                        selected={selectedRegions}
                        onChange={onRegionChange}
                    />
                )}

                <div className={styles.filterGroup}>
                    <span className={styles.groupLabel}>&nbsp;</span>
                    <button
                        type="button"
                        className={`${styles.chip} ${verifiedOnly ? styles.chipActive : ''}`}
                        onClick={() => onVerifiedChange && onVerifiedChange(!verifiedOnly)}
                    >
                        Verified only
                    </button>
                </div>

                {hasActiveFilters && onClear && (
                    <button type="button" className={styles.clearButton} onClick={onClear}>
                        Clear all
                    </button>
                )}
            </div>

            {typeof resultCount === 'number' && (
                <p className={styles.resultCount}>{resultCount} result{resultCount === 1 ? '' : 's'}</p>
            )}
        </div>
    );
};

import styles from './TournamentFilterChips.module.css';

// One filter group rendered as toggle chips. "All" is active when nothing is
// selected, which means "don't filter on this group".
function TournamentFilterChips({ title, options, selectedOptions = [], onChange }) {
    const toggleOption = (option) => {
        const newSelectedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];

        if (onChange) {
            onChange(newSelectedOptions);
        }
    };

    const allActive = selectedOptions.length === 0;

    return (
        <div className={styles.filterGroup}>
            <p className={styles.groupTitle}>{title}</p>

            <div className={styles.chipRow}>
                <button
                    type="button"
                    className={`${styles.chip} ${allActive ? styles.chipActive : ''}`}
                    onClick={() => onChange && onChange([])}
                >
                    All
                </button>

                {options.map(option => (
                    <button
                        key={option}
                        type="button"
                        className={`${styles.chip} ${selectedOptions.includes(option) ? styles.chipActive : ''}`}
                        onClick={() => toggleOption(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TournamentFilterChips;

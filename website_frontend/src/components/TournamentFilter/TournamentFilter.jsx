import React from "react";
import styles from './TournamentFilter.module.css';
import TournamentFilterCheckboxes from "components/TournamentFilterCheckboxes/TournamentFilterCheckboxes";
import TournamentFilterChips from "components/TournamentFilterChips/TournamentFilterChips";

export const TournamentFilter = ({ children, onClear }) => {
    return (
        <div className={styles.filterSection}>
            <div className={styles.filterContainer}>
                <div className={styles.filterHeader}>
                    <p className={styles.filterLabel}>Filters</p>
                    {onClear && (
                        <button type="button" className={styles.clearButton} onClick={onClear}>
                            Clear all
                        </button>
                    )}
                </div>

                {children}
            </div>
        </div>
    )
}

TournamentFilter.checkbox = TournamentFilterCheckboxes;
TournamentFilter.chips = TournamentFilterChips;

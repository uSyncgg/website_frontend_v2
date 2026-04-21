import React from "react";
import styles from './TournamentFilter.module.css';
import TournamentFilterCheckboxes from "components/TournamentFilterCheckboxes/TournamentFilterCheckboxes";

export const TournamentFilter = ({ children }) => {
    return (
        <div className={styles.filterSection}>
            <h1 className="white">Filters</h1>

            <div className={styles.filterContainer}>
                {children}
            </div>
        </div>
    )
}

TournamentFilter.checkbox = TournamentFilterCheckboxes;
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from './TournamentFilter.module.css';
import TournamentFilterCheckboxes from "components/TournamentFilterCheckboxes/TournamentFilterCheckboxes";
import TournamentFilterChips from "components/TournamentFilterChips/TournamentFilterChips";

export const TournamentFilter = ({ children, onClear }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={styles.filterSection}>
            <div className={styles.filterContainer}>
                <div
                    className={styles.filterHeader}
                    onClick={() => setExpanded(prev => !prev)}
                    role="button"
                    aria-expanded={expanded}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setExpanded(prev => !prev);
                        }
                    }}
                >
                    <p className={styles.filterLabel}>Filters</p>

                    <div className={styles.headerRight}>
                        {expanded && onClear && (
                            <button
                                type="button"
                                className={styles.clearButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClear();
                                }}
                            >
                                Clear all
                            </button>
                        )}
                        <FaChevronDown className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`} />
                    </div>
                </div>

                {expanded && children}
            </div>
        </div>
    )
}

TournamentFilter.checkbox = TournamentFilterCheckboxes;
TournamentFilter.chips = TournamentFilterChips;

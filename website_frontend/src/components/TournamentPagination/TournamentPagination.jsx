import { CButton } from "@coreui/react";
import styles from './TournamentPagination.module.css';

export const TournamentPagination = ({ filteredTourneys, totalFilteredPages, cardsPerPage, currentPage, onPageChange }) => {
    const nextPage = () => onPageChange(prev => prev < Math.ceil(filteredTourneys.length / cardsPerPage) ? prev + 1 : prev);
    const prevPage = () => onPageChange(prev => prev > 1 ? prev - 1 : prev);

    return (
        <div className={styles.pagination}>
            <CButton
                onClick={prevPage} 
                disabled={currentPage === 1}
                className={`${styles.white} ${styles.paginationButton}`}
            >
                &larr; Previous
            </CButton>

            <div className={styles.white}>
                Page {currentPage} of {Math.ceil(filteredTourneys.length ? totalFilteredPages  : 1 / cardsPerPage)}
            </div>

            <CButton 
                onClick={nextPage} 
                disabled={currentPage === Math.ceil(filteredTourneys.length ? totalFilteredPages : 1 / cardsPerPage)}
                className={`${styles.white} ${styles.paginationButton}`}
            >
                Next &rarr;
            </CButton>
        </div>
    )
}

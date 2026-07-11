import styles from './TournamentPagination.module.css';

// Builds e.g. [1, '…', 4, 5, 6, '…', 10] around the current page
const getPageNumbers = (currentPage, totalPages) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push('…');
    for (let page = start; page <= end; page++) pages.push(page);
    if (end < totalPages - 1) pages.push('…');
    pages.push(totalPages);

    return pages;
};

export const TournamentPagination = ({ totalFilteredPages, currentPage, onPageChange }) => {
    const totalPages = Math.max(1, totalFilteredPages || 1);

    const nextPage = () => onPageChange(prev => (prev < totalPages ? prev + 1 : prev));
    const prevPage = () => onPageChange(prev => (prev > 1 ? prev - 1 : prev));

    return (
        <div className={styles.pagination}>
            <button
                type="button"
                className={styles.pageButton}
                onClick={prevPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                &larr;
            </button>

            {getPageNumbers(currentPage, totalPages).map((page, index) => (
                page === '…'
                    ? <span key={`ellipsis-${index}`} className={styles.ellipsis}>…</span>
                    : <button
                        key={page}
                        type="button"
                        className={`${styles.pageButton} ${page === currentPage ? styles.activePage : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
            ))}

            <button
                type="button"
                className={styles.pageButton}
                onClick={nextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                &rarr;
            </button>
        </div>
    )
}

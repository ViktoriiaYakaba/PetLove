import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.scss'; // Стилі для вашої пагінації

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleFirstPage = () => {
        if (currentPage > 1) {
            onPageChange(1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        if (currentPage < totalPages) {
            onPageChange(totalPages);
        }
    };

    const renderPageNumbers = () => {
        if (totalPages <= 1) return null; // Сховати пагінацію, якщо одна сторінка

        const visiblePages = [];
        if (currentPage > 3) {
            visiblePages.push(1);
            if (currentPage > 4) visiblePages.push('...');
        }

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            visiblePages.push(i);
        }

        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) visiblePages.push('...');
            visiblePages.push(totalPages);
        }

        return visiblePages.map((page, index) => (
            <button
                key={index}
                className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...'}
            >
                {page}
            </button>
        ));
    };

    return (
        <div className={styles.pagination}>
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
                &lt;&lt;
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                &lt;
            </button>

            {renderPageNumbers()}

            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                &gt;
            </button>
            <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                &gt;&gt;
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

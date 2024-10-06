import React from 'react';
import style from './Pagination.module.scss';
import clsx from 'clsx';
import SvgIcon from '../../icon/SvgIcon';

const Pagination = ({ setPage, page, lastPage }) => {
    const handleChangePage = (newPage) => {
        if (newPage > 0 && newPage <= lastPage) {
            setPage(newPage);
        }
    };

    if (lastPage < 2) return null;

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let start = Math.max(2, page - 1); 
        let end = Math.min(lastPage - 1, page + 1);

        if (page > 2) {
            pageNumbers.push('...');
        } else {
            pageNumbers.push(1); 
        }


        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        if (end < lastPage - 1) {
            pageNumbers.push('...');
        }
        

        return pageNumbers.map((number, index) => (
            <button
                key={index}
                className={clsx(style.pageButton, {
                    [style.active]: number === page, 
                })}
                onClick={() => handleChangePage(number)}
                disabled={number === '...'} 
            >
                {number}
            </button>
        ));
    };

    return (
        <div className={style.container}>
            <div className={style.containerComponent}>
                <button
                    onClick={() => handleChangePage(1)}
                    disabled={page === 1}
                    className={style.navigationButton}
                >
                    <div className={style.svgWrapper}>
                        <SvgIcon icon="fi-rr-angle-small-left-dopp" width="20" height="20" className={style.icon} />
                        <SvgIcon icon="fi-rr-angle-small-left-dopp" width="20" height="20" className={style.icon} />
                    </div>
                </button>

            
                <button
                    onClick={() => handleChangePage(page - 1)}
                    disabled={page === 1}
                    className={style.navigationButton}
                >
                    <SvgIcon icon="fi-rr-angle-small-left-dopp" width="20" height="20" />
                </button>

                {renderPageNumbers()}
                <button
                    onClick={() => handleChangePage(page + 1)}
                    disabled={page === lastPage}
                    className={style.navigationButton}
                >
                    <SvgIcon icon="fi-rr-angle-small-rigth-dopp" width="20" height="20"/>
                </button>

                <button
                    onClick={() => handleChangePage(lastPage)}
                    disabled={page === lastPage}
                    className={style.navigationButton}
                >
                    <div className={style.svgWrapper}>
                        <SvgIcon icon="fi-rr-angle-small-rigth-dopp" width="20" height="20" className={style.icon}  />
                        <SvgIcon icon="fi-rr-angle-small-rigth-dopp" width="20" height="20" className={style.icon}  />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Pagination;

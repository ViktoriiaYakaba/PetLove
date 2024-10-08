import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../title/Title';
import NoticesFilters from '../noticesFilters/NoticesFilters';
import style from './Notices.module.scss';
import Pagination from '../pagination/Pagination';
import { fetchAllNotices } from '../../redux/notices/operations';
import NoticesList from '../noticesList/NoticesList';
import { selectLastPage, selectErrorNotices, selectNotices, selectIsLoading } from '../../redux/notices/selectors';

const Notices = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const lastPage = useSelector(selectLastPage);
    const [searchWord, setSearchWord] = useState("");
    const noticesError = useSelector(selectErrorNotices);
    const noticesList = useSelector(selectNotices);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchAllNotices({ page, keyword: searchWord }));
    }, [dispatch, searchWord, page]);

    useEffect(() => {
        setPage(1);
    }, [searchWord]);

    if (isLoading) return <div>Loading...</div>;
    if (noticesError) return <div>Error fetching notices: {noticesError}</div>;

    return (
        <div className={style.container}>
            <div className={style.containerTitle}>
                <Title />
            </div>
            <div className={style.containerFilters}>
                <NoticesFilters setSearchWord={setSearchWord} />
            </div>
            <div>
                <NoticesList notices={noticesList} />
            </div>
            <div>
                <Pagination setPage={setPage} page={page} lastPage={lastPage} />
            </div>
        </div>
    );
};

export default Notices;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Title from '../title/Title';
import SearchField from '../searchField/SearchField';
import NewsList from '../newsList/NewsList';
import Pagination from '../pagination/Pagination';
import { selectNews, selectIsErrorNews, selectIsLoadingNews, selectIsLastPage } from '../../redux/news/selectors';
import style from './News.module.scss';
import { fetchNews } from '../../redux/news/operations';

const News = () => {
    const [page, setPage] = useState(1);
    const [searchWord, setSearchWord] = useState("");
    const lastPage = useSelector(selectIsLastPage);
    const isLoadingNews = useSelector(selectIsLoadingNews);
    const newsError = useSelector(selectIsErrorNews);
    const newsList = useSelector(selectNews);
    const dispatch = useDispatch();
    
    useEffect(() => {
    setPage(1)
  }, [searchWord, setPage]);
    useEffect(() => {
      if(!newsError) dispatch(fetchNews({page,keyword:searchWord}))
    }, [dispatch, searchWord, page, newsError]);
    
     if(isLoadingNews) return <div>Loading...</div>


    return (
        <div className={style.container}>
            <div className={style.containerTitle}>
                <Title />
                <SearchField   setSearchWord={setSearchWord} />
            </div>
            <div className={style.containerList}>
                <NewsList newsList={newsList} />
            </div>
            <Pagination  setPage={setPage} page={page} lastPage={lastPage}/>
        </div>
    );
}

export default News;


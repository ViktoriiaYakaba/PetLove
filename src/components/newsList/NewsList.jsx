import React, { useEffect } from 'react';
import NewsItem from '../newsItem/NewsItem';
import style from './NewsList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../redux/news/operations';

const NewsList = ({ currentPage }) => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news.news); 
    const isLoading = useSelector((state) => state.news.isLoading); 
    const error = useSelector((state) => state.news.error); 

    useEffect(() => {
        dispatch(fetchNews({ page: currentPage })); // Передайте номер сторінки
    }, [dispatch, currentPage]); // Додайте currentPage до залежностей

    console.log("Current news state:", news); 

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>; 

    return (
        <div className={style.newsList}>
            {news.length === 0 ? (
                <div>No news available</div>
            ) : (
                news.map((item) => (
                    <NewsItem key={item.id} {...item} /> 
                ))
            )}
        </div>
    );
};

export default NewsList;

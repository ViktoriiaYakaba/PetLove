import React, from 'react';
import NewsItem from '../newsItem/NewsItem';
import style from './NewsList.module.scss';


const NewsList = ({newsList}) => {
   
    return (
        <ul className={style.newsList}>
            {newsList.length > 0 &&
        newsList.map((newsItem) => (
          <li key={newsItem._id}>
            <NewsItem data={newsItem} />
          </li>
        ))}
        </ul>
    );
};

export default NewsList;

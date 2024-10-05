import React from 'react';
import style from './NewsItem.module.scss';

const NewsItem = ({ imgUrl, alt, title, text, date, url }) => {
 const formatDate = (dateString) => {
        const dateObj = new Date(dateString); 
        const day = String(dateObj.getDate()).padStart(2, '0'); 
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
        const year = dateObj.getFullYear(); 

        return `${day}/${month}/${year}`; 
    };

  return (
      <div className={style.container}>
          <div className={style.containerImg}>
              <img src={imgUrl} alt={alt} className={style.img} />
          </div>
          <div className={style.containerContent}>
              <h3 className={style.title}>{title}</h3>
              <p className={style.text}>{text}</p>  
          </div>
          <div className={style.containerInform}>
              <p className={style.data}>{formatDate(date)}</p>
              <p className={style.link}>
    <a href={url} target="_blank" rel="noopener noreferrer" className={style.hiddenLink}>
        {url}
    </a>
    Learn More
</p>

          </div>
    </div>
  );
};

export default NewsItem;

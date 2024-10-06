import React from 'react';
import style from './NewsItem.module.scss';

const NewsItem = ({ data}) => {
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
              <img src={data.imgUrl} alt={data.alt} className={style.img} />
          </div>
          <div className={style.containerContent}>
              <h3 className={style.title}>{data.title}</h3>
              <p className={style.text}>{data.text}</p>  
          </div>
          <div className={style.containerInform}>
              <p className={style.data}>{formatDate(data.date)}</p>
              <p className={style.link}>
    <a href={data.url} target="_blank" rel="noopener noreferrer" className={style.hiddenLink}>
        {data.url}
    </a>
    Learn More
</p>

          </div>
    </div>
  );
};

export default NewsItem;

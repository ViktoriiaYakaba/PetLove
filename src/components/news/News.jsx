import React from 'react';
import Title from '../title/Title';
import style from './News.module.scss';

const News = () => {
  return (
    <div className={style.container}>
    <div className={style.containerTitle}>
       <Title/>       
    </div>
    </div>
  )
}

export default News;

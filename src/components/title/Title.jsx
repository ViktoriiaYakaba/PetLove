import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './Title.module.scss';

const Title = () => {
  const location = useLocation(); 
  let title = ''; 

 
  switch (location.pathname) {
    case '/news':
      title = 'News';
      break;
    case '/notices':
      title = 'Find your favorite pet'; 
      break;
    case '/friends':
      title = 'Our friends'; 
      break;
    default:
      title = 'Welcome'; 
  }

  return (
    <h2 className={style.title}>{title}</h2> 
  );
}

export default Title;

import React, { useEffect, useState } from 'react';
import style from './LoaderPercent.module.scss';

const LoaderPercent = () => {
  const [loadingPercent, setLoadingPercent] = useState(0);

  useEffect(() => {
    let start = null;
    const duration = 2000;
    
    const animateLoader = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min((progress / duration) * 100, 100); 
      setLoadingPercent(percent);
      if (percent < 100) {
        requestAnimationFrame(animateLoader); 
      }
    };

    requestAnimationFrame(animateLoader); 

    return () => setLoadingPercent(0); 
  }, []);

  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}>
        <div className={style.loaderFill} style={{ transform: `rotate(${(loadingPercent / 100) * 360}deg)` }} />
        <div className={style.loaderText}>{Math.floor(loadingPercent)}%</div>
      </div>
    </div>
  );
};

export default LoaderPercent;

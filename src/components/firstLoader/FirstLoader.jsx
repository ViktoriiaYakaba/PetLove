import React, { useEffect, useState } from 'react';
import style from './FirstLoader.module.scss';
import Logo from '../logo/Logo'; 
import LoaderPercent from '../loaderPercent/LoaderPercent'; 

import bgImgDesktop from '../../assets/images/loading-dog-desktop.jpg';
import bgImgDesktop2x from '../../assets/images/loading-dog-descktop-2x.jpg';
import bgImgTablet from '../../assets/images/loading-dog-tablet.jpg';
import bgImgTablet2x from '../../assets/images/loading-dog-tablet-2x.jpg';
import bgImgMobile from '../../assets/images/loading-dog-mobile.jpg';
import bgImgMobile2x from '../../assets/images/loading-dog-mobile-2x.jpg';

const getBackgroundImage = () => {
  if (window.matchMedia('(min-width: 1280px)').matches) {
    return window.devicePixelRatio > 1 ? bgImgDesktop2x : bgImgDesktop;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    return window.devicePixelRatio > 1 ? bgImgTablet2x : bgImgTablet;
  } else {
    return window.devicePixelRatio > 1 ? bgImgMobile2x : bgImgMobile;
  }
};

const FirstLoader = () => {
  const [bgImage, setBgImage] = useState(getBackgroundImage());
  const [showLogo, setShowLogo] = useState(true); 
  const [showLoader, setShowLoader] = useState(false); 
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const updateBackgroundImage = () => {
      setBgImage(getBackgroundImage());
    };

    window.addEventListener('resize', updateBackgroundImage);
    return () => {
      window.removeEventListener('resize', updateBackgroundImage);
    };
  }, []);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
      setShowLoader(true); 
    }, 1000); 

    const completeTimer = setTimeout(() => {
      setShowLoader(false); 
      setLoadingComplete(true); 
    }, 3000); 

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  if (loadingComplete) {
    return null; 
  }

  return (
    <div className={style.container}>
      <div className={style.backgroundImage} style={{ backgroundImage: `url(${bgImage})` }}>
        {showLogo && <Logo />} 
        {showLoader && <LoaderPercent />} 
      </div>
    </div>
  );
};

export default FirstLoader;


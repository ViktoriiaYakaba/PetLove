import React, { useEffect, useState } from 'react';
import SvgIcon from '../../icon/SvgIcon';
import style from './Logo.module.scss';

const Logo = () => {
  const [icon, setIcon] = useState('heard-mobile'); 
  const [iconSize, setIconSize] = useState(44);

  useEffect(() => {
    const updateIcon = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      
      if (isDesktop) {
        setIcon('heart-desktop');
        setIconSize(82); 
      } else if (isTablet) {
        setIcon('heart-desktop'); 
        setIconSize(66); 
      } else {
        setIcon('heard-mobile');
        setIconSize(44); 
      }
    };

    updateIcon(); 
    window.addEventListener('resize', updateIcon);
    return () => {
      window.removeEventListener('resize', updateIcon);
    };
  }, []);

  return (
    <h2 className={style.text}>
      <span>petl</span>
      <SvgIcon width={iconSize} height={iconSize} icon={icon} className={style.icon} />
      <span>ve</span>
    </h2>
  );
};

export default Logo;

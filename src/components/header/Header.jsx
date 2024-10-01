import React, { useState, useEffect } from 'react';
import style from './Header.module.scss';
import { IoMenuSharp } from "react-icons/io5";
import SvgIcon from '../../icon/SvgIcon';
import { NavLink } from 'react-router-dom';
import ModalMenu from './ModalMenu';

const Header = () => {
  const [icon, setIcon] = useState('heard-mobile');
  const [iconSize, setIconSize] = useState(44);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    const updateIcon = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;

      if (isDesktop || isTablet) {
        setIcon('heart-desktop');
        setIconSize(23);
      } else {
        setIcon('heard-mobile');
        setIconSize(17);
      }
    };

    updateIcon();
    window.addEventListener('resize', updateIcon);
    return () => {
      window.removeEventListener('resize', updateIcon);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className={style.container}>
      <NavLink to="/" className={style.containerLogo}>
        <p className={style.text}>
          <span>petl</span>
          <SvgIcon width={iconSize} height={iconSize} icon={icon} className={style.icon} />
          <span>ve</span>
        </p>
      </NavLink>

      <button type='button' className={style.burgherBtn} onClick={toggleMenu}>
        <IoMenuSharp size={32} />
      </button>
      <ModalMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} icon={icon} />
    </div>
  );
};

export default Header;

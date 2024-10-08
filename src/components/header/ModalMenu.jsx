import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SvgIcon from '../../icon/SvgIcon';
import style from './ModalMenu.module.scss';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(style.listItem, { [style.active]: isActive }); 
};

const ModalMenu = ({ isMenuOpen, toggleMenu, isAuth, onLogoutClick }) => {
  const location = useLocation();
  const isHome = location.pathname === "/"; 

  const containerMobileClass = clsx(style.conteinerModalMobile, { 
    [style.white]: isHome 
  });

  return (
    <div className={`${style.containerModal} ${isMenuOpen ? style.show : ''}`}>
      <div className={containerMobileClass}>
        <button className={style.btnEsk} type='button' onClick={toggleMenu}>
          
          {isHome ? (
            <SvgIcon width='32' height='32' icon='x' className={style.icon} />
          ) : (
            <SvgIcon width='32' height='32' icon='esc-white' className={style.icon} />
          )}
        </button>
        
        <div className={style.wraper}>
          <nav className={style.navMenu}>
            <ul>
              <li>
                <NavLink to='/news' className={buildLinkClass} onClick={toggleMenu}>
                  News
                </NavLink>
              </li>
              <li>
                <NavLink to='/notices' className={buildLinkClass} onClick={toggleMenu}>
                  Find pet
                </NavLink>
              </li>
              <li>
                <NavLink to='/friends' className={buildLinkClass} onClick={toggleMenu}>
                  Our friends
                </NavLink>
              </li>
            </ul>
          </nav>
  
          <ul className={style.listMobile}>
            {!isAuth ? (
              <>
                <li className={style.listItemMobile}>
                  <NavLink to='/login' className={clsx(style.buttonMobileLogIn, { [style.blackText]: isHome })} onClick={toggleMenu}>
                    LOG IN
                  </NavLink>
                </li>
                <li className={style.listItemMobileRegister}>
                  <NavLink to='/register' className={clsx(style.buttonMobile, { [style.blackText]: isHome })} onClick={toggleMenu}>
                    REGISTRATION
                  </NavLink>
                </li>
              </>
            ) : (
              <li className={style.listItemMobileRegister}>
                <button className={clsx(style.buttonMobile, { [style.blackText]: isHome })} onClick={onLogoutClick}>
                  LOG OUT
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ModalMenu;

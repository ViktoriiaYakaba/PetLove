import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcon from '../../icon/SvgIcon';
import style from './ModalMenu.module.scss';
import clsx from 'clsx';


const buildLinkClass = ({ isActive }) => {
  return clsx(style.listItem, { [style.active]: isActive }); 
};

const ModalMenu = ({ isMenuOpen, toggleMenu, isAuth }) => {
  return (
    <div className={`${style.containerModal} ${isMenuOpen ? style.show : ''}`}>
      <div className={style.conteinerModalMobile}>
        <button className={style.btnEsk} type='button' onClick={toggleMenu}>
          <SvgIcon width='32' height='32' icon='x' className={style.icon} />
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
                <NavLink to='/find-pet' className={buildLinkClass} onClick={toggleMenu}>
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
                  <NavLink to='/login' className={style.buttonMobileLogIn} onClick={toggleMenu}>
                    LOG IN
                  </NavLink>
                </li>
                <li className={style.listItemMobileRegister}>
                  <NavLink to='/register' className={style.buttonMobile} onClick={toggleMenu}>
                    REGISTRATION
                  </NavLink>
                </li>
              </>
            ) : (
              <li className={style.listItemMobileRegister}>
                <NavLink to='/logout' className={style.buttonMobile} onClick={toggleMenu}>
                  LOG OUT
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ModalMenu;


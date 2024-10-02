import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcon from '../../icon/SvgIcon';
import style from './ModalMenu.module.scss';

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
                <NavLink to='/news' onClick={toggleMenu}>
                  News
                </NavLink>
              </li>
              <li>
                <NavLink to='/find-pet' onClick={toggleMenu}>
                  Find pet
                </NavLink>
              </li>
              <li>
                <NavLink to='/friends' onClick={toggleMenu}>
                  Our friends
                </NavLink>
              </li>
            </ul>
          </nav>
  
          <ul className={style.listMobile}>
            {!isAuth ? (
              <>
                <li className={style.listItemMobile}>
                  <button className={style.buttonMobileLogIn} type='button'>
                    <NavLink to='/login' onClick={toggleMenu}>LOG IN</NavLink>
                  </button>
                </li>
                <li className={style.listItemMobileRegister}>
                  <button className={style.buttonMobile} type='button'>
                    <NavLink to='/register' onClick={toggleMenu}>REGISTRATION</NavLink>
                  </button>
                </li>
              </>
            ) : (
              <li className={style.listItemMobileRegister}>
                <button className={style.buttonMobile} type='button'>
                  <NavLink to='/logout' onClick={toggleMenu}>LOG OUT</NavLink>
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

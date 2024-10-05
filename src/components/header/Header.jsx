import React, { useState, useEffect } from 'react';
import style from './Header.module.scss'; 
import { IoMenuSharp } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import SvgIcon from '../../icon/SvgIcon';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; 
import ModalMenu from './ModalMenu';
import ModalAproveAction from '../modalAproveAction/ModalAproveAction';
import { logoutUser } from '../../redux/auth/operation';
import Navigation from '../nav/Navigation';
import clsx from 'clsx';

const Header = () => {
  const [icon, setIcon] = useState('heard-mobile'); 
  const [iconSize, setIconSize] = useState(44); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const location = useLocation(); 
  const isHome = location.pathname === "/"; 

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.user?.name || '');

  useEffect(() => {
    const updateIcon = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      
      if (isHome) { 
        setIcon(isDesktop ? 'heard-home-desk' : 'heard-home'); 
      } else {
        setIcon(isDesktop ? 'heart-desktop' : 'heard-mobile'); 
      }
      setIconSize(isDesktop ? 23 : 17); 
    };

    updateIcon(); 
    window.addEventListener('resize', updateIcon);
    return () => {
      window.removeEventListener('resize', updateIcon); 
    };
  }, [isHome]);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); 
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true); 
  };

  const handleConfirmLogout = () => {
    dispatch(logoutUser()); 
    setIsModalOpen(false); 
    setIsMenuOpen(false); 
    navigate('/');
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className={clsx(style.container, { [style.white]: isHome })}> 
      <NavLink to="/" className={style.containerLogo}>
        <p className={style.text}>
          <span>petl</span>
          <SvgIcon width={iconSize} height={iconSize} icon={icon} className={style.icon} />
          <span>ve</span>
        </p>
      </NavLink>

      <Navigation />

      <div className={style.wrapper}>
        <ul className={style.listButton}>
          {!isAuth ? (
            <>
              <li className={style.listButtonItem}>
                <button className={style.buttonLogIn} type='button'>
                  <NavLink to='/login' onClick={toggleMenu}>LOG IN</NavLink>
                </button>
              </li>
              <li className={style.listItemRegister}>
                <button className={style.button} type='button'>
                  <NavLink to='/register' onClick={toggleMenu}>REGISTRATION</NavLink>
                </button>
              </li>
            </>
          ) : (
              <li className={style.buttonLogIn}>
                <button className={style.button} type='button' onClick={handleLogoutClick}>
                  LOG OUT
                </button>
              </li>
          )}
        </ul>
        {isAuth && (
          <div className={style.containerUser}>
            <div className={style.iconWrapper}>  
              <SvgIcon width="24" height="24" icon="user" className={style.icon} />
            </div>
            <p className={style.name}>{userName}</p>
          </div>
        )}

        <button type='button' className={style.burgherBtn} onClick={toggleMenu}>
          <IoMenuSharp size={32} />
        </button>

        
       
      </div>
         {isHome && (
          <div className={style.containerTitle}>
            <h1 className={style.title}>Take good <span>care</span> of your small pets</h1>
            <p className={style.description}>
              Choosing a pet for your home is a choice that is meant to enrich your life with immeasurable joy and tenderness.
            </p>
          </div>
        )}

      <ModalMenu 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        isAuth={isAuth} 
        onLogoutClick={handleLogoutClick} 
      />

      {isModalOpen && (
        <ModalAproveAction 
          onConfirm={handleConfirmLogout} 
          onCancel={handleCancelLogout} 
        />
      )}
    </div>
  );
};

export default Header;

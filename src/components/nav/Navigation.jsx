import React from 'react';
import { NavLink} from 'react-router-dom'; 
import style from './Navigation.module.scss';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(style.listItem, { [style.active]: isActive });
};

const Navigation = () => {
    const isHome = location.pathname === "/"; 

  return (
    <nav className={clsx(style.nav, { [style.white]: isHome })}>
        <ul className={style.list}>
          <li>
            <NavLink to='/news' className={buildLinkClass}>
              News
            </NavLink>
          </li>
          <li>
            <NavLink to='/find-pet' className={buildLinkClass}>
              Find pet
            </NavLink>
          </li>
          <li>
            <NavLink to='/friends' className={buildLinkClass}>
              Our friends
            </NavLink>
          </li>
        </ul>
      </nav>
  )
}

export default Navigation;

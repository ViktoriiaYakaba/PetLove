import React from 'react';
import Header from '../header/Header';
import { Suspense, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FirstLoader from '../firstLoader/FirstLoader';
import style from './Layout.module.scss';

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showFirstScreen, setShowFirstScreen] = useState(location?.pathname === "/" ? true : false);
  
  useEffect(() => {
    setTimeout(() => setShowFirstScreen(false), 6000);
  }, []);


  return (
    <>
      {showFirstScreen && <FirstLoader />}
      <div className={style.container}>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      </div>
    </>
  );
};

export default Layout;

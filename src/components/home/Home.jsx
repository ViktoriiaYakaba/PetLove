import React from 'react';
import style from './Home.module.scss';
import imgMob from '../../assets/images/home-mobile.jpg';
import imgTab from '../../assets/images/home-tab.jpg';
import imgDesk from '../../assets/images/home-desk.jpg';

const Home = () => {
    return (
            <div className={style.containerWrapper}>
            <picture>
            <source media="(min-width: 1280px)" srcSet={imgDesk} />
            <source media="(min-width: 768px)" srcSet={imgTab} />
            <img src={imgMob} alt="dog" className={style.img} />
          </picture>
</div>
    
    );
};

export default Home;

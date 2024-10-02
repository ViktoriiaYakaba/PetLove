import React from 'react';
import sprite from '../assets/svg/sprite.svg';

const SvgIcon = ({ width, height, icon, className }) => {
    return (
        <svg width={width} height={height} className={className}>
            <use href={`${sprite}#${icon}`}></use>
        </svg>
    );
};

export default SvgIcon;

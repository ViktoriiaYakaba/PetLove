import React from 'react';
import style from './FriendsItem.module.scss';

const FriendsItem = ({ friend }) => {
    const firstOpenDay = friend.workDays?.find(day => day.isOpen);

    return (
        <div className={style.container}>
            <div className={style.containerImg}>
                {friend.imageUrl ? (
                    <img 
                        src={friend.imageUrl} 
                        alt={`Image of ${friend.title}`}
                        className={style.img}
                    />
                ) : (
                    <p>No Image Available</p>
                )}
            </div>
            <div className={style.ContainerContent}>
                <div className={style.workFromTo}>
                    {firstOpenDay ? (
                        <p className={style.day}>
                            {firstOpenDay.from} - {firstOpenDay.to}
                        </p>
                    ) : (
                        <p className={style.day}>Day and night</p>
                    )} 
                </div>
                <h3 className={style.title}>{friend.title}</h3>
               
                <ul className={style.list}>
                    {friend.email ? (
                        <li className={style.listItem}>
                            <span>Email: </span> {friend.email}
                        </li>
                    ) : (
                        <li className={style.listItem}>
                            <span>Email: </span> website only
                        </li>
                    )}
                    {friend.address && friend.addressUrl ? (
                        <li className={style.listItem}>
                            <span>Address: </span>
                            <a
                                href={friend.addressUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={style.addressLink}
                            >
                                {friend.address}
                            </a>
                        </li>
                    ) : (
                        <li className={style.listItem}>
                            <span>Address: </span> website only
                        </li>
                    )}
                    {friend.phone ? (
                        <li className={style.listItem}>
                            <span>Phone: </span> {friend.phone}
                        </li>
                    ) : (
                        <li className={style.listItem}>
                            <span>Phone: </span> website only
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default FriendsItem;

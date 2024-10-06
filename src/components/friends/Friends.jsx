import React from 'react';
import Title from '../title/Title';
import FriendsList from '../friendsList/FriendsList';
import style from './Friends.module.scss';

const Friends = () => {
  return (
    <div className={style.container}>
          <div className={style.containerTitle}>
              <Title/>
      </div>
      <div className={style.containerContent}>
      <FriendsList />
      </div>
    </div>
  )
}

export default Friends

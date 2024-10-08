import React from 'react';
import NoticesItem from '../noticesItem/NoticesItem';
import style from './NoticesList.module.scss';

const NoticesList = ({ notices }) => {
  if (!notices || notices.length === 0) {
    return <p>No notices available.</p>;  
  }

  return (
    <ul className={style.noticesList}>
      {notices.map((notice) => (
        <NoticesItem key={notice._id} notice={notice} />
      ))}
    </ul>
  );
}

export default NoticesList;

import React, { useEffect } from 'react';
import SvgIcon from '../../icon/SvgIcon';
import style from './ModalNotice.module.scss';

const ModalNotice = ({ notice, onClose }) => {
 
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(); 
    }
  };

  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

   
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  
  const popularity = Math.min(notice.popularity, 5); 
  const stars = Array.from({ length: 5 }, (_, index) => (
    index < popularity ? 'normal' : 'gray'
  ));

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.closeIcon} onClick={onClose}>
          <SvgIcon width='32' height='32' icon='x' className={style.icon} />
        </div>
        <div className={style.containerImg}>
          <img src={notice.imgURL} alt="animal photo" className={style.img} />
          <div className={style.badge}>{notice.category}</div>
        </div>   
        <div className={style.name}>
          <h4 className={style.title}>{notice.title}</h4>
          <p className={style.rating}>
            {stars.map((star, index) => (
              <SvgIcon 
                key={index} 
                icon={star === 'normal' ? "star" : "star-gray"} 
                width="20" 
                height="20" 
              />
            ))}
            <span className={style.popularityNumber}>{notice.popularity}</span>
          </p>
        </div>
        <div className={style.containerInformation}>
          <ul className={style.list}>
            <li className={style.listItem}>
              <p className={style.textList}><span>Name</span>{notice.name}</p>
            </li>
            <li className={style.listItem}>
              <p className={style.textList}><span>Birthday</span>{ notice.birthday || "Unknown"}</p>
            </li>
            <li className={style.listItem}>
              <p className={style.textList}><span>Sex</span>{notice.sex}</p>
            </li>
            <li className={style.listItem}>
              <p className={style.textList}><span>Species</span>{notice.species}</p>
            </li>
          </ul>
          <p className={style.comment}>{notice.comment}</p>
        </div>
        <div className={style.containerBtn}>
            <button type='button' className={style.btnFavorite}>
              Add to 
              <SvgIcon icon="heart-btn" width="18" height="18" />
            </button>
            <button type='button' className={style.contact}>Contact</button>
        </div>
      </div>
    </div>
  );
};

export default ModalNotice;

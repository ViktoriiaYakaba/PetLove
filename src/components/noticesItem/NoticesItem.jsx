import React, {useState} from 'react';
import style from './NoticesItem.module.scss';
import SvgIcon from '../../icon/SvgIcon';
import ModalNotice from '../modalNotice/ModalNotice';

const NoticesItem = ({ notice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={style.container}>
      <div className={style.containerImg}>
        <img src={notice.imgURL} alt='immage animal' className={style.img} />
      </div>
      <div className={style.containerTitle}>
        <h4 className={style.title}>{notice.title}</h4>
        <p className={style.rating}><SvgIcon icon="star" width="20" height="20" />{notice.popularity}</p>
      </div>
      <div className={style.containerInformation}>
        <ul className={style.list}>
          <li className={style.listItem}>
            <p className={style.textList} ><span>Name</span>{notice.name }</p>
          </li>
          <li className={style.listItem}>
            <p className={style.textList} ><span>Birthday</span>{ notice.birthday || "Unknown"}</p>
          </li >
          <li className={style.listItem}>
            <p className={style.textList} ><span>Sex</span>{notice.sex }</p>
          </li>
          <li className={style.listItem}>
            <p className={style.textList} ><span>Species</span>{notice.species }</p>
          </li>
          <li className={style.listItem}>
            <p className={style.textList} ><span>Category</span>{ notice.category}</p>
          </li>
        </ul>
        <p className={style.comment}>{notice.comment}</p>
      </div>
      <div className={style.containerButton}>
        <button className={style.btnLearn} type='button' onClick={toggleModal}>
          LearnMore
        </button>
        <button className={style.btnHeard} type='button'>
          <SvgIcon icon="heart" width="18" height="18" />
        </button>
      </div>
      {isModalOpen && (
        <ModalNotice notice={notice} onClose={toggleModal} />
      )}
    </div>
  )
}

export default NoticesItem;

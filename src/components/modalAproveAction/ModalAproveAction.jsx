import React from 'react';
import style from './ModalAproveAction.module.scss';
import SvgIcon from '../../icon/SvgIcon'; 
import cat from '../../assets/images/cat.png';

const ModalAproveAction = ({ onConfirm, onCancel }) => {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <div className={style.closeIcon}>
          <SvgIcon width='32' height='32' icon='x' className={style.icon} onClick={onCancel} />
        </div>
        <div className={style.modalHeader}>
          <div className={style.imageWrapper}>
            <img src={cat} alt="cat" className={style.img} />
          </div>
          <h2 className={style.modalTitle}>Already leaving?</h2>
        </div>
        <div className={style.modalActions}>
          <button className={style.confirmButton} onClick={onConfirm}>
            Yes
          </button>
          <button className={style.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAproveAction;

import React, { useState } from 'react';
import SvgIcon from '../../icon/SvgIcon';
import style from './EditUserBtn.module.scss';
import ModalEditUser from '../modalEdituser/ModalEditUser';

const EditUserBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button type='button' className={style.btn} onClick={toggleModal}>
        <SvgIcon width='18' height='18' icon='pen' className={style.icon} />
      </button>
      {isModalOpen && <ModalEditUser onClose={toggleModal} />}
    </>
  );
};

export default EditUserBtn;

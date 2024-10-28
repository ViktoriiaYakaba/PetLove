import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import style from './ModalWditUser.module.scss';
import SvgIcon from '../../icon/SvgIcon';
import { validationSchemaUpdate } from '../../helpers/validation';
import { editUserInfo, getAllUserInfo } from '../../redux/auth/operation';

const ModalEditUser = ({ onClose }) => {
  const dispatch = useDispatch();
  
  // Ottenere l'oggetto user e lo stato di caricamento
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Chiedi le informazioni solo se l'utente è loggato e user è undefined
    if (isLoggedIn && !user) {
      dispatch(getAllUserInfo());
    }
  }, [dispatch, isLoggedIn, user]);

  useEffect(() => {
    // Aggiorna preview solo se l'avatar è disponibile
    if (user && user.avatar) {
      setPreview(user.avatar);
    }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (values) => {
    dispatch(editUserInfo(values)).then(() => {
      onClose(); 
    });
  };

  // Controllo di caricamento
  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <div className={style.closeIcon}>
          <SvgIcon width="32" height="32" icon="x" className={style.icon} onClick={onClose} />
        </div>

        <h2 className={style.title}>Edit Information</h2>

        <div className={style.avatarPreview}>
          {preview ? (
            <img src={preview} alt="Avatar preview" className={style.previewImage} />
          ) : (
            <div className={style.placeholderIcon}>
              <SvgIcon width="32" height="32" icon="upload" />
            </div>
          )}
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            name: user.name || '',
            email: user.email || '',
            avatar: user.avatar || '',
            phone: user.phone || '',
          }}
          validationSchema={validationSchemaUpdate}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className={style.form}>
              <div className={style.inputWrapper}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(event) => {
                    handleImageChange(event);
                    setFieldValue('avatar', event.target.files[0]);
                  }}
                  style={{ display: 'none' }}
                />
                <div className={style.button}>
                  <button type="button" onClick={handleUploadButtonClick} className={style.uploadBtn}>
                    Upload Photo
                    <SvgIcon width="18" height="18" icon="upload-cloud" />
                  </button>
                </div>
              </div>

              <div className={style.formGroup}>
                <Field type="text" name="name" className={style.input} placeholder="Name" />
                <ErrorMessage name="name" component="div" className={style.error} />
              </div>

              <div className={style.formGroup}>
                <Field type="email" name="email" className={style.input} placeholder="Email" />
                <ErrorMessage name="email" component="div" className={style.error} />
              </div>

              <div className={style.formGroup}>
                <Field type="text" name="phone" className={style.input} placeholder="Phone number" />
                <ErrorMessage name="phone" component="div" className={style.error} />
              </div>

              <button type="submit" disabled={isSubmitting} className={style.submitButton}>
                Go to Profile
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModalEditUser;

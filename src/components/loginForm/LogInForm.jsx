import React from 'react';
import style from './LogInForm.module.scss';
import SvgIcon from '../../icon/SvgIcon';
import { Formik, Form, Field } from 'formik';
import dog from '../../assets/images/dog-login-mobile.png';
import dogDesk from '../../assets/images/dog-login-desktop.png';
import dogTab from '../../assets/images/dog-login-tablet.png';
import dogCard from '../../assets/images/dog.png';
import { Link } from 'react-router-dom';
import { validationSchemaLogin } from '../../helpers/validation';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/operation';



const LogInForm = () => {
    const dispatch = useDispatch();
    
const handleSubmit =async (values, { resetForm }) => {
    try {
      await dispatch(loginUser(values));
      resetForm();
    } catch (error) {
      console.log('Login error');
    }
  };


  return (
     <div className={style.container}>
      <div className={style.containerImage}>
        <div className={style.catWraper}>
          <picture>
            <source media="(min-width: 1280px)" srcSet={dogDesk} />
            <source media="(min-width: 768px)" srcSet={dogTab} />
            <img src={dog} alt="dog" className={style.img} />
          </picture>
          <div className={style.containerCard}>
            <div className={style.catCardContainer}><img src={dogCard} alt="dog" className={style.imgCard} /></div>
              <div className={style.containerCardText}>
                <p className={style.cardName}>Rich</p>
                <p className={style.cardBirthday}>Birthday: <span>21.09.2020</span></p>
                <p className={style.cardText}>Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!</p>
              </div>
            </div>
        </div>
      </div>

      <div className={style.containerForm}>
        <div className={style.containerTitle}>
          <h2 className={style.titleForm}>Log in</h2>
          <p className={style.textForm}>Welcome! Please enter your credentials to login to the platform:</p>
        </div>
      <Formik
        initialValues={{ email: '', password: ''}}
        validationSchema={validationSchemaLogin}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (  
          <Form className={style.form}>

            <div className={style.formField}>
              <Field 
                name="email" 
                type="email" 
                  placeholder="Email" 
                   autoComplete="off"
                className={`${style.input} ${touched.email && errors.email ? style.inputError : touched.email ? style.inputSuccess : ''}`} 
              />
              {touched.email && errors.email && (
                <SvgIcon width='22' height='22' icon='cross-small' className={style.iconError} />
              )}
              {touched.email && !errors.email && (
                <SvgIcon width='22' height='22' icon='check' className={style.iconSuccess} />
              )}
            </div>

            <div className={style.formField}>
              <Field 
                name="password" 
                type="password" 
                  placeholder="Password" 
                   autoComplete="off"
                className={`${style.input} ${touched.password && errors.password ? style.inputError : touched.password ? style.inputSuccess : ''}`} 
              />
              {touched.password && errors.password && (
                <SvgIcon width='22' height='22' icon='cross-small' className={style.iconError} />
              )}
              {touched.password && !errors.password && (
                <SvgIcon width='22' height='22' icon='check' className={style.iconSuccess} />
              )}
            </div>

            <button type="submit" className={style.submitButton}>LOG IN</button>
          </Form>
        )}
      </Formik>

      <p className={style.loginRedirect}>
        Don’t have an account? <Link to="/register" className={style.loginLink}><span>Register</span></Link>
      </p>
      </div>
    </div>
  )
}

export default LogInForm;

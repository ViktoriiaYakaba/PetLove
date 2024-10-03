import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import style from './RegisterForm.module.scss';
import cat from '../../assets/images/cet-register-mob.png';
import catTab from '../../assets/images/cat-register-tab.png';
import catDesk from '../../assets/images/cat-register.png';
import catCard from '../../assets/images/cat.png';
import { validationSchemaRegister } from '../../helpers/validation';
import { Link } from 'react-router-dom';
import SvgIcon from '../../icon/SvgIcon';

const RegisterForm = () => {

  const handleSubmit = (values) => {
    console.log(values); 
  };

  return (
    <div className={style.container}>
      <div className={style.containerImage}>
        <div className={style.catWraper}>
          <picture>
            <source media="(min-width: 1280px)" srcSet={catDesk} />
            <source media="(min-width: 768px)" srcSet={catTab} />
            <img src={cat} alt="cat" className={style.img} />
          </picture>
          <div className={style.containerCard}>
            <div className={style.catCardContainer}><img src={catCard} alt="cat" className={style.imgCard} /></div>
              <div className={style.containerCardText}>
                <p className={style.cardName}>Jack</p>
                <p className={style.cardBirthday}>Birthday: <span>18.10.2021</span></p>
                <p className={style.cardText}>Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys.</p>
              </div>
            </div>
        </div>
      </div>

      <div className={style.containerForm}>
        <div className={style.containerTitle}>
          <h2 className={style.titleForm}>Register</h2>
          <p className={style.textForm}>Thank you for your interest in our platform.</p>
        </div>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchemaRegister}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (  
          <Form className={style.form}>
            <div className={style.formField}>
              <Field 
                name="name" 
                type="text" 
                placeholder="Name" 
                className={`${style.input} ${touched.name && errors.name ? style.inputError : touched.name ? style.inputSuccess : ''}`} 
              />
        
              {touched.name && errors.name && (
                <SvgIcon width='22' height='22' icon='cross-small' className={style.iconError} /> 
              )}
              {touched.name && !errors.name && (
                <SvgIcon width='22' height='22' icon='check' className={style.iconSuccess} /> 
              )}
            </div>

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

            <div className={style.formField}>
              <Field 
                name="confirmPassword" 
                type="password" 
                  placeholder="Confirm password" 
                   autoComplete="off"
                className={`${style.input} ${touched.confirmPassword && errors.confirmPassword ? style.inputError : touched.confirmPassword ? style.inputSuccess : ''}`} 
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <SvgIcon width='22' height='22' icon='cross-small' className={style.iconError} />
              )}
              {touched.confirmPassword && !errors.confirmPassword && (
                <SvgIcon width='22' height='22' icon='check' className={style.iconSuccess} />
              )}
            </div>

            <button type="submit" className={style.submitButton}>REGISTRATION</button>
          </Form>
        )}
      </Formik>

      <p className={style.loginRedirect}>
        Already have an account? <Link to="/login" className={style.loginLink}><span>Login</span></Link>
      </p>
      </div>
    </div>
  );
};

export default RegisterForm;

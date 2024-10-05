import * as Yup from 'yup';

export const validationSchemaRegister = Yup.object({
  name: Yup.string()
    .required('Name is required'),
  
  email: Yup.string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Email is not valid')
    .required('Email is required'),

  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});


  export const validationSchemaLogin = Yup.object({
  email: Yup.string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Email is not valid')
    .required(), 
  password: Yup.string()
    .min(7) 
    .required('Password is required'), 
});

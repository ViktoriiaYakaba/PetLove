import * as Yup from 'yup';

export const validationSchemaRegister = Yup.object({
    name: Yup.string()
      .required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null],)
      .required(),
  });

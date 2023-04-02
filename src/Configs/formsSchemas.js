import * as Yup from 'yup'

export const loginSchema = Yup.object({
   email: Yup.string()
      .email('Invalid email address')
      .required('Email Required'),
   password: Yup.string().required('Password Required')
})

export const registerSchema = Yup.object({
   email: Yup.string()
      .email('Invalid email address')
      .required('Email Required'),
   password: Yup.string()
      .min(6, 'should be at least 6 character(s)')
      .required('Password Required'),
   password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password Confirmation Required'),
   email_confirmation: Yup.string()
      .oneOf([Yup.ref('email'), null], 'Emails must match')
      .required('Email Confirmation Required'),
   registration_number: Yup.string().required('Required'),
   province: Yup.string().required('Required'),
   profession: Yup.string().required('Required'),
   specialization: Yup.string().required('Required')
})

export const resetPasswordSchema = Yup.object({
   password: Yup.string()
      .min(6, 'should be at least 6 character(s)')
      .required('Password Required'),
   password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password Confirmation Required')
})

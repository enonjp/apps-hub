import * as y from 'yup';

const signUpSchema = y.object({
  firstName: y.string().required('First name is required'),
  lastName: y.string().required('Last name is required'),
  email: y.string().email('Invalid email').required('Email is required'),
  password: y
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
export default signUpSchema;

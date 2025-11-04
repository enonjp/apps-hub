import * as y from 'yup';

const loginSchema = y.object({
  email: y.string().email('Invalid email format').required('Email is required'),
  password: y
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default loginSchema;

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '@/validations/login';
import useLogin from '@/hooks/LoginHook';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

interface IFormInputs {
  email: string;
  password: string;
}

function RouteComponent() {
  const { handleLoginRequest, isLoading } = useLogin();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    handleLoginRequest(data.email, data.password);
  };

  const handleRedirectToSignup = () => {
    navigate({ to: '/signup' });
  };

  return (
    <div className='px-4 h-full flex flex-col justify-center'>
      <div className='flex justify-center'>
        <h1 className='text-3xl font-bold mb-2'>Welcome Back</h1>
      </div>
      <div className=' max-w-md'>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <p>Email</p>
          <Controller
            name='email'
            control={control}
            render={({ field }) => <Input type='email' {...field} />}
          />
          <p className='text-sm text-red-400'>{errors.email?.message}</p>
          <p>Password</p>
          <Controller
            name='password'
            control={control}
            render={({ field }) => <Input type='password' {...field} />}
          />
          <p className='text-sm text-red-400'>{errors.password?.message}</p>
          <div className='flex justify-end'>
            <Button variant='link' size='sm'>
              Forgot Password?
            </Button>
          </div>
          <Button type='submit' className='mt-4' isLoading={isLoading}>
            Login
          </Button>
        </form>
        <div className=' flex mt-4 justify-center'>
          <Button onClick={handleRedirectToSignup} variant={'link'}>
            Don't have an account? Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

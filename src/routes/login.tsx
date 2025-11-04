import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '@/validations/login';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

interface IFormInputs {
  email: string;
  password: string;
}

function RouteComponent() {
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
    // Simulate successful login by storing a token
    window.localStorage.setItem('token-appcenter', 'dummy-token');

    // Navigate to home page after successful login
    navigate({ to: '/' });
  };

  return (
    <div className='px-4 h-full flex flex-col justify-center'>
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
          <Button type='submit' className='mt-4 '>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

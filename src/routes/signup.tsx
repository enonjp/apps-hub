import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import signUpSchema from '@/validations/signup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
});

type IFormInputs = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

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
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    // handleLoginRequest(data.email, data.password);
  };

  const handleRedirectToSignup = () => {
    navigate({ to: '/login' });
  };

  return (
    <div className='px-4 h-full flex flex-col justify-center'>
      <div className='flex justify-center'>
        <h1 className='text-3xl font-bold mb-2'>Create an Account</h1>
      </div>
      <div className=' max-w-md'>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-4'>
            <div>
              <p>First Name</p>
              <Controller
                name='name'
                control={control}
                render={({ field }) => <Input type='text' {...field} />}
              />
              <p className='text-sm text-red-400'>{errors.name?.message}</p>
            </div>
            <div>
              <p>Last Name</p>
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => <Input type='text' {...field} />}
              />
              <p className='text-sm text-red-400'>{errors.lastName?.message}</p>
            </div>
          </div>
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
          <Button type='submit' className='mt-4 '>
            Create Account
          </Button>
        </form>
        <div className=' flex mt-4 justify-center'>
          <Button onClick={handleRedirectToSignup} variant={'link'}>
            Do you have an account? Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

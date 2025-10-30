import { Input } from '@/components/ui/input';
import { createFileRoute } from '@tanstack/react-router';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

interface IFormInputs {
  email: string;
  password: string;
}

function RouteComponent() {
  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <div className='px-4 h-full'>
      <div>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <p>Email</p>
          <Controller
            name='email'
            control={control}
            render={({ field }) => <Input type='email' {...field} />}
          />
          <p>Password</p>
          <Controller
            name='password'
            control={control}
            render={({ field }) => <Input type='password' {...field} />}
          />
        </form>
      </div>
    </div>
  );
}

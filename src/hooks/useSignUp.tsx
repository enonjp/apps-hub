import backendApi from '@/lib/axios';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateAccount = async (data: SignUpData) => {
    try {
      setIsLoading(true);
      await backendApi.post('/auth/signup', {
        reqHd: data,
      });
      toast.success('Account created successfully!');
      navigate({ to: '/login' });
    } catch (error) {
      console.error('Sign Up error:', error);
      toast.error('Account creation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreateAccount, isLoading };
};
export default useSignUp;

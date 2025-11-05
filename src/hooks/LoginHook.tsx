import { useGlobalContext } from '@/context/GlobalContext';
import backendApi from '@/lib/axios';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleSetIsAuthenticated } = useGlobalContext();

  const handleLoginRequest = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const resp = await backendApi.post('/auth/signin', { email, password });
      const token = resp.data.accessToken;
      window.localStorage.setItem('token-appcenter', token);
      handleSetIsAuthenticated(true);
      toast.success('Login successful!');
      navigate({ to: '/' });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  return { handleLoginRequest, isLoading };
};

export default useLogin;

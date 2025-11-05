import { useNavigate } from '@tanstack/react-router';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// Types
interface AuthContextType {
  isAuthenticated: boolean;
  handleSetIsAuthenticated: (isAuth: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Custom hook to use the auth context
export const GlobalContextProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigate();

  const handleSetIsAuthenticated = (isAuth: boolean) => {
    setIsAuthenticated(isAuth);
  };

  useEffect(() => {
    const token = window.localStorage.getItem('token-appcenter');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigation({ to: '/login' });
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation({ to: '/login' });
    } else {
      navigation({ to: '/' });
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleSetIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider'
    );
  }
  return context;
};

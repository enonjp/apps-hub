import { useNavigate } from '@tanstack/react-router';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// Types
interface AuthContextType {
  isAuthenticated: boolean;
  handleSetIsAuthenticated: (isAuth: boolean) => void;
  minutesWorking: number;
  minutesOnBreak: number;
  handleSetMinutesWorking: (minutes: number) => void;
  handleSetMinutesOnBreak: (minutes: number) => void;
  getWorkingTimeFormatted: () => string;
  getBreakTimeFormatted: () => string;
  userId: number | null;
  handleSetUserId: (id: number | null) => void;
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
  const [userId, setUserId] = useState<number | null>(null);
  const navigation = useNavigate();
  const [minutesWorking, setMinutesWorking] = useState(0);
  const [minutesOnBreak, setMinutesOnBreak] = useState(0);

  // Handle time management state
  const handleSetMinutesWorking = (
    minutes: number | ((prev: number) => number)
  ) => {
    setMinutesWorking((prev) => {
      if (typeof minutes === 'function') {
        return minutes(prev);
      }
      return minutes;
    });
  };
  const handleSetMinutesOnBreak = (
    minutes: number | ((prev: number) => number)
  ) => {
    setMinutesOnBreak((prev) => {
      if (typeof minutes === 'function') {
        return minutes(prev);
      }
      return minutes;
    });
  };

  const getWorkingTimeFormatted = () => {
    const hours = Math.floor(minutesWorking / 60);
    const minutes = minutesWorking % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const getBreakTimeFormatted = () => {
    const hours = Math.floor(minutesOnBreak / 60);
    const minutes = minutesOnBreak % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  // Handle authentication state

  const handleSetUserId = (id: number | null) => {
    setUserId(id);
  };

  const handleSetIsAuthenticated = (isAuth: boolean) => {
    setIsAuthenticated(isAuth);
  };

  useEffect(() => {
    const token = window.localStorage.getItem('token-appcenter');
    const storedUserId = window.localStorage.getItem('userId-appcenter');
    if (token) {
      setIsAuthenticated(true);
      handleSetUserId(storedUserId ? parseInt(storedUserId, 10) : null);
    } else {
      setIsAuthenticated(false);
      navigation({ to: '/login' });
    }
  }, [navigation]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation({ to: '/login' });
    } else {
      navigation({ to: '/' });
    }
  }, [isAuthenticated, navigation]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleSetIsAuthenticated,
        minutesWorking,
        minutesOnBreak,
        handleSetMinutesWorking,
        handleSetMinutesOnBreak,
        getWorkingTimeFormatted,
        getBreakTimeFormatted,
        userId,
        handleSetUserId,
      }}
    >
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

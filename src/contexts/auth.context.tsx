'use client';
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from 'react';
import api from '@/app/api';

interface AuthContextType {
  isLoggedIn: boolean;
  signIn: () => Promise<void>; // signIn이 비동기 함수임을 명시
  signOut: () => Promise<void>;
}

const initialValue: AuthContextType = {
  isLoggedIn: false,
  signIn: async () => {},
  signOut: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = useCallback(async () => {
    try {
      await api.auth.signUpKakao();
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api.auth.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;

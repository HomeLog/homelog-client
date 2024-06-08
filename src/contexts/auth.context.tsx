'use client';
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  PropsWithChildren,
} from 'react';
import api from '@/app/api';

const initialValue = {
  isLoggedIn: false,
  signIn: () => {},
  signOut: () => {},
};

const AuthContext = createContext(initialValue);

const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren<any>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = useCallback(() => setIsLoggedIn(true), []);

  const signOut = useCallback(async () => {
    await api.auth.signOut();
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default useAuth;

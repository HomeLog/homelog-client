'use client';
import api from '@/app/api';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

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

  const checkLoginStatus = async () => {
    try {
      const response = await api.user.checkSignIn();
      setIsLoggedIn(response.data);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    () => {
      checkLoginStatus();
    };
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default useAuth;

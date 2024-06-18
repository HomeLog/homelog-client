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

type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren<any>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(() => setIsLoggedIn(true), []);

  const signOut = useCallback(async () => {
    await api.auth.signOut();
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        const response = await api.auth.checkSignIn();
        setIsLoggedIn(response);
      } catch (error) {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default useAuth;

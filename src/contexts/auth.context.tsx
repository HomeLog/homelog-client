'use client';
import { createContext, useContext } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

const useAuth = () => useContext(AuthContext);

export default useAuth;

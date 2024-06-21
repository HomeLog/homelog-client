'use client';
import { createContext, useContext } from 'react';

type AuthContextType = {
  signedIn: boolean;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  signedIn: false,
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

const useAuth = () => useContext(AuthContext);

export default useAuth;

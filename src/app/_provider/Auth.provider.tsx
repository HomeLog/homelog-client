'use client';
import api from '@/api';
import { AuthContext } from '@/contexts/auth.context';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

interface AuthState {
  signedIn: boolean;
  loading: boolean;
}

export default function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const [authState, setAuthState] = useState<AuthState>({
    signedIn: false,
    loading: true,
  });

  const signIn = useCallback(() => {
    setAuthState((prevState) => ({ ...prevState, signedIn: true }));
  }, []);

  const signOut = useCallback(async () => {
    await api.auth.signOut();
    setAuthState((prevState) => ({ ...prevState, signedIn: false }));
  }, []);

  const refreshAuth = useCallback(async () => {
    try {
      await api.auth.refresh();
      return { signedIn: true, loading: false };
    } catch (error) {
      return { signedIn: false, loading: false };
    }
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      const isSignedIn = await api.auth.checkSignIn();
      return { signedIn: isSignedIn, loading: false };
    } catch (error) {
      return refreshAuth();
    }
  }, [refreshAuth]);

  useEffect(() => {
    checkAuthStatus().then(setAuthState);
  }, [checkAuthStatus]);

  return (
    <AuthContext.Provider value={{ ...authState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

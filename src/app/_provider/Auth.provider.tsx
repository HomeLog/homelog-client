'use client';

import api from '@/api';
import { AuthContext } from '@/contexts/auth.context';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

export default function AuthProvider({ children }: PropsWithChildren<any>) {
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

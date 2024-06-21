'use client';

import api from '@/api';
import { AuthContext } from '@/contexts/auth.context';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

export default function AuthProvider({ children }: PropsWithChildren<any>) {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(() => setSignedIn(true), []);

  const signOut = useCallback(async () => {
    await api.auth.signOut();
    setSignedIn(false);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const signedIn = await api.auth.checkSignIn();

        setSignedIn(signedIn);
      } catch (error) {
        setSignedIn(false);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

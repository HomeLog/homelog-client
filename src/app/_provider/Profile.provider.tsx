'use client';

import useAuth from '@/contexts/auth.context';
import { ProfileContext } from '@/contexts/profile.context';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';
import { PropsWithChildren, useEffect } from 'react';

export default function ProfileProvider({ children }: PropsWithChildren) {
  const isLoggedIn = useAuth();

  const { data: profile, isFetched: isProfileFetched } = useQueryGetProfile();

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!isProfileFetched) {
      return;
    }
  }, [isLoggedIn, isProfileFetched]);
  return (
    <ProfileContext.Provider value={profile || null}>
      {children}
    </ProfileContext.Provider>
  );
}

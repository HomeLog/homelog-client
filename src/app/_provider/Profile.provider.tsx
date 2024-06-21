'use client';

import useAuth from '@/contexts/auth.context';
import { ProfileContext } from '@/contexts/profile.context';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';
import { PropsWithChildren, useEffect } from 'react';

export default function ProfileProvider({ children }: PropsWithChildren) {
  const { signedIn } = useAuth();

  const { data: profile, isFetched: isProfileFetched } = useQueryGetProfile();

  useEffect(() => {
    if (!signedIn) return;
    if (!isProfileFetched) {
      return;
    }
  }, [signedIn, isProfileFetched]);
  return (
    <ProfileContext.Provider value={profile || null}>
      {children}
    </ProfileContext.Provider>
  );
}

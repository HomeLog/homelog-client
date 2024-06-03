'use client';

import useQueryGetProfile from '@/hooks/profile/getProfile';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import useAuth from './auth.context';

export type Profile = {
  nickname: string;
  guestBookName: string;
  profileImageUrl: string;
  homeImageUrl: string;
};

const ProfileContext = createContext<Profile | null>(null);

export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }: PropsWithChildren) {
  const isLoggedIn = useAuth();
  const { data: profile, isFetched: isProfileFetched } = useQueryGetProfile();

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!isProfileFetched) return;
  }, [isLoggedIn, isProfileFetched]);
  return (
    <ProfileContext.Provider value={profile || null}>
      {children}
    </ProfileContext.Provider>
  );
}

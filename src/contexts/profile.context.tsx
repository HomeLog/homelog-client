'use client';
import { createContext, useContext } from 'react';

export type Profile = {
  nickname: string;
  guestBookName: string;
  avatarImageUrl: string;
  homeImageUrl: string;
};

export const ProfileContext = createContext<Profile | null>(null);

export const useProfile = () => useContext(ProfileContext);

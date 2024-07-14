'use client';
import { createContext, useContext } from 'react';

export type Profile = {
  nickname: string;
  guestBookName: string;
  avatarImageKey: string;
  homeImageKey: string;
};

export const ProfileContext = createContext<Profile | null>(null);

export const useProfile = () => useContext(ProfileContext);

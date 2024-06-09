'use client';
import useAuth from '@/contexts/auth.context';
import { client } from '..';

export async function getProfile() {
  const response = await client.get('/users/profile');
  return response.data;
}

export async function createProfile() {
  await client.post('/users/profile');
}

export async function editProfile(formData: any) {
  await client.put('/users/profile', formData);
}
export function checkSignIn() {
  throw new Error('Function not implemented.');
}

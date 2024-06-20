'use client';
import { client } from '..';

export async function getProfile() {
  const response = await client.get('/users/profile');
  return response.data.result;
}

export async function createProfile() {
  await client.post('/users/profile');
}

export async function editProfile(formData: any) {
  await client.put('/users/profile', formData);
}

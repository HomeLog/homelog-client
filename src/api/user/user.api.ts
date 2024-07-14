import { client } from '..';

export async function getProfile() {
  const response = await client.get('/users/profile');
  const profile = response.data.result;

  return profile;
}

export async function createProfile() {
  await client.post('/users/profile');
}

export async function editProfile(formData: any) {
  await client.put('/users/profile', formData);
}

export async function deleteImage(isAvatar: boolean) {
  const imageType = isAvatar ? 'avatar' : 'home';
  await client.delete(`/users/profile/${imageType}`);
}

import { client } from '..';
import ProfileData from './user.dto';

export async function getProfile() {
  const response = await client.get('/users/profile');
  console.log(response);
  return response.data;
}

export async function createProfile() {
  await client.post('users/profile');
}

export async function editProfile(profileData: ProfileData) {
  const formData = new FormData();
  if (profileData.profileImage) {
    formData.append('profileImage', profileData.profileImage);
  }
  if (profileData.homeImage) {
    formData.append('homeImage', profileData.homeImage);
  }
  formData.append('nickname', profileData.nickname);
  formData.append('guestBookName', profileData.guestBookName);

  await client.put('users/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

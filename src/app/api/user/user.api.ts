import { client } from '..';

export async function getProfile() {
  const response = await client.get('/users/profile');
  console.log(response);
  return response.data;
}

export async function createProfile() {
  await client.post('users/profile');
}

export async function editProfile() {
  await client.put('users/profile');
}

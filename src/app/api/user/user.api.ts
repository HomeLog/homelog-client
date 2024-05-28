import { client } from '..';

export async function createProfile() {
  await client.post('users/profile');
}

export async function editProfile() {
  await client.put('users/profile');
}

import { client } from '..';

async function createProfile() {
  await await client.post('users/profile');
}

async function editProfile() {
  await await client.put('users/profile');
}

const userAPI = {
  createProfile,
  editProfile,
};

export default userAPI;

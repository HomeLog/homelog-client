import { client } from '..';

async function signInKakao() {
  await client.get('users/kakao');
}

async function signOut() {
  await client.delete('users/sign-out');
}

const authAPI = {
  signInKakao,
  signOut,
};

export default authAPI;

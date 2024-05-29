import { client } from '..';

export async function signInKakao() {
  await client.get('users/kakao');
}

export async function signOut() {
  await client.delete('users/sign-out');
}

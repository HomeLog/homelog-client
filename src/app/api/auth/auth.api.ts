import { client } from '..';

export async function signUpKakao() {
  const response = await client.get('users/kakao');
  return response.data.url;
}

export async function signInKakao(code: string) {
  const response = await client.get(`users/kakao/callback?code=${code}`);
  return response.data.url;
}

export async function signOut() {
  await client.delete('users/sign-out');
}

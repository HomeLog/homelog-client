import { client } from '..';

export async function signUpKakao() {
  const response = await client.get('/users/kakao', { withCredentials: true });
  return response.data.url;
}

export async function signInKakao(code: string) {
  const response = await client.get(`/users/kakao/callback?code=${code}`, {
    withCredentials: true,
  });

  return response;
}

export async function signOut() {
  await client.delete('/users/sign-out', { withCredentials: true });
}

export async function checkSignIn() {
  const response = await client.get('/users/sign-in-status', {
    withCredentials: true,
  });

  return response.data.result;
}

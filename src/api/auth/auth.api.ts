import { client } from '..';

export async function signUpKakao() {
  const response = await client.get(`/users/kakao`, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });
  return response.data.url;
}

export async function signInKakao(code: string) {
  const response = await client.get(`/users/kakao/callback?code=${code}`, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });

  return response;
}

export async function signOut() {
  await client.delete(`/users/sign-out`, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });
}

export async function checkSignIn() {
  const response = await client.get(`/users/sign-in-status`, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });

  return response.data.result;
}

export async function refresh() {
  const response = await client.get(`/users/refresh`, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });

  return response.data.result;
}

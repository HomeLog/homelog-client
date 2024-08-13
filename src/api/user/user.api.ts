import { client } from '..';

export async function getProfile() {
  const response = await client.get(`/users/profile`, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });
  const profile = response.data.result;

  return profile;
}

export async function createProfile() {
  await client.post(
    `/users/profile`,
    {},
    {
      baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
      withCredentials: true,
    },
  );
}

export async function editProfile(formData: any) {
  await client.put(`/users/profile`, formData, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });
}

export async function deleteImage(isAvatar: boolean) {
  const imageType = isAvatar ? 'avatar' : 'home';
  await client.delete(`/users/profile/${imageType}`, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });
}

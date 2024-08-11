import { DGuestBook } from '@/types/guestbook.type';
import { TResponse } from '@/types/response.type';
import { TAccessToken } from '@/types/user.type';
import { client } from '..';

export const createLink = async (formData: FormData) => {
  const baseURL = window?.ENV?.NEXT_PUBLIC_SERVER_URL! ?? '';
  const response = await client.post(`${baseURL}/guestbooks`, formData);

  return response.data.result;
};

export const getGuestBookById = async (
  id: string,
  accessToken?: TAccessToken,
): Promise<DGuestBook> => {
  const accessTokenValue = accessToken
    ? `accessToken=${accessToken.value}`
    : undefined;

  const response = await client.get(`/guestbooks/${id}`, {
    headers: {
      Cookie: accessTokenValue,
    },
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });

  return response.data.result;
};

export const getAllGuestbooks = async (
  page: number,
  limit: number,
): Promise<DGuestBook[]> => {
  const guestbooks = await client
    .get(`/guestbooks`, {
      params: { page, limit },
      baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
      withCredentials: true,
    })
    .then((res) => {
      return res.data.result;
    });

  return guestbooks;
};

export const getTotalGuestbooksCount = async () => {
  const totalGuestbooks = await client.get(`/guestbooks/count`, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });

  return totalGuestbooks.data.result;
};

export const leaveMessageToGuestBook = async (id: string, caption: string) => {
  const response = await client.put(
    `/guestbooks/${id}`,
    {
      content: caption,
    },
    {
      baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
      withCredentials: true,
    },
  );

  return response.data.result;
};

export const editGuestBook = async (id: string, formData: FormData) => {
  const response = await client.put(`/guestbooks/${id}/photo`, formData, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });

  return response.data.result;
};

export const deleteGuestBook = async (id: string): Promise<TResponse<any>> => {
  const response = await client.delete(`/guestbooks/${id}`, {
    baseURL: window?.ENV?.NEXT_PUBLIC_SERVER_URL ?? client.defaults.baseURL,
    withCredentials: true,
  });

  return response.data as TResponse<any>;
};

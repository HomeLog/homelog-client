import { DGuestBook } from '@/types/guestbook.type';
import { TAccessToken } from '@/types/user.type';
import { client } from '..';

export const createLink = async (formData: FormData) => {
  const response = await client.post('/guestbooks', formData);

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
  });

  return response.data.result;
};

export const getAllGuestbooks = async (): Promise<DGuestBook[]> => {
  const guestbooks = await client.get(`/guestbooks`);

  return guestbooks.data.result;
};

export const leaveMessageToGuestBook = async (id: string, caption: string) => {
  const response = await client.put(`/guestbooks/${id}`, { content: caption });

  return response.data.result;
};

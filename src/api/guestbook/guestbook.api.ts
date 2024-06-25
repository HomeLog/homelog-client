import { DGuestBook } from '@/types/guestbook.type';
import { TAccessToken } from '@/types/user.type';
import { client } from '..';

export const createLink = async (formData: FormData) => {
  const response = await client.post('/guestbooks', formData);

  return response.data.result;
};

export const getGuestBookById = async (
  id: string,
  accessToken: TAccessToken,
): Promise<DGuestBook> => {
  const response = await client.get(`/guestbooks/${id}`, {
    headers: {
      Cookie: `accessToken=${accessToken.value}`,
    },
  });

  return response.data.result;
};

export const getAllGuestbooks = async (): Promise<DGuestBook[]> => {
  const guestbooks = await client.get(`/guestbooks`);

  return guestbooks.data.result;
};

export const getGuestbookById = async (guestbookId: string) => {
  const guestbook = await client.get(`/guestbooks/${guestbookId}`);

  return guestbook;
};

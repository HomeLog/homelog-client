export type DGuestBook = {
  imageUrl: string | null;
  createdAt: Date;
  id: string;
  userId: string;
  visitorName: string | null;
  content: string | null;
  updatedAt: Date;
  deleted: boolean;
  hostNickname: string;
};

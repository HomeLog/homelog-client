import api from '@/api';
import useAuth from '@/contexts/auth.context';
import { DGuestBook } from '@/types/guestbook.type';
import { useQuery } from '@tanstack/react-query';

export default function useQueryGetAllGuestbooks() {
  const { signedIn } = useAuth();
  const result = useQuery<
    Awaited<ReturnType<typeof api.guestbook.getAllGuestbooks>>,
    unknown,
    DGuestBook
  >({
    queryKey: ['guestbooks'],
    queryFn: api.guestbook.getAllGuestbooks,
    enabled: !!signedIn,
    retry: false,
  });

  return result;
}

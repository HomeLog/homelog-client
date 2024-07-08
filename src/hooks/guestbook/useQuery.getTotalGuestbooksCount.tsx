'use client';
import api from '@/api';
import useAuth from '@/contexts/auth.context';
import { useQuery } from '@tanstack/react-query';

export default function useQueryGetTotalCountGuestbooks() {
  const { signedIn } = useAuth();

  const result = useQuery<
    Awaited<ReturnType<typeof api.guestbook.getTotalGuestbooksCount>>,
    number
  >({
    queryKey: ['totalGuestbooks'],
    queryFn: api.guestbook.getTotalGuestbooksCount,
    enabled: !!signedIn,
    retry: false,
  });

  return result;
}

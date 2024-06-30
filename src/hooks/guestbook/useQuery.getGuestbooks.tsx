import api from '@/api';
import { getAllGuestbooks } from '@/api/guestbook/guestbook.api';
import useAuth from '@/contexts/auth.context';
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

interface useSearchGuestbooksProps {
  guestbooksPerPage: number;
  queryFn: (context?: QueryFunctionContext) => void;
}

const GUESTBOOKS_PER_PAGE = 10;

export default function useQueryGetGuestbooksPerPage() {
  const fetchGuestbooks = async ({ pageParam = 1 }) => {
    const res = getAllGuestbooks(pageParam, GUESTBOOKS_PER_PAGE);
    return res;
  };

  return useInfiniteQuery({
    queryKey: ['guestbooks'],
    queryFn: fetchGuestbooks,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
}

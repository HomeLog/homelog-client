import { getAllGuestbooks } from '@/api/guestbook/guestbook.api';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

interface useSearchGuestbooksProps {
  guestbooksPerPage: number;
  queryFn: (context?: QueryFunctionContext) => void;
}

const LIMIT_PER_PAGE = 5;

export default function useQueryGetGuestbooksPerPage() {
  const fetchGuestbooks = async ({ pageParam = 1 }) => {
    const res = await getAllGuestbooks(pageParam, LIMIT_PER_PAGE);
    return res;
  };

  return useInfiniteQuery({
    queryKey: ['guestbooks'],
    queryFn: fetchGuestbooks,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < LIMIT_PER_PAGE) return undefined;

      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
}

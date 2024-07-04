import { useInfiniteQuery } from '@tanstack/react-query';

export default function useQueryGetDataPerPage(
  limit: number,
  initialPageParam: number = 1,
  queryFn: (pageParam: number, limit: number) => Promise<any[]>,
) {
  return useInfiniteQuery({
    queryKey: ['data'],
    queryFn: ({ pageParam = initialPageParam }) => queryFn(pageParam, limit),
    getNextPageParam: (currentPage, allPages) => {
      if (currentPage.length < limit) return undefined;
      return allPages.length + 1;
    },
    initialPageParam,
  });
}

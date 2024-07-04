import { useInfiniteQuery } from '@tanstack/react-query';

interface PaginationProps {
  fetchData: ({ pageParam }: { pageParam?: number }) => Promise<any>;
  limit: number;
}

export default function useQueryGetDataPerPage({
  fetchData,
  limit,
}: PaginationProps) {
  return useInfiniteQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    getNextPageParam: (currentPage, allPages) => {
      if (currentPage.length < limit) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
}

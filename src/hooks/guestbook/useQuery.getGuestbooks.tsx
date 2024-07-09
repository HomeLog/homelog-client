import { useInfiniteQuery } from '@tanstack/react-query';

interface PaginationProps {
  fetchData: ({ pageParam }: { pageParam?: number }) => Promise<any>;
  limit: number;
  queryKey: string[];
}

export default function useQueryGetDataPerPage({
  fetchData,
  limit,
  queryKey
}: PaginationProps) {
  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: fetchData,
    getNextPageParam: (currentPage, allPages) => {
      if (currentPage.length < limit) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
}

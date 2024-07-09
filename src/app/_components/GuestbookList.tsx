'use client';
import { getAllGuestbooks } from '@/api/guestbook/guestbook.api';
import Flex from '@/components/Flex';
import Grid from '@/components/Grid';
import useQueryGetDataPerPage from '@/hooks/guestbook/useQuery.getGuestbooks';
import { DGuestBook } from '@/types/guestbook.type';
import { useEffect, useRef } from 'react';
import Polaroid from './Polaroid';

const LIMIT_PER_PAGE = 15;

function GuestbookList() {
  const fetchComments = async ({ pageParam = 1 }) => {
    return await getAllGuestbooks(pageParam, LIMIT_PER_PAGE);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchGuestbooks,
  } = useQueryGetDataPerPage({
    fetchData: fetchComments,
    limit: LIMIT_PER_PAGE,
    queryKey: ['guestbooks'],
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refetchGuestbooks();
  }, [refetchGuestbooks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className='px-3 mt-12'>
      <Grid className='mx-auto grid-cols-3 w-[95%] h-min items-center'>
        {data?.pages.flatMap((page) =>
          page.map((guestbook: DGuestBook) => (
            <Polaroid key={guestbook.id} {...guestbook} />
          )),
        )}
      </Grid>
      <Flex className='my-5 font-thin text-gray-500'>
        <div ref={loadMoreRef}>{isFetchingNextPage ? 'Loading...' : ''}</div>
      </Flex>
    </div>
  );
}

export default GuestbookList;

'use client';
import React, { useEffect, useRef, useState } from 'react';
import Polaroid from './Polaroid';
import { DGuestBook } from '@/types/guestbook.type';
import Grid from '@/components/Grid';
import Flex from '@/components/Flex';
import useQueryGetDataPerPage from '@/hooks/guestbook/useQuery.getGuestbooks';
import { getAllGuestbooks } from '@/api/guestbook/guestbook.api';

function GuestbookList() {
  const LIMIT_PER_PAGE = 15;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useQueryGetDataPerPage(LIMIT_PER_PAGE, 1, getAllGuestbooks);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className='px-3 mt-12'>
      <Grid className='mx-auto grid-cols-3 w-[95%] h-min items-center'>
        {data?.pages.flatMap((page) =>
          page.map((guestbook: DGuestBook, index: number) => (
            <Polaroid key={index} {...guestbook} />
          )),
        )}
      </Grid>
      <Flex className='my-5 text-gray-500 font-thin'>
        <div ref={loadMoreRef}>{isFetchingNextPage ? 'Loading...' : ''}</div>
      </Flex>
    </div>
  );
}

export default GuestbookList;

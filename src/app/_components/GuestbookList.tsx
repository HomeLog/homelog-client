'use client';
import React, { useEffect, useRef } from 'react';
import Polaroid from './Polaroid';
import { DGuestBook } from '@/types/guestbook.type';
import Grid from '@/components/Grid';
import useQueryGetGuestbooksPerPage from '@/hooks/guestbook/useQuery.getGuestbooks';

function GuestbookList({ guestbooks }: { guestbooks: DGuestBook[] }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useQueryGetGuestbooksPerPage();

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

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <div className='px-3 mt-12'>
        <Grid className='mx-auto grid-cols-3 w-[95%] h-min items-center'>
          {data?.pages.flatMap((page) =>
            page.map((guestbook: DGuestBook, index: number) => (
              <Polaroid key={index} {...guestbook} />
            )),
          )}
        </Grid>
      </div>
      <div ref={loadMoreRef}>{isFetchingNextPage ? 'Loading...' : ''}</div>
    </>
  );
}

export default GuestbookList;

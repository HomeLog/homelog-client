'use client';
import React from 'react';
import Polaroid from './Polaroid';
import { DGuestBook } from '@/types/guestbook.type';
import Grid from '@/components/Grid';

function GuestbookList({ guestbooks }: { guestbooks: DGuestBook[] }) {
  return (
    <>
      <div className='bg-[#F5F5F5] px-3 mt-12 '>
        <Grid className='mx-auto grid-cols-3 w-[95%] h-min items-center'>
          {guestbooks?.map((guestbook: DGuestBook, index: number) => (
            <Polaroid key={index} {...guestbook} />
          ))}
        </Grid>
      </div>
    </>
  );
}

export default GuestbookList;

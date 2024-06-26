import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { DGuestBook } from '@/types/guestbook.type';

function Polaroid(guestbook: DGuestBook) {
  let thumbnail = '/images/background.png';
  if (guestbook.imageUrl) thumbnail = guestbook?.imageUrl;

  const link = `/guest-book/${guestbook.id}`;
  const router = useRouter();
  const redirectToGuestbookDetailPage = () => {
    router.push(link);
  };

  return (
    <Button
      className='bg-white w-[90%] h-40 drop-shadow-md rounded-sm p-0 mx-auto mb-5'
      onClick={redirectToGuestbookDetailPage}
    >
      <div className='relative w-[90%] h-[75%] mx-auto mb-[10%] bg-black overflow-hidden'>
        <Image
          src={thumbnail}
          alt='guestbook thumbnail'
          layout='fill'
          objectFit='cover'
        />
      </div>
    </Button>
  );
}

export default Polaroid;

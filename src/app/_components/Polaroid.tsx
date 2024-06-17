import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

function Polaroid() {
  const router = useRouter();
  const exampleImage = '/images/example.jpg';
  const onHandleNavigate = () => {
    router.push('/');
  };
  return (
    <Button
      className='bg-white w-[31%] h-44 drop-shadow-md rounded-sm p-0'
      onClick={onHandleNavigate}
    >
      <div className='relative w-[90%] h-[75%] mx-auto mb-[10%] bg-black overflow-hidden'>
        <Image
          src={exampleImage}
          alt='guestbook image'
          layout='fill'
          objectFit='cover'
        />
      </div>
    </Button>
  );
}

export default Polaroid;

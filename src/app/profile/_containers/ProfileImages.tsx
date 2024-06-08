'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Flex from '@/components/Flex';

function ProfileImages() {
  const [profileImage, setProfileImage] = useState('/images/blank-profile.png');
  const [homeImage, setHomeImage] = useState('/images/blank.png');

  const fileInput = useRef(null);

  const handleProfileImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    else {
      setProfileImage('');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          const imgUrl = e.target.result;
          setProfileImage(imgUrl);
        }
      };
    }
  };

  const handleHomeImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    else {
      setProfileImage('');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          const imgUrl = e.target.result;
          setProfileImage(imgUrl);
        }
      };
    }
  };
  return (
    <Flex className='w-full h-1/3 relative'>
      <div className='w-full h-full relative'>
        <Button onClick={handleProfileImage}>
          <Image src={homeImage} alt='Home Image' fill className='w-full' />
        </Button>
      </div>
      <div className='absolute bg-inherit aspect-square w-[14%]'>
        <Button
          intent={'none'}
          className='h-full p-0 '
          onClick={handleHomeImage}
        >
          <Image
            src={profileImage}
            alt='Profile Image'
            fill
            objectFit='contain'
            className='rounded-full	'
          />
        </Button>
      </div>
    </Flex>
  );
}

export default ProfileImages;

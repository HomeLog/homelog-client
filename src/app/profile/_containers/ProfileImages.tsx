'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';

function ProfileImages() {
  const { data: profile } = useQueryGetProfile();
  console.log('profile: ', profile);
  console.log('nickname: ', profile?.result.nickname);
  console.log('profileImgUrl: ', profile?.result.homeImageUrl);
  console.log('homeImgUrl: ', profile?.result.profileImageUrl);

  const profileImageInputRef = useRef(null);
  const homeImageInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    profile?.result.profileImageUrl ?? '/images/blank-profile.png',
  );
  const [homeImage, setHomeImage] = useState(
    profile?.result.homeImageUrl ?? '/images/blank.png',
  );

  const handleProfileImage = async (e: any) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (reader.readyState === 2) {
        const imgUrl = e.target.result;
        setProfileImage(imgUrl);
      }
    };
  };

  const handleHomeImage = async (e: any) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (reader.readyState === 2) {
        const imgUrl = e.target.result;
        setHomeImage(imgUrl);
      }
    };
  };

  const triggerHomeInput = () => {
    homeImageInputRef.current.click();
  };
  const triggerProfileInput = () => {
    profileImageInputRef.current.click();
  };

  return (
    <Flex className='w-full h-1/3 relative'>
      <div className='w-full h-full relative'>
        <Button onClick={triggerHomeInput}>
          <input
            type='file'
            ref={homeImageInputRef}
            onChange={handleHomeImage}
            className='w-full hidden'
          />
          <Image src={homeImage} alt='Home Image' fill className='w-full' />
        </Button>
      </div>
      <div className='absolute bg-inherit aspect-square w-[14%]'>
        <Button
          intent={'none'}
          className='h-full p-0 '
          onClick={triggerProfileInput}
        >
          <input
            type='file'
            ref={profileImageInputRef}
            onChange={handleProfileImage}
            className='rounded-full	hidden'
          />
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

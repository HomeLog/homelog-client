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

  const fileInputRef = useRef(null);

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
        setProfileImage(imgUrl);
      }
    };
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Flex className='w-full h-1/3 relative'>
      <div className='w-full h-full relative'>
        <Button onClick={triggerFileInput}>
          <input
            type='file'
            style={{ display: 'none' }} // 파일 입력 요소 숨기기
            ref={fileInputRef}
            onChange={handleProfileImage}
          />
          <Image src={homeImage} alt='Home Image' fill className='w-full' />
        </Button>
      </div>
      <div className='absolute bg-inherit aspect-square w-[14%]'>
        <Button
          intent={'none'}
          className='h-full p-0 '
          onClick={triggerFileInput}
        >
          <input
            type='file'
            style={{ display: 'none' }} // 파일 입력 요소 숨기기
            ref={fileInputRef}
            onChange={handleProfileImage}
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

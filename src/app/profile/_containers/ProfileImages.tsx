'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';

function ProfileImages({ onProfileImageChange, onHomeImageChange }) {
  const { data: profile } = useQueryGetProfile();
  console.log('nickname: ', profile?.result.nickname);
  console.log('guestBookName: ', profile?.result.guestBookName);
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

  const handleImageUpload = (e, setImage, onImageChange) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imgUrl = reader.result;
      setImage(imgUrl);
      onImageChange(file);
    };
  };

  return (
    <Flex className='w-full h-1/3 relative'>
      <div className='w-full h-full relative'>
        <Button onClick={() => homeImageInputRef.current.click()}>
          <input
            type='file'
            accept='image/*'
            ref={homeImageInputRef}
            onChange={(e) =>
              handleImageUpload(e, setHomeImage, onHomeImageChange)
            }
            style={{ display: 'none' }}
          />
          <Image src={homeImage} alt='Home Image' fill className='w-full' />
        </Button>
      </div>
      <div className='absolute bg-inherit aspect-square w-[14%]'>
        <Button
          intent={'none'}
          className='h-full p-0 '
          onClick={() => profileImageInputRef.current.click()}
        >
          <input
            type='file'
            accept='image/*'
            ref={profileImageInputRef}
            onChange={(e) =>
              handleImageUpload(e, setProfileImage, onProfileImageChange)
            }
            style={{ display: 'none' }}
          />
          <Image
            src={profileImage}
            alt='Profile Image'
            fill
            objectFit='contain'
            className='rounded-full'
          />
        </Button>
      </div>
    </Flex>
  );
}

export default ProfileImages;

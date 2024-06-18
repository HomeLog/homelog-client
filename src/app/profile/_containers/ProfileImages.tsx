'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import { ProfileImagesProps } from '@/types/profile.type';

function ProfileImages({
  profile,
  onProfileImageChange,
  onHomeImageChange,
}: ProfileImagesProps) {
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const homeImageInputRef = useRef<HTMLInputElement | null>(null);

  const [profileImage, setProfileImage] = useState('/images/blank-profile.png');
  const [homeImage, setHomeImage] = useState('/images/background.png');

  useEffect(() => {
    if (profile) {
      if (profile.profileImageUrl) {
        setProfileImage(profile.profileImageUrl);
      }
      if (profile.homeImageUrl) {
        setHomeImage(profile.homeImageUrl);
      }
    }
  }, [profile]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    onImageChange: (file: File) => void,
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
        onImageChange(file);
      }
    };
  };

  return (
    <Flex className='w-full h-1/3 relative'>
      <div className='w-full h-full relative'>
        <Button onClick={() => homeImageInputRef.current?.click()}>
          <input
            title='selectHomeImage'
            type='file'
            accept='image/*'
            ref={homeImageInputRef}
            onChange={(e) =>
              handleImageUpload(e, setHomeImage, onHomeImageChange)
            }
            className='hidden'
          />
          <Image
            src={homeImage}
            alt='Home Image'
            fill
            objectFit='cover'
            className='w-full'
          />
        </Button>
      </div>
      <div className='absolute bg-inherit aspect-square w-[14%]'>
        <Button
          intent={'none'}
          className='h-full p-0 '
          onClick={() => profileImageInputRef.current?.click()}
        >
          <input
            title='selectProfileImage'
            type='file'
            accept='image/*'
            ref={profileImageInputRef}
            onChange={(e) =>
              handleImageUpload(e, setProfileImage, onProfileImageChange)
            }
            className='hidden'
          />
          <Image
            src={profileImage}
            alt='Profile Image'
            fill
            objectFit='cover'
            className='rounded-full'
          />
        </Button>
      </div>
    </Flex>
  );
}

export default ProfileImages;

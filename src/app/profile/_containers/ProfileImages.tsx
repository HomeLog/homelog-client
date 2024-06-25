'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import { ProfileImagesProps } from '@/types/profile.type';
import Modal from '@/components/Modal';

function ProfileImages({
  profile,
  onAvatarImageChange,
  onHomeImageChange,
}: ProfileImagesProps) {
  const avatarImageInputRef = useRef<HTMLInputElement | null>(null);
  const homeImageInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarImage, setAvatarImage] = useState('/images/blank-profile.png');
  const [homeImage, setHomeImage] = useState('/images/background.png');

  const [modal, setModal] = useState(false);
  const [isAvatarImage, setIsAvatarImage] = useState(true);

  const clickModal = (isAvatar: boolean) => {
    setIsAvatarImage(isAvatar);
    setModal(!modal);
  };

  useEffect(() => {
    if (profile?.avatarImageUrl) setAvatarImage(profile.avatarImageUrl);
    if (profile?.homeImageUrl) setHomeImage(profile.homeImageUrl);
  }, [profile]);

  const setBasicImage = (isAvatar: boolean) => {
    if (isAvatar) {
      setAvatarImage('/images/blank-profile.png');
      onAvatarImageChange(null, true);
    } else {
      setHomeImage('/images/background.png');
      onHomeImageChange(null, true);
    }
    setModal(false);
  };

  const openFileSelector = (isAvatar: boolean) => {
    const ref = isAvatar ? avatarImageInputRef : homeImageInputRef;
    ref.current?.click();
    setModal(false);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    onImageChange: (file: File | null, isChanged: boolean) => void,
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
        onImageChange(file, true);
      }
    };
  };

  return (
    <>
      <Flex className='w-full h-1/3 relative'>
        <div className='w-full h-full relative'>
          <Button onClick={() => clickModal(false)}>
            <Image
              src={homeImage}
              alt='Home Image'
              fill
              objectFit='cover'
              className='w-full'
            />
            <div
              id='filter'
              className='absolute inset-0 bg-black opacity-40 flex items-center justify-center'
            />
          </Button>
        </div>
        <div className='absolute bg-inherit aspect-square w-[14%]'>
          <Button
            intent={'none'}
            className='h-full p-0 '
            onClick={() => clickModal(true)}
          >
            <Image
              src={avatarImage}
              alt='Avatar Image'
              fill
              objectFit='cover'
              className='rounded-full'
            />
          </Button>
        </div>
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
        <input
          title='selectAvatarImage'
          type='file'
          accept='image/*'
          ref={avatarImageInputRef}
          onChange={(e) =>
            handleImageUpload(e, setAvatarImage, onAvatarImageChange)
          }
          className='hidden'
        />
      </Flex>
      {modal && (
        <Modal
          clickModal={() => clickModal(isAvatarImage)}
          setBasicImage={() => setBasicImage(isAvatarImage)}
          selectImage={() => openFileSelector(isAvatarImage)}
          isAvatarImage={isAvatarImage}
        />
      )}
    </>
  );
}

export default ProfileImages;

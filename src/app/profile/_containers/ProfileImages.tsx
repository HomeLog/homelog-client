'use client';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Modal from '@/components/Modal';
import { ProfileImagesProps } from '@/types/profile.type';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const buttonStyles = {
  intent: 'secondary' as 'secondary',
  size: 'md' as 'md',
  rounded: 'sm' as 'sm',
};

const imageBaseUrl = process.env.NEXT_PUBLIC_API_IMAGE_SERVER_URL;

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
    if (profile?.avatarImageKey)
      setAvatarImage(`${imageBaseUrl}/w140/${profile.avatarImageKey}`);
    if (profile?.homeImageKey)
      setHomeImage(`${imageBaseUrl}/w640/${profile.homeImageKey}`);
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
      <Flex className='w-full h-[285px] relative'>
        <div className='relative w-full h-full'>
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
              className='absolute inset-0 flex items-center justify-center bg-black opacity-40'
            />
          </Button>
        </div>
        <div className='absolute bg-inherit aspect-square w-[14%] rounded-full overflow-hidden'>
          <Button intent={'none'} onClick={() => clickModal(true)}>
            <Image
              src={avatarImage}
              alt='Avatar Image'
              layout='fill'
              objectFit='cover'
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
          setModal={() => clickModal(isAvatarImage)}
          title={isAvatarImage ? '프로필 사진 설정' : '홈 사진 설정'}
        >
          <Button
            onClick={() => setBasicImage(isAvatarImage)}
            {...buttonStyles}
          >
            기본 이미지 적용
          </Button>
          <Button
            onClick={() => openFileSelector(isAvatarImage)}
            {...buttonStyles}
          >
            앨범에서 사진 선택
          </Button>
        </Modal>
      )}
    </>
  );
}

export default ProfileImages;

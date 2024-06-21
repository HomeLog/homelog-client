'use client';
import { deleteImage } from '@/api/user/user.api';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import InputWithLabel from '@/components/InputWithLabel';
import useAuth from '@/contexts/auth.context';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';
import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useEffect, useState } from 'react';
import ProfileImages from './_containers/ProfileImages';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '@/libs/utils';
import api from '@/api';

function ProfileEditPage() {
  const router = useRouter();
  const { signedIn, loading } = useAuth();
  const { data: profile } = useQueryGetProfile();

  useEffect(() => {
    if (loading === false && signedIn === false) {
      router.push('/users');
    }
  }, [loading, signedIn, router]);

  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [isAvatarImageChanged, setIsAvatarImageChanged] = useState(false);
  const [homeImage, setHomeImage] = useState<File | null>(null);
  const [isHomeImageChanged, setIsHomeImageChanged] = useState(false);
  const [nickname, setNickname] = useState(profile?.nickname ?? '');
  const [guestbookName, setGuestbookName] = useState(
    profile?.guestBookName ?? '',
  );

  const handleAvatarImageChange = (
    file: File | null,
    isAvatarImageChanged: boolean,
  ) => {
    setAvatarImage(file);
    setIsAvatarImageChanged(isAvatarImageChanged);
  };

  const handleHomeImageChange = (
    file: File | null,
    isHomeImageChanged: boolean,
  ) => {
    setHomeImage(file);
    setIsHomeImageChanged(isHomeImageChanged);
  };

  const nicknameChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setNickname(e.target.value);

  const guestBookNameChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setGuestbookName(e.target.value);

  const nicknameLabel =
    nickname.length > 10
      ? '닉네임은 최대 10자까지 작성할 수 있습니다.'
      : undefined;

  const guestbookNameLabel =
    guestbookName.length > 20
      ? '방명록 이름은 최대 20자까지 작성할 수 있습니다.'
      : undefined;

  const { mutate: editProfile } = useMutation({
    mutationFn: async (formData: FormData) => {
      api.user.editProfile(formData);
    },
    onSuccess: (data) => {
      showToast.success('프로필 변경이 완료되었습니다.');
      router.push('/');
    },
    onError: (error) => {
      showToast.error('닉네임 또는 방명록 이름을 확인해주세요.');
    },
  });

  const formData = new FormData();

  const handleSubmitEditForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (nickname) {
      formData.append('nickname', nickname);
    }
    if (guestbookName) {
      formData.append('guestBookName', guestbookName);
    }
    if (avatarImage) {
      formData.append('avatarImage', avatarImage);
    } else if (!avatarImage && isAvatarImageChanged) {
      await api.user.deleteImage(true);
    }
    if (homeImage) {
      formData.append('homeImage', homeImage);
    } else if (!homeImage && isHomeImageChanged) {
      await api.user.deleteImage(false);
    }

    if (nicknameLabel && guestbookNameLabel) {
      showToast.error('닉네임과 방명록 이름을 확인해주세요.');
      return;
    } else if (nicknameLabel) {
      showToast.error('닉네임을 확인해주세요.');
      return;
    } else if (guestbookNameLabel) {
      showToast.error('방명록 이름을 확인해주세요.');
      return;
    }
    editProfile(formData);
  };

  return (
    <Flex className='justify-between w-full h-full'>
      <ProfileImages
        profile={profile}
        onAvatarImageChange={handleAvatarImageChange}
        onHomeImageChange={handleHomeImageChange}
      />
      <form onSubmit={handleSubmitEditForm} className='w-full'>
        <div className='grid w-full grid-rows-5 gap-4 px-10 h-max'>
          <InputWithLabel
            id='nickname'
            placeholder='닉네임을 입력해주세요'
            value={nickname}
            labelText={nicknameLabel}
            classNameFlex='row-start-2 justify-end h-16'
            classNameLabel='w-full'
            classNameInput='justify-end h-max'
            onChange={nicknameChangeHandler}
          />
          <InputWithLabel
            id='guestbook-name'
            placeholder='방명록 이름을 입력해주세요'
            value={guestbookName}
            labelText={guestbookNameLabel}
            classNameFlex='row-start-3 justify-end h-16'
            classNameLabel='w-full '
            classNameInput='justify-end h-min'
            onChange={guestBookNameChangeHandler}
          />
        </div>
        <div className='flex-col justify-end w-full p-10'>
          <Button type='submit'>저장하기</Button>
        </div>
      </form>
    </Flex>
  );
}

export default ProfileEditPage;

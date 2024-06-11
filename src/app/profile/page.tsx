'use client';
import Input from '@/components/Input';
import React, { FormEventHandler, useEffect, useState } from 'react';
import ProfileImages from './_containers/ProfileImages';
import Button from '@/components/Button';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';
import useAuth from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';
import { editProfile } from '../api/user/user.api';
import InputWithLabel from '@/components/InputWithLabel';
import Flex from '@/components/Flex';

function ProfileEditPage() {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth();
  const { data: profile } = useQueryGetProfile();

  useEffect(() => {
    if (loading === false && isLoggedIn === false) {
      router.push('/users');
    }
  }, [loading, isLoggedIn, router]);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [homeImage, setHomeImage] = useState<File | null>(null);
  const [nickname, setNickname] = useState(profile?.nickname ?? '');
  const [guestbookName, setGuestbookName] = useState(
    profile?.guestBookName ?? '',
  );

  const handleProfileImageChange = (file: File) => {
    setProfileImage(file);
  };

  const handleHomeImageChange = (file: File) => {
    setHomeImage(file);
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
    guestbookName.length > 10
      ? '방명록 이름은 최대 10자까지 작성할 수 있습니다.'
      : undefined;

  const formData = new FormData();

  const handleSubmitEditForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (nickname) {
      formData.append('nickname', nickname);
    }
    if (guestbookName) {
      formData.append('guestBookName', guestbookName);
    }
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    if (homeImage) {
      formData.append('homeImage', homeImage);
    }
    await editProfile(formData);
    alert('프로필 변경이 완료되었습니다.');
    router.push('/');
  };

  return (
    <Flex className='w-full h-full justify-between'>
      <ProfileImages
        profile={profile}
        onProfileImageChange={handleProfileImageChange}
        onHomeImageChange={handleHomeImageChange}
      />
      <form onSubmit={handleSubmitEditForm} className='w-full'>
        <div className='w-full h-max px-10 gap-4 grid grid-rows-5'>
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
        <div className='w-full flex-col justify-end p-10'>
          <Button type='submit'>저장하기</Button>
        </div>
      </form>
    </Flex>
  );
}

export default ProfileEditPage;

'use client';
import Input from '@/components/Input';
import React, { FormEventHandler, useState } from 'react';
import ProfileImages from './_containers/ProfileImages';
import Button from '@/components/Button';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';
import useAuth from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';
import api from '../api';

function ProfileEditPage() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  if (isLoggedIn.isLoggedIn === false) router.push('/users');

  const { data: profile } = useQueryGetProfile();

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [homeImageFile, setHomeImageFile] = useState(null);
  const [nickname, setNickname] = useState(profile?.nickname ?? '');
  const [guestBookName, setGuestBookName] = useState('');

  const nicknameChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setNickname(e.target.value);

  const guestBookNameChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setGuestBookName(e.target.value);

  const handleSubmitEditForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('nickname', nickname);
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    }
    if (homeImageFile) {
      formData.append('homeImage', homeImageFile);
    }
    await api.user.editProfile(formData);
    router.push('/');
  };

  return (
    <>
      <ProfileImages
        onProfileImageChange={setProfileImageFile}
        onHomeImageChange={setHomeImageFile}
      />
      <div className='w-full px-10 gap-4 grid grid-rows-5'>
        <Input
          placeholder='닉네임을 입력해주세요'
          value={nickname}
          onChange={nicknameChangeHandler}
          className='row-start-1 h-min'
        />
        <Input
          placeholder='방명록 이름을 입력해주세요'
          value={guestBookName}
          onChange={guestBookNameChangeHandler}
          className='row-start-3 h-min'
        />
      </div>
      <div className='w-full p-10'>
        <Button type='submit'>저장하기</Button>
      </div>
    </>
  );
}

export default ProfileEditPage;

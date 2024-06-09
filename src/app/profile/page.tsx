'use client';
import Input from '@/components/Input';
import React, { FormEventHandler, useEffect, useState } from 'react';
import ProfileImages from './_containers/ProfileImages';
import Button from '@/components/Button';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';
import useAuth from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';
import { editProfile } from '../api/user/user.api';

function ProfileEditPage() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  useEffect(() => {
    if (!isLoggedIn.isLoggedIn) {
      router.push('/users');
    }
  }, [isLoggedIn, router]);
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
    if (nickname) {
      formData.append('nickname', nickname);
    }
    if (guestBookName) {
      formData.append('guestBookName', guestBookName);
    }
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    }
    if (homeImageFile) {
      formData.append('homeImage', homeImageFile);
    }
    await editProfile(formData);
    alert('프로필 변경이 완료되었습니다.');
    router.push('/');
  };

  return (
    <>
      <ProfileImages
        onProfileImageChange={setProfileImageFile}
        onHomeImageChange={setHomeImageFile}
      />
      <form onSubmit={handleSubmitEditForm} className='w-full'>
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
      </form>
    </>
  );
}

export default ProfileEditPage;

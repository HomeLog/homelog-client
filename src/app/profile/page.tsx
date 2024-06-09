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
  const [guestBookName, setGuestBookName] = useState(
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
  }) => setGuestBookName(e.target.value);

  const formData = new FormData();

  const handleSubmitEditForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (nickname) {
      formData.append('nickname', nickname);
    }
    if (guestBookName) {
      formData.append('guestBookName', guestBookName);
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
    <>
      <ProfileImages
        profile={profile}
        onProfileImageChange={handleProfileImageChange}
        onHomeImageChange={handleHomeImageChange}
      />
      <form onSubmit={handleSubmitEditForm} className='w-full'>
        <div className='w-full px-10 gap-4 grid grid-rows-5'>
          <Input
            placeholder='닉네임을 입력해주세요'
            onChange={nicknameChangeHandler}
            className='row-start-1 h-min'
          />
          <Input
            placeholder='방명록 이름을 입력해주세요'
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

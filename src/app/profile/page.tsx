'use client';
import Input from '@/components/Input';
import React, { useState } from 'react';
import ProfileImages from './_containers/ProfileImages';
import Button from '@/components/Button';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';
import useAuth from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';

function ProfileEditPage() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  if (isLoggedIn.isLoggedIn === false) router.push('/users');

  const { data: profile } = useQueryGetProfile();

  const [nickname, setNickname] = useState(profile?.nickname ?? '');
  const [guestBookName, setGuestBookName] = useState('');

  const nicknameChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setNickname(e.target.value);

  const guestBookNameChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setGuestBookName(e.target.value);

  return (
    <>
      <ProfileImages />
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
        <Button>저장하기</Button>
      </div>
    </>
  );
}

export default ProfileEditPage;

'use client';
import api from '@/app/api';
import Input from '@/components/Input';
import { useProfile } from '@/contexts/profile.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProfileImages from './_containers/ProfileImages';
import Button from '@/components/Button';
import Grid from '@/components/Grid';
import Flex from '@/components/Flex';

function ProfileEditPage() {
  const profile = useProfile();
  // const queryClient = useQueryClient();
  // const { mutateAsync: updateUser, isPending } = useMutation({
  //   mutationFn: api.user.editProfile,
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({ exact: true, queryKey: ['myProfile'] }),
  // });
  console.log('profile: ', profile);
  const [nickname, setNickname] = useState('');
  const [guestBookName, setGuestBookName] = useState('');

  return (
    <>
      <ProfileImages />
      <div className='w-full px-10 gap-4 grid grid-rows-5'>
        <Input
          placeholder='닉네임을 입력해주세요'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className='row-start-1 h-min'
        />
        <Input
          placeholder='방명록 이름을 입력해주세요'
          value={guestBookName}
          onChange={(e) => setGuestBookName(e.target.value)}
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

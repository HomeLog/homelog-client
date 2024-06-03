'use client';
import api from '@/app/api';
import Input from '@/components/Input';
import { useProfile } from '@/contexts/profile.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

function ProfileEditPage() {
  const profile = useProfile();
  const queryClient = useQueryClient();
  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: api.user.editProfile,
    onSuccess: () =>
      queryClient.invalidateQueries({ exact: true, queryKey: ['myProfile'] }),
  });
  console.log('profile: ', profile);
  const [nickname, setNickname] = useState('');
  const [guestBookName, setGuestBookName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [homeImageUrl, setHomeImageUrl] = useState('');

  return (
    <>
      <div></div>
      <Input placeholder='닉네임을 입력해주세요' />
      <Input placeholder='방명록 이름을 입력해주세요' />
    </>
  );
}

export default ProfileEditPage;

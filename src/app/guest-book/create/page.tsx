'use client';

import Grid from '@/components/Grid';
import InputWithLabel from '@/components/InputWithLabel';
import useAuth from '@/contexts/auth.context';
import { showToast } from '@/libs/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ButtonContainer from '../_containers/ButtonContainer';
import {
  handleVisitorNameInput,
  MAX_VISITOR_NAME_LENGTH,
  validateForm,
} from '../_utils/form.util';
import ImageUploadContainer from './_container/ImageUploadContainer';
import useGuestBookLink from './_hook/useGuestBookLink';

export default function GuestbookCreatePage() {
  const { visitorName, setVisitorName, file, setFile, createLink } =
    useGuestBookLink();

  const { signedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!signedIn && !loading) {
      showToast.error('로그인 후 이용해주세요!');
      router.push('/users');
    }
  }, [signedIn, router, loading]);

  const handleButtonClick = async () => {
    if (!validateForm(visitorName, file)) return;
    if (!file) return;

    const blob = new Blob([await file.file.arrayBuffer()], {
      type: file.file.type,
    });

    const formData = new FormData();
    formData.append('imageFile', blob);
    formData.append('visitorName', visitorName);
    createLink(formData);
  };

  const labelText =
    visitorName.length >= MAX_VISITOR_NAME_LENGTH
      ? '방문자 이름은 최대 10자까지 작성할 수 있습니다.'
      : undefined;

  return (
    <Grid className='w-full h-full grid-cols-1 px-10 grid-rows-12'>
      <InputWithLabel
        id='visitor-name'
        labelText={labelText}
        placeholder='방문자 이름을 입력해주세요'
        value={visitorName}
        classNameFlex='justify-end row-span-1 row-start-2'
        classNameLabel='w-full'
        onChange={(e) => handleVisitorNameInput(e, setVisitorName)}
      />
      <ImageUploadContainer file={file} setFile={setFile} />
      <ButtonContainer
        buttonText='링크 생성하기'
        className='justify-start row-start-11'
        onClick={handleButtonClick}
      />
    </Grid>
  );
}

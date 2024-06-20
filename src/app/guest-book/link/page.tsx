'use client';
import api from '@/api';
import Grid from '@/components/Grid';
import ImageFile from '@/types/image.file';
import { useMutation } from '@tanstack/react-query';
import * as htmlToImage from 'html-to-image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import InputWithLabel from '../../../components/InputWithLabel';
import ButtonContainer from '../_containers/ButtonContainer';
import ImageUploadContainer from './_container/ImageUploadContainer';
import { showToast } from '@/libs/utils';

const MAX_VISITOR_NAME_LENGTH = 10;

const NewGuestBookLink = () => {
  const [visitorName, setVisitorName] = useState('');
  const [file, setFile] = useState<ImageFile | null>(null);
  const router = useRouter();

  const { mutate: createLink } = useMutation({
    mutationFn: (formData: FormData) => api.guestbook.createLink(formData),
    onSuccess: (data) => {
      // TODO:성공 알림 후 /pages/new 페이지로 이동
    },
    onError: (error) => {
      // TODO:실패 알림
    },
  });

  const handleVisitorNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_VISITOR_NAME_LENGTH) return;
    setVisitorName(e.target.value);
  };

  const handleButtonClick = async () => {
    const imageUploadContainer = document.querySelector(
      '#image-upload-container',
    );
    if (!file) {
      return;
    }

    const image = await htmlToImage.toJpeg(
      imageUploadContainer as HTMLElement,
      {
        quality: 1,
      },
    );

    const base64Image = await fetch(image);
    const blob = await base64Image.blob();

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
        onChange={handleVisitorNameInput}
      />
      <ImageUploadContainer file={file} setFile={setFile} />
      <ButtonContainer
        buttonText='링크 생성하기'
        className='justify-start row-start-11'
        onClick={handleButtonClick}
      />
    </Grid>
  );
};

export default NewGuestBookLink;

'use client';

import Grid from '@/components/Grid';
import ImageFile from '@/types/image.file';
import * as htmlToImage from 'html-to-image';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import ButtonContainer from '../_containers/ButtonContainer';
import ImageUploadContainer from './_container/ImageUploadContainer';
import InputWithLabel from '../../../components/InputWithLabel';

const handleVisitorNameInput = (
  e: ChangeEvent<HTMLInputElement>,
  setVisitor: (value: string) => void,
) => {
  if (e.target.value.length > 10) return;

  setVisitor(e.target.value);
};

const handleButtonClick = async (
  router: AppRouterInstance,
  file: ImageFile | null,
) => {
  const imageUploadContainer = document.querySelector(
    '#image-upload-container',
  );

  if (!file) return;

  const image = await htmlToImage.toJpeg(imageUploadContainer as HTMLElement, {
    quality: 1,
  });

  router.push(image);
};

function NewGuestBookLink() {
  const [visitor, setVisitor] = useState('');
  const [file, setFile] = useState<ImageFile | null>(null);
  const router = useRouter();

  const labelText =
    visitor.length >= 10
      ? '방문자 이름은 최대 10자까지 작성할 수 있습니다.'
      : undefined;

  return (
    <Grid className='px-10 grid-rows-12 min-h-dvh'>
      <InputWithLabel
        id='visitor-name'
        labelText={labelText}
        placeholder='방문자 이름을 입력해주세요'
        value={visitor}
        classNameFlex='justify-end row-span-2 row-start-1 mb-7'
        classNameLabel='w-full'
        onChange={(e) => handleVisitorNameInput(e, setVisitor)}
      />
      <ImageUploadContainer file={file} setFile={setFile} />
      <ButtonContainer
        buttonText='링크 생성하기'
        className='justify-start row-start-11'
        onClick={() => handleButtonClick(router, file)}
      />
    </Grid>
  );
}

export default NewGuestBookLink;

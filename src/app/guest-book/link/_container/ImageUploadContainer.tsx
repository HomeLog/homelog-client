'use client';
import ImageBackgroundWrapper from '@/app/guest-book/_containers/ImageBackgroundWrapper';
import ImageWrapper from '@/app/guest-book/_containers/ImageWrapper';
import Flex from '@/components/Flex';
import { convertFileToImageFile } from '@/libs/utils';
import ImageFile from '@/types/image.file';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import TimeStampLayer from '../../_containers/TimeStampLayer';
import Upload from '/public/icons/upload.svg';

function ImageUploadContainer() {
  const [file, setFile] = useState<ImageFile | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const acceptedFile = acceptedFiles.pop();
    if (!acceptedFile) return;

    const fileWithPreviewUrl: ImageFile = convertFileToImageFile(acceptedFile);

    setFile(fileWithPreviewUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
  });

  return (
    <ImageBackgroundWrapper // 컴포넌트 이름 정의
      {...getRootProps({ role: 'button' })}
      className={clsx(
        'row-start-3',
        'row-span-8',
        'mt-7',
        `justify-${file ? 'start' : 'center'}`,
      )}
      background={file ? 'paper' : 'none'}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>파일을 여기에 드롭하세요...</p>
      ) : file ? (
        <ImageWrapper>
          <Image
            src={file.previewUrl}
            alt={'Uploaded image'}
            className='object-cover drop-shadow-lg'
            fill
          />
          <TimeStampLayer date={file.date} />
        </ImageWrapper>
      ) : (
        <Flex className='w-[20%]'>
          <Upload />
        </Flex>
      )}
    </ImageBackgroundWrapper>
  );
}

export default ImageUploadContainer;

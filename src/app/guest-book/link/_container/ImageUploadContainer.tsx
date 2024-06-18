'use client';
import ImageBackgroundWrapper from '@/app/guest-book/_containers/ImageBackgroundWrapper';
import Flex from '@/components/Flex';
import { convertFileToImageFile } from '@/libs/utils';
import ImageFile from '@/types/image.file';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageWrapper from '../../_containers/ImageWrapper';
import TimeStampLayer from '../../_containers/TimeStampLayer';
import Upload from '/public/icons/upload.svg';

function ImageUploadContainer({
  file,
  setFile,
}: {
  file: ImageFile | null;
  setFile: (file: ImageFile | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const acceptedFile = acceptedFiles.pop();
      if (!acceptedFile) return;

      const fileWithPreviewUrl: ImageFile =
        convertFileToImageFile(acceptedFile);

      setFile(fileWithPreviewUrl);
    },
    [setFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
  });

  return (
    <Flex className='justify-center row-start-3 mt-7 mb-7 row-span-8'>
      <ImageBackgroundWrapper
        id='image-upload-container'
        {...getRootProps({ role: 'button' })}
        className={clsx(`justify-${file ? 'start' : 'center'}`)}
        background={file ? 'paper' : 'none'}
        ref={containerRef}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>파일을 여기에 드롭하세요...</p>
        ) : file ? (
          <ImageWrapper>
            <Image
              src={file.previewUrl}
              alt={'Uploaded image'}
              className='object-cover drop-shadow-lg w-full, h-full'
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
    </Flex>
  );
}

export default ImageUploadContainer;

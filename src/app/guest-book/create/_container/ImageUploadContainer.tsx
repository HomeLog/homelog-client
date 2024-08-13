'use client';

import ImageBackgroundWrapper from '@/app/guest-book/_containers/ImageBackgroundWrapper';
import Flex from '@/components/Flex';
import { mergeClassNames } from '@/libs/utils';
import { Heic2anyFunction } from '@/types/heic2any.type';
import TImageFile from '@/types/image.file';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageWrapper from '../../_containers/ImageWrapper';
import TimeStampLayer from '../../_containers/TimeStampLayer';
import { createImageFile } from '../../_utils/image.util';
import Upload from '/public/icons/upload.svg';

function ImageUploadContainer({
  file,
  setFile,
  className,
}: {
  file: TImageFile | null;
  setFile: (file: TImageFile | null) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heic2any, setHeic2any] = useState<Heic2anyFunction | null>(null);

  useEffect(() => {
    import('heic2any').then((module) =>
      setHeic2any(module.default as Heic2anyFunction),
    );
  }, []);

  const convertFileToImageFile = useCallback(
    async (file: File): Promise<TImageFile> => {
      let convertedFile = file;
      if (file.type === 'image/heic' || file.type === 'image/heif') {
        if (!heic2any) return createImageFile(file);

        try {
          const blob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.7,
          });
          if (!(blob instanceof Blob)) {
            throw new Error('Conversion failed: Result is not a Blob');
          }
          convertedFile = new File(
            [blob],
            file.name.replace(/\.(heic|heif)$/i, '.jpg'),
            {
              type: 'image/jpeg',
              lastModified: file.lastModified,
            },
          );
        } catch (error) {
          throw error;
        }
      }
      return createImageFile(convertedFile);
    },
    [heic2any],
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const acceptedFile = acceptedFiles.pop();
      if (!acceptedFile) return;
      try {
        const fileWithPreviewUrl = await convertFileToImageFile(acceptedFile);
        setFile(fileWithPreviewUrl);
      } catch (error) {
        console.error('File processing error:', error);
      }
    },
    [setFile, convertFileToImageFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
      'image/heic': [],
      'image/heif': [],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <Flex
      className={mergeClassNames(
        'justify-center row-start-3 mt-7 mb-7 row-span-8',
        className,
      )}
    >
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
              className='object-cover w-full h-full drop-shadow-lg'
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

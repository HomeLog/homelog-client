'use client';

import ImageBackgroundWrapper from '@/app/guest-book/_containers/ImageBackgroundWrapper';
import Flex from '@/components/Flex';
import { mergeClassNames } from '@/libs/utils';
import TImageFile from '@/types/image.file';
import clsx from 'clsx';
import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageWrapper from '../../_containers/ImageWrapper';
import TimeStampLayer from '../../_containers/TimeStampLayer';
import { convertFileToImageFile } from '../../_utils/image.util';
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

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const acceptedFile = acceptedFiles[0];
      if (!acceptedFile) return;
      try {
        const fileWithPreviewUrl = await convertFileToImageFile(acceptedFile);
        setFile(fileWithPreviewUrl);
      } catch (error) {}
    },
    [setFile],
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
          <ImageWrapper
            style={{
              backgroundImage: `url(${file.previewUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
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

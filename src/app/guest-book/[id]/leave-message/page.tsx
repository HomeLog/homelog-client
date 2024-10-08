'use client';

import {
  getGuestBookById,
  leaveMessageToGuestBook,
} from '@/api/guestbook/guestbook.api';
import Flex from '@/components/Flex';
import { useEnvVariablesClientConfig } from '@/contexts/envVariablesClient.context';
import { showToast } from '@/libs/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ButtonContainer from '../../_containers/ButtonContainer';
import ContentsTextWrapper from '../../_containers/ContentsTextWrapper';
import ImageBackgroundWrapper from '../../_containers/ImageBackgroundWrapper';

function NewGuestBookPage({ params }: { params: { id: string } }) {
  const [caption, setCaption] = useState('');
  const config = useEnvVariablesClientConfig();
  const router = useRouter();

  const { data: guestBook, isLoading } = useQuery({
    queryKey: ['guestBook', params.id],
    queryFn: () => getGuestBookById(params.id),
  });

  useEffect(() => {
    if (isLoading) return;

    if (!guestBook) {
      showToast.error('존재하지 않는 방명록입니다.');
      router.push('/');
    }

    if (guestBook?.content) {
      showToast.info('이미 작성된 방명록입니다.');
      router.push(`/guest-book/${params.id}`);
    }
  }, [isLoading, guestBook, router, params.id]);

  const guestbookImageSrc = guestBook?.imageKey
    ? `${config.NEXT_PUBLIC_API_IMAGE_SERVER_URL}/raw/${guestBook?.imageKey}`
    : '/images/background.png';

  const { mutateAsync: leaveMessage } = useMutation({
    mutationFn: () => leaveMessageToGuestBook(params.id, caption),
  });

  const handleButtonClick = async () => {
    if (!caption) return showToast.error('한 줄 기록을 작성해주세요.');

    await leaveMessage();

    router.push(`/guest-book/${params.id}`);
  };

  return (
    !isLoading && (
      <Flex className='justify-center flex-grow w-full gap-6 px-10 py-10'>
        <p className='w-full sm:text-md md:text-lg lg:text-xl font-semibold text-center text-[#999999]'>
          {guestBook?.hostNickname}님의 집에 방문해주셔서 감사합니다
        </p>
        <ImageBackgroundWrapper
          className='relative overflow-hidden'
          background={'none'}
          border={false}
        >
          <Image
            src={guestbookImageSrc}
            fill
            alt={clsx(guestBook?.hostNickname, '님의 사진')}
            className='object-contain drop-shadow-lg'
          />
        </ImageBackgroundWrapper>
        <ContentsTextWrapper value={caption} setValue={setCaption} />
        <ButtonContainer
          buttonText='작성완료'
          className='justify-start w-full row-start-11'
          onClick={handleButtonClick}
        />
      </Flex>
    )
  );
}

export default NewGuestBookPage;

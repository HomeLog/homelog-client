'use client';

import { getGuestBookById } from '@/api/guestbook/guestbook.api';
import Flex from '@/components/Flex';
import Grid from '@/components/Grid';
import useAuth from '@/contexts/auth.context';
import { useEnvVariablesClientConfig } from '@/contexts/envVariablesClient.context';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import ContentsCaption from '../_containers/ContentsCaption';
import ContentsInfo from '../_containers/ContentsInfo';
import ImageBackgroundWrapper from '../_containers/ImageBackgroundWrapper';
import MenuBar from '../_containers/MenuBar';

function DetailsPage({ params }: { params: { id: string } }) {
  const { loading, signedIn } = useAuth();
  const config = useEnvVariablesClientConfig();

  const { data } = useQuery({
    queryKey: ['guestbook'],
    queryFn: () => getGuestBookById(params.id),
  });

  const guestbookImageSrc = `${config.NEXT_PUBLIC_API_IMAGE_SERVER_URL}/raw/${data?.imageKey}`;

  const createdAtString = data
    ? new Date(data.createdAt)
        .toLocaleDateString('ko-KR')
        .replace(/\./g, '')
        .replace(/ /g, '.')
    : '';

  return (
    data && (
      <Grid className='justify-around w-full h-full grid-cols-1 px-10 pb-5 grid-rows-12'>
        <Flex className='flex-grow w-full row-start-1 py-10 row-end-12 gap-y-4'>
          <ContentsInfo
            writer={data.visitorName as string}
            date={createdAtString}
          />
          <ImageBackgroundWrapper
            className='relative overflow-hidden'
            background={'none'}
            border={false}
          >
            <Image
              src={guestbookImageSrc}
              fill
              alt={clsx(data.visitorName, '님의 사진')}
              className='object-contain drop-shadow-lg'
            />
          </ImageBackgroundWrapper>
          <ContentsCaption
            className='w-full row-span-2 mt-1 row-start-11'
            caption={data.content as string}
          />
        </Flex>
        {!loading && signedIn && (
          <MenuBar className='h-full row-span-1 row-start-12' id={params.id} />
        )}
      </Grid>
    )
  );
}

export default DetailsPage;

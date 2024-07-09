import { getGuestBookById } from '@/api/guestbook/guestbook.api';
import Flex from '@/components/Flex';
import Grid from '@/components/Grid';
import { TAccessToken } from '@/types/user.type';
import clsx from 'clsx';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ContentsCaption from '../_containers/ContentsCaption';
import ContentsInfo from '../_containers/ContentsInfo';
import ImageBackgroundWrapper from '../_containers/ImageBackgroundWrapper';
import MenuBar from '../_containers/MenuBar';

async function DetailsPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken') as TAccessToken;

  if (!accessToken) redirect('/users');

  const { visitorName, imageUrl, createdAt, content } = await getGuestBookById(
    params.id,
    accessToken,
  ).catch(() => redirect('/'));

  const createdAtString = new Date(createdAt)
    .toLocaleDateString('ko-KR')
    .replace(/\./g, '')
    .replace(/ /g, '.');

  return (
    <Grid className='justify-around w-full h-full grid-cols-1 px-10 pb-5 grid-rows-12'>
      <Flex className='flex-grow w-full row-start-1 py-10 row-end-12 gap-y-4'>
        <ContentsInfo writer={visitorName as string} date={createdAtString} />
        <ImageBackgroundWrapper
          className='relative overflow-hidden'
          background={'none'}
          border={false}
        >
          <Image
            src={imageUrl ?? ''}
            fill
            alt={clsx(visitorName, '님의 사진')}
            className='object-contain drop-shadow-lg'
          />
        </ImageBackgroundWrapper>
        <ContentsCaption
          className='w-full row-span-2 mt-1 row-start-11'
          caption={content as string}
        />
      </Flex>
      <MenuBar className='h-full row-span-1 row-start-12' id={params.id} />
    </Grid>
  );
}

export default DetailsPage;

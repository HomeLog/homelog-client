import { getGuestBookById } from '@/api/guestbook/guestbook.api';
import Flex from '@/components/Flex';
import { TAccessToken } from '@/types/user.type';
import clsx from 'clsx';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ButtonContainer from '../../_containers/ButtonContainer';
import ContentsTextWrapper from '../../_containers/ContentsTextWrapper';
import ImageBackgroundWrapper from '../../_containers/ImageBackgroundWrapper';
import ImageWrapper from '../../_containers/ImageWrapper';
import TimeStampLayer from '../../_containers/TimeStampLayer';

async function NewGuestBookPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken') as TAccessToken;

  if (!accessToken) redirect('/users');

  const { hostNickname, imageUrl, createdAt } = await getGuestBookById(
    params.id,
    accessToken,
  );

  const createdAtDate = new Date(createdAt)
    .toLocaleDateString('ko-KR')
    .replace(/\./g, '')
    .replace(/ /g, '.');

  return (
    <Flex className='justify-center flex-grow w-full gap-6 px-10 py-10'>
      <p className='w-full sm:text-md md:text-lg lg:text-xl font-semibold text-center text-[#999999]'>
        {hostNickname}님의 집에 방문해주셔서 감사합니다
      </p>
      <ImageBackgroundWrapper>
        <ImageWrapper>
          <Image
            src={imageUrl ?? ''}
            fill
            alt={clsx(hostNickname, '님의 사진')}
            className='object-cover drop-shadow-lg'
          />
          <TimeStampLayer date={createdAtDate} />
        </ImageWrapper>
      </ImageBackgroundWrapper>
      <ContentsTextWrapper />
      <ButtonContainer
        buttonText='작성완료'
        className='justify-start w-full row-start-11'
      />
    </Flex>
  );
}

export default NewGuestBookPage;

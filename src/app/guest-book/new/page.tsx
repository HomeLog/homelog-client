import Flex from '@/components/Flex';
import { getCreatedAt } from '@/libs/utils';
import clsx from 'clsx';
import Image from 'next/image';
import path from 'path';
import ButtonContainer from '../_containers/ButtonContainer';
import ContentsTextWrapper from '../_containers/ContentsTextWrapper';
import ImageBackgroundWrapper from '../_containers/ImageBackgroundWrapper';
import ImageWrapper from '../_containers/ImageWrapper';
import TimeStampLayer from '../_containers/TimeStampLayer';

async function NewGuestBookPage() {
  const { nickname, imageUrl } = {
    nickname: '상똥',
    imageUrl: '/images/example.jpg',
  };

  const createdAt = new Date(
    await getCreatedAt(path.join(process.cwd(), '/public', imageUrl)),
  )
    .toLocaleDateString('ko-KR')
    .replace(/\./g, '')
    .replace(/ /g, '.');

  return (
    <Flex className='justify-center flex-grow w-full gap-6 px-10 py-10'>
      <p className='w-full sm:text-md md:text-lg lg:text-xl font-semibold text-center text-[#999999]'>
        {nickname}님의 집에 방문해주셔서 감사합니다
      </p>
      <ImageBackgroundWrapper>
        <ImageWrapper>
          <Image
            src={imageUrl}
            fill
            alt={clsx(nickname, '님의 사진')}
            className='object-cover drop-shadow-lg'
          />
          <TimeStampLayer date={createdAt} />
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

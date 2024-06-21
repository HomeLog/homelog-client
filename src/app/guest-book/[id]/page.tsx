import Flex from '@/components/Flex';
import Grid from '@/components/Grid';
import { getCreatedAt, mergeClassNames } from '@/libs/utils';
import clsx from 'clsx';
import Image from 'next/image';
import path from 'path';
import ContentsCaption from '../_containers/ContentsCaption';
import ContentsInfo from '../_containers/ContentsInfo';
import ImageBackgroundWrapper from '../_containers/ImageBackgroundWrapper';
import ImageWrapper from '../_containers/ImageWrapper';
import MenuBar from '../_containers/MenuBar';
import TimeStampLayer from '../_containers/TimeStampLayer';

async function DetailsPage() {
  const [writer, date, caption, imageUrl] = [
    '박상희',
    '2024년 5월 9일',
    '바다 보면서 와인 마시기! 즐거운 하루였다 ㅎㅎ 또 놀러와야지 잘 놀다 갑니다!',
    '/images/example.jpg',
  ];

  const imageProps = {
    src: imageUrl,
    alt: clsx(writer, '님의 사진'),
    fill: true,
    className: mergeClassNames('rounded-lg object-cover'),
  };

  const createdAt = new Date(
    await getCreatedAt(path.join(process.cwd(), '/public', imageProps.src)),
  )
    .toLocaleDateString('ko-KR')
    .replace(/\./g, '')
    .replace(/ /g, '.');

  return (
    <Grid className='justify-around w-full h-full px-10 pb-5 grid-rows-12'>
      <Flex className='flex-grow row-start-1 py-10 row-end-12 gap-y-4'>
        <ContentsInfo writer={writer} date={date} />
        <ImageBackgroundWrapper>
          <ImageWrapper>
            <Image
              src={imageUrl}
              fill
              alt={`${writer}님의 사진`}
              className='object-cover drop-shadow-lg'
            />
            <TimeStampLayer date={createdAt} />
          </ImageWrapper>
        </ImageBackgroundWrapper>
        <ContentsCaption
          className='row-span-2 mt-1 row-start-11'
          caption={caption}
        />
      </Flex>
      <MenuBar className='h-full row-span-1 row-start-12' />
    </Grid>
  );
}

export default DetailsPage;

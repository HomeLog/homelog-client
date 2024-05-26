import { mergeClassNames } from '@/libs/utils';
import clsx from 'clsx';
import Image from 'next/image';
import Flex from '../../../components/Flex';
import ContentsCaption from '../_containers/ContentsCaption';
import ContentsImageWrapper from '../_containers/ContentsImageWrapper';
import ContentsInfo from '../_containers/ContentsInfo';
import MenuBar from '../_containers/MenuBar';

function DetailsPage() {
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

  return (
    <>
      <Flex>
        <ContentsInfo writer={writer} date={date} />
        <ContentsImageWrapper>
          <Image {...imageProps} alt={imageProps.alt} />
        </ContentsImageWrapper>
        <ContentsCaption caption={caption} />
      </Flex>
      <MenuBar />
    </>
  );
}

export default DetailsPage;

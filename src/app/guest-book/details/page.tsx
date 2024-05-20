import { mergeClassNames } from '@/libs/utils';
import { FC } from 'react';
import ContentsCaption from '../_containers/ContentsCaption';
import ContentsContainer from '../_containers/ContentsContainer';
import ContentsImageWrapper from '../_containers/ContentsImageWrapper';
import ContentsInfo from '../_containers/ContentsInfo';
import MenuBar from '../_containers/MenuBar';

interface DetailsProps {}

const DetailsPage: FC<DetailsProps> = () => {
  const [writer, date, caption, imageUrl] = [
    '박상희',
    '2024년 5월 9일',
    '바다 보면서 와인 마시기! 즐거운 하루였다 ㅎㅎ 또 놀러와야지 잘 놀다 갑니다!',
    '/images/example.jpg',
  ];

  const imageProps = {
    src: imageUrl,
    alt: 'Alt is here',
    width: 100,
    height: 100,
    className: mergeClassNames('rounded-lg shadow-lg shadow-[#DADADA]'),
  };

  return (
    <>
      <ContentsContainer>
        <ContentsInfo writer={writer} date={date} />
        <ContentsImageWrapper {...imageProps} />
        <ContentsCaption caption={caption} />
      </ContentsContainer>
      <MenuBar />
    </>
  );
};

export default DetailsPage;

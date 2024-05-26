import Button from '@/components/Button';
import clsx from 'clsx';
import Image from 'next/image';
import Flex from '../../../components/Flex';
import ContentsImageWrapper from '../_containers/ContentsImageWrapper';
import ContentsTextWrapper from '../_containers/ContentsTextWrapper';
function NewGuestBookPage() {
  const { nickname, imageUrl } = {
    nickname: '상똥',
    imageUrl: '/images/example.jpg',
  };

  return (
    <Flex className='gap-8'>
      <p className='w-full text-xl font-semibold text-center text-[#999999]'>
        {nickname}님의 집에 방문해주셔서 감사합니다
      </p>
      <ContentsImageWrapper>
        <Image
          src={imageUrl}
          fill={true}
          alt={clsx(nickname, '님의 사진')}
          className='rounded-lg drop-shadow-lg'
        />
      </ContentsImageWrapper>
      <ContentsTextWrapper />
      <Button intent='primary' className={'button button--primary'}>
        작성 완료
      </Button>
    </Flex>
  );
}

export default NewGuestBookPage;

import Flex from '@/components/Flex';
import clsx from 'clsx';

type ContentsInfoProps = {
  writer: string;
  date: string;
};

export default function ContentsInfo({ writer, date }: ContentsInfoProps) {
  return (
    <Flex className='items-start justify-end w-full h-auto'>
      <p className={clsx('font-bold')}>{writer}</p>
      <p className={clsx('text-[#5A5A5A]')}>{date}</p>
    </Flex>
  );
}

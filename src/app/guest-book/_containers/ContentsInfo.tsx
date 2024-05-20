import { mergeClassNames } from '@/libs/utils';

type ContentsInfoProps = {
  writer: string;
  date: string;
};

export default function ContentsInfo({ writer, date }: ContentsInfoProps) {
  return (
    <div className={mergeClassNames('gap-1')}>
      <p className={mergeClassNames('font-bold')}>{writer}</p>
      <p className={mergeClassNames('text-[#5A5A5A]')}>{date}</p>
    </div>
  );
}

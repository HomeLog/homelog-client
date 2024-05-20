import { mergeClassNames } from '@/libs/utils';
import Image, { ImageProps } from 'next/image';

function ContentsImageWrapper({
  src,
  alt,
  width,
  height,
  className,
}: ImageProps) {
  return (
    <div className={mergeClassNames('w-[100%] h-[auto] flex justify-center')}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        layout='responsive'
        objectFit='contain'
      />
    </div>
  );
}

export default ContentsImageWrapper;

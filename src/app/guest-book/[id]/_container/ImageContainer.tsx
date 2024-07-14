import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';

const imageContainerVariants = cva('', {
  variants: {
    intent: {
      primary: 'w-full relative overflow-hidden',
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
});

interface imageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imageContainerVariants> {
  imageAlt: string;
  imageSrc: string;
}

function ImageContainer({
  className,
  imageSrc,
  imageAlt,
  ...props
}: imageContainerProps) {
  return (
    <div
      className={mergeClassNames(imageContainerVariants, className)}
      {...props}
    >
      <Image
        src={imageSrc}
        fill
        alt={imageAlt}
        className='object-contain drop-shadow-lg'
      />
    </div>
  );
}

export default ImageContainer;

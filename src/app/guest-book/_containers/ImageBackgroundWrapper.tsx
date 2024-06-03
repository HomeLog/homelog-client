import Flex from '@/components/Flex';
import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

const imageBackgroundWrapperVariants = cva('', {
  variants: {
    variant: {
      primary:
        'w-full aspect-2/3 rounded justify-start py-[13%] px-[5%] items-center',
      secondary: '',
    },
    background: {
      paper: 'bg-paper-texture bg-cover bg-center',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    background: 'paper',
  },
});

interface ImageBackgroundWrapperProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imageBackgroundWrapperVariants> {
  children: React.ReactNode;
}

const ImageBackgroundWrapper = forwardRef<
  HTMLDivElement,
  ImageBackgroundWrapperProps
>(({ children, variant, className, background, ...props }, ref) => {
  return (
    <Flex
      ref={ref}
      border={true}
      className={mergeClassNames(
        imageBackgroundWrapperVariants({ variant, background, className }),
      )}
      {...props}
    >
      {children}
    </Flex>
  );
});

ImageBackgroundWrapper.displayName = 'ImageBackgroundWrapper';

export default ImageBackgroundWrapper;

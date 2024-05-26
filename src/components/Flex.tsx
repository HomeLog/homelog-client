import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const flexVariants = cva([''], {
  variants: {
    direction: {
      vertical:
        'flex flex-col items-start justify-center w-full flex-grow gap-y-7 px-10',
    },
  },
  defaultVariants: {
    direction: 'vertical',
  },
});

interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

function Flex({ children, direction, className, ...props }: FlexProps) {
  const combinedClassName = mergeClassNames(
    flexVariants({ direction, className }),
  );

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}

export default Flex;

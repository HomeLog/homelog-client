import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

const flexVariants = cva([''], {
  variants: {
    direction: {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row',
    },
    position: {
      center: 'items-center justify-center',
    },
    border: {
      true: 'border-solid border-2 border-[#DADADA]',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    position: 'center',
    border: false,
  },
});

interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ children, border, direction, position, className, ...props }, ref) => {
    const combinedClassName = mergeClassNames(
      flexVariants({ direction, position, border, className }),
    );

    return (
      <div className={combinedClassName} {...props}>
        {children}
      </div>
    );
  },
);

Flex.displayName = 'Flex';

export default Flex;

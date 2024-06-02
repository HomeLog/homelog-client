import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, forwardRef, HTMLAttributes, Ref } from 'react';

const gridVariants = cva('grid', {
  variants: {
    variant: {
      primary: '',
      secondary: '',
    },
    size: {
      sm: '',
      md: '',
      lg: 'w-full h-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
});

interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  rows?: number;
  cols?: number;
}

const Grid: FC<GridProps> = forwardRef<HTMLDivElement, GridProps>(
  ({ children, className, ...props }, ref: Ref<HTMLDivElement>) => {
    return (
      <div className={mergeClassNames(gridVariants({ className }))} {...props}>
        {children}
      </div>
    );
  },
);

Grid.displayName = 'Grid';

export default Grid;

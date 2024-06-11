import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';

const buttonVariants = cva('', {
  variants: {
    intent: {
      primary:
        'bg-[#D9D9D9]/50 text-white hover:bg-[#999999] hover:bg-[#999999]/50 rounded-[10px]',
      secondary: 'bg-black text-white',
      none: '',
    },
    size: {
      lg: 'text-xs w-1/4 px-3 py-2',
    },
  },

  defaultVariants: {
    intent: 'primary',
    size: 'lg',
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const HomeButton: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { intent, size, className, ...props },
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={ref}
        className={mergeClassNames(buttonVariants({ intent, size, className }))}
        {...props}
      />
    );
  },
);

HomeButton.displayName = 'HomeButton';

export default HomeButton;

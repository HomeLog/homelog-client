import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';

const buttonVariants = cva('', {
  variants: {
    intent: {
      primary: 'bg-[#DADADA] text-white hover:bg-[#999999]',
      secondary: 'bg-black text-white',
      transparent:
        'bg-white/30 text-white hover:bg-[#999999] hover:bg-[#999999]/50',
      none: '',
    },
    size: {
      sm: 'text-xs w-1/4 px-3 py-2',
      md: 'text-md',
      lg: 'text-xl w-full px-5 py-4 h-14',
    },
    rounded: {
      sm: 'rounded-[5px]',
      md: 'rounded-[10px]',
      lg: 'rounded-[15px]',
    },
  },

  defaultVariants: {
    intent: 'primary',
    rounded: 'sm',
    size: 'lg',
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { intent, size, className, rounded, ...props },
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={ref}
        className={mergeClassNames(
          buttonVariants({ intent, size, rounded, className }),
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export default Button;

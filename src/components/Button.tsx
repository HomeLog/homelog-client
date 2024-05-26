import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';

const buttonVariants = cva('', {
  variants: {
    intent: {
      primary: 'bg-[#DADADA] text-white hover:bg-[#999999] rounded-[5px]',
      secondary: 'bg-black text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-xl w-full px-5 py-4',
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

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
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

Button.displayName = 'Button';

export default Button;

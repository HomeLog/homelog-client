import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';

const buttonVariants = cva('', {
  variants: {
    intent: {
      primary: 'bg-[rgba(0,0,0,0)] text-white',
      secondary: 'bg-black text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
  },

  defaultVariants: {
    intent: 'primary',
    size: 'md',
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

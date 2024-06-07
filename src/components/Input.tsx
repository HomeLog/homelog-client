import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes } from 'react';

const inputVariants = cva('', {
  variants: {
    variant: {
      primary:
        'text-[#999999] w-full focus:outline-none border-b-[1px] border-[#DADADA] pb-2 h-auto',
      error: '',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = ({ variant, size, className, ...props }: InputProps) => {
  return (
    <input
      className={mergeClassNames(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export default Input;

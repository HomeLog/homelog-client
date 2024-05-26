import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, TextareaHTMLAttributes } from 'react';

const textAreaVariants = cva('', {
  variants: {
    variant: {
      primary: `border
                border-solid
                border-gray-300
                rounded-[5px]
                text-[#999999]
                focus:outline-none
                focus:border-[#999999]
                overflow-y-scroll
                scrollbar-hide`,
      error: `border
                border-solid
                border-red-500
                rounded-[5px]
                text-[#999999]
                focus:outline-none
                focus:border-red-500`,
    },
    resize: {
      none: 'resize-none',
      both: 'resize-both',
    },
    size: {
      sm: 'p-2',
      md: 'p-3',
      lg: 'py-[24px] px-[25px] w-full text-md',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
    resize: 'none',
  },
});

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant, size, className, ...props }, ref) => {
    const combinedClassName = mergeClassNames(
      textAreaVariants({ variant, size, className }),
    );

    return <textarea ref={ref} className={combinedClassName} {...props} />;
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;

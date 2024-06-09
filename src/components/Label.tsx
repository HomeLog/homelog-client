import { mergeClassNames } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { FC, forwardRef, LabelHTMLAttributes } from 'react';

const labelVariants = cva('', {
  variants: {
    intent: {
      warn: 'text-red-500',
    },
    size: {
      sm: 'text-sm',
    },
  },
  defaultVariants: {
    intent: 'warn',
    size: 'sm',
  },
});

interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label: FC<LabelProps> = forwardRef<HTMLLabelElement, LabelProps>(
  ({ intent, size, className, children }, ref: React.Ref<HTMLLabelElement>) => {
    return (
      <label
        className={mergeClassNames(labelVariants({ intent, size }), className)}
      >
        {children}
      </label>
    );
  },
);

Label.displayName = 'Label';

export default Label;

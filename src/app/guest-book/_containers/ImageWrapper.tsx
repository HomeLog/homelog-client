import { mergeClassNames } from '@/libs/utils';
import { forwardRef, HTMLAttributes } from 'react';

interface ImageWrapperProps extends HTMLAttributes<HTMLDivElement> {}

const ImageWrapper = forwardRef<HTMLDivElement, ImageWrapperProps>(
  ({ children, className, ...props }, ref) => (
    <div
      className={mergeClassNames('relative flex w-full aspect-2/3', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  ),
);

ImageWrapper.displayName = 'ImageWrapper';
export default ImageWrapper;

import { mergeClassNames } from '@/libs/utils';
import Image from 'next/image';
import loadingSrc from '../../public/icons/loading.svg?url';
import Button from './Button';

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <Button
      intent='none'
      className={mergeClassNames('animate-spin', className)}
      size='md'
    >
      <Image src={loadingSrc} alt='home' fill className='object-contain' />
    </Button>
  );
}

export default LoadingSpinner;

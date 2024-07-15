import Image from 'next/image';
import loadingSrc from '../../public/icons/loading.svg?url';
import Button from './Button';

function LoadingSpinner() {
  return (
    <Button intent='none' className='animate-spin' size='md'>
      <Image src={loadingSrc} alt='home' fill className='object-contain' />
    </Button>
  );
}

export default LoadingSpinner;

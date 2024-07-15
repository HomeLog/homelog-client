import Flex from '@/components/Flex';
import LoadingSpinner from '@/components/LoadingSpinner';

const LoadingSpinnerContainer = () => {
  return (
    <Flex className='relative items-center justify-center w-full h-full py-12'>
      <LoadingSpinner />
    </Flex>
  );
};

export default LoadingSpinnerContainer;

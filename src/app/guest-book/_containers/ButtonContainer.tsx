import Button from '@/components/Button';
import Flex from '@/components/Flex';
import { mergeClassNames } from '@/libs/utils';

function ButtonContainer({
  buttonText,
  className,
}: {
  buttonText: string;
  className?: string;
}) {
  return (
    <Flex className={mergeClassNames(className)}>
      <Button intent='primary'>{buttonText}</Button>
    </Flex>
  );
}

export default ButtonContainer;

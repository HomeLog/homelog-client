import Button from '@/components/Button';
import Flex from '@/components/Flex';
import { mergeClassNames } from '@/libs/utils';

function ButtonContainer({
  buttonText,
  className,
  onClick,
}: {
  buttonText: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Flex className={mergeClassNames(className)}>
      <Button intent='primary' onClick={onClick}>
        {buttonText}
      </Button>
    </Flex>
  );
}

export default ButtonContainer;

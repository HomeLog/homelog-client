import Button from '@/components/Button';
import Flex from '@/components/Flex';
import { mergeClassNames } from '@/libs/utils';

function ButtonContainer({
  buttonText,
  className,
  type = 'button',
  onClick,
}: {
  buttonText: string;
  className?: string;
  type?: 'submit' | 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Flex className={mergeClassNames(className)}>
      <Button intent='primary' onClick={onClick} type={type}>
        {buttonText}
      </Button>
    </Flex>
  );
}

export default ButtonContainer;

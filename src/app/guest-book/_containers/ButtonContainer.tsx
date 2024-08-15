import Button from '@/components/Button';
import Flex from '@/components/Flex';
import { mergeClassNames } from '@/libs/utils';

function ButtonContainer({
  buttonText,
  className,
  type = 'button',
  disabled = false,
  onClick,
  children,
}: {
  buttonText: string;
  className?: string;
  type?: 'submit' | 'button';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}) {
  return (
    <Flex
      className={mergeClassNames(className, 'relative')}
      direction='vertical'
    >
      <Button
        intent='primary'
        className='w-full'
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {buttonText}
      </Button>
      {children}
    </Flex>
  );
}

export default ButtonContainer;

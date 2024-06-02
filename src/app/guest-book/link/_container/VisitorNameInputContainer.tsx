import Flex from '@/components/Flex';
import Input from '@/components/Input';

export default function VisitorNameInputContainer({
  placeholder,
}: {
  placeholder: string;
}) {
  return (
    <Flex className='flex-row items-end row-span-2 row-start-1'>
      <Input placeholder={placeholder} />
      {/* <Input placeholder={placeholder} className='pb-2 h-min' /> */}
    </Flex>
  );
}

import Button from '@/components/Button';
import { mergeClassNames } from '@/libs/utils';
import Image from 'next/image';

const buttonProps = [
  {
    src: '/icons/home.svg',
    alt: 'Home Icon',
    width: 200,
    height: 200,
  },
  {
    src: '/icons/edit.svg',
    alt: 'Edit Icon',
    width: 100,
    height: 100,
  },
  {
    src: '/icons/delete.svg',
    alt: 'Delete Icon',
    width: 100,
    height: 100,
  },
];

function MenuBar() {
  return (
    <div
      className={mergeClassNames(
        'sticky inset-0 w-full h-auto grid grid-cols-[10%_10%_10%] justify-around items-end py-7',
      )}
    >
      {buttonProps.map((props, index) => (
        <Button size='sm' key={index}>
          <Image
            {...props}
            layout='responsive'
            objectFit='contain'
            alt={props.alt}
          />
        </Button>
      ))}
    </div>
  );
}

export default MenuBar;

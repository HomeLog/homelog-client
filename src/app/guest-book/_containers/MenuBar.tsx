import Button from '@/components/Button';
import { mergeClassNames } from '@/libs/utils';
import Image from 'next/image';
import deleteIcon from '/public/icons/delete.svg';
import editIcon from '/public/icons/edit.svg';
import homeIcon from '/public/icons/home.svg';

const buttonProps = [
  {
    src: homeIcon,
    alt: 'Home Icon',
    className: 'object-contain',
  },
  {
    src: editIcon,
    alt: 'Edit Icon',
    className: 'object-contain',
  },
  {
    src: deleteIcon,
    alt: 'Delete Icon',
    className: 'object-contain',
  },
];

function MenuBar() {
  return (
    <div
      className={mergeClassNames(
        'bg-inherit sticky inset-0 w-full h-auto grid grid-cols-[10%_10%_10%] justify-around items-end py-7',
      )}
    >
      {buttonProps.map((props, index) => (
        <Button size='sm' key={index}>
          <Image {...props} alt={props.alt} />
        </Button>
      ))}
    </div>
  );
}

export default MenuBar;

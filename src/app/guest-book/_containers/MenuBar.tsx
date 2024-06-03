'use client';

import Button from '@/components/Button';
import { mergeClassNames } from '@/libs/utils';
import Image from 'next/image';
import deleteIconSrc from '/public/icons/delete.svg?url';
import editIconSrc from '/public/icons/edit.svg?url';
import homeIconSrc from '/public/icons/home.svg?url';

function MenuBar({ className }: { className: string }) {
  return (
    <div
      className={mergeClassNames(
        'bg-inherit w-full grid grid-cols-[15%_15%_15%] px-9 justify-between items-center',
        className,
      )}
    >
      <div className='relative flex aspect-square'>
        <Button intent='none'>
          <Image src={homeIconSrc} alt='home' fill className='object-contain' />
        </Button>
      </div>
      <div className='relative flex aspect-square'>
        <Button intent='none'>
          <Image src={editIconSrc} alt='edit' fill className='object-contain' />
        </Button>
      </div>
      <div className='relative flex aspect-square'>
        <Button intent='none'>
          <Image
            src={deleteIconSrc}
            alt='delete'
            fill
            className='object-contain'
          />
        </Button>
      </div>
    </div>
  );
}

export default MenuBar;

'use client';

import Button from '@/components/Button';
import { mergeClassNames } from '@/libs/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import deleteIconSrc from '/public/icons/delete.svg?url';
import editIconSrc from '/public/icons/edit.svg?url';
import homeIconSrc from '/public/icons/home.svg?url';

// TODO: delete 기능 구현
function MenuBar({ className }: { className: string }) {
  const router = useRouter();

  const handleClickHome = () => {
    router.push('/');
  };

  const handleClickEdit = () => {
    router.push('/guest-book/create');
  };

  return (
    <div
      className={mergeClassNames(
        'bg-inherit w-full grid grid-cols-[15%_15%_15%] px-9 justify-between items-center',
        className,
      )}
    >
      <div className='relative flex aspect-square'>
        <Button intent='none' onClick={handleClickHome}>
          <Image src={homeIconSrc} alt='home' fill className='object-contain' />
        </Button>
      </div>
      <div className='relative flex aspect-square'>
        <Button intent='none' onClick={handleClickEdit}>
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

'use client';

import { deleteGuestBook } from '@/api/guestbook/guestbook.api';
import Button from '@/components/Button';
import { mergeClassNames } from '@/libs/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import deleteIconSrc from '/public/icons/delete.svg?url';
import editIconSrc from '/public/icons/edit.svg?url';
import homeIconSrc from '/public/icons/home.svg?url';

function MenuBar({ className, id }: { className: string; id?: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteGuestBook,
    onSuccess: () => {
      toast.success('삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['guestbooks'],
      });
      router.push('/');
    },
    onError: (error) => {
      toast.error('삭제 중 오류가 발생했습니다.');
    },
  });

  const handleClickHome = () => {
    router.push('/');
  };

  const handleClickEdit = () => {
    router.push(`/guest-book/${id}/edit`);
  };

  const handleClickDelete = () => {
    if (!id) return;

    deleteMutation(id);
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
        <Button intent='none' onClick={handleClickDelete}>
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

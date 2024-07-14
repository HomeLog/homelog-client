'use client';

import { editGuestBook, getGuestBookById } from '@/api/guestbook/guestbook.api';
import Flex from '@/components/Flex';
import useAuth from '@/contexts/auth.context';
import { showToast } from '@/libs/utils';
import TImageFile from '@/types/image.file';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ButtonContainer from '../../_containers/ButtonContainer';
import ContentsCaption from '../../_containers/ContentsCaption';
import ContentsInfo from '../../_containers/ContentsInfo';
import { processImage } from '../../_utils/image.util';
import ImageUploadContainer from '../../create/_container/ImageUploadContainer';

export default function GuestbookEditPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { loading, signedIn } = useAuth();

  useEffect(() => {
    if (loading === false && signedIn === false) {
      router.push('/users');
    }
  }, [loading, signedIn, router]);

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['guestbook', params.id],
    queryFn: () => getGuestBookById(params.id),
  });

  const { mutate: editGuestbook } = useMutation({
    mutationFn: (formData: FormData) => editGuestBook(params.id, formData),
    onSuccess: () => {
      showToast.success('방명록이 수정되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['guestbook'],
      });
      router.push(`/guest-book/${params.id}`);
    },
  });

  const [file, setFile] = useState<TImageFile | null>(null);

  if (!data) return;
  else if (
    !loading &&
    (!data?.visitorName || !data?.createdAt || !data?.content)
  ) {
    showToast.error('방명록 작성 후 이용해주세요.');
    return redirect(`/guest-book/${params.id}`);
  }

  const { visitorName, createdAt, content } = data;

  const createdAtString = new Date(createdAt)
    .toLocaleDateString('ko-KR')
    .replace(/\./g, '')
    .replace(/ /g, '.');

  async function handleButtonClick(event: any): Promise<void> {
    if (!file) return;

    const blob = await processImage();
    const formData = new FormData();
    formData.append('imageFile', blob);

    editGuestbook(formData);
  }

  return (
    data && (
      <Flex className='w-full h-full grid-cols-1 px-10 grid-rows-12'>
        <ContentsInfo writer={visitorName ?? ''} date={createdAtString} />
        <ImageUploadContainer
          className='w-full'
          file={file}
          setFile={setFile}
        />
        <ContentsCaption className='w-full mb-7' caption={content ?? ''} />
        <ButtonContainer
          buttonText='수정하기'
          className='justify-start w-full'
          onClick={handleButtonClick}
        />
      </Flex>
    )
  );
}

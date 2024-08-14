import api from '@/api';
import useAuth from '@/contexts/auth.context';
import { showToast } from '@/libs/utils';
import TImageFile from '@/types/image.file';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useGuestBookLink = () => {
  const { signedIn, loading } = useAuth();
  const [visitorName, setVisitorName] = useState('');
  const [file, setFile] = useState<TImageFile | null>(null);
  const router = useRouter();

  const shareUrl = async (url: string) => {
    await navigator.share({
      title: '방명록 작성 링크 공유하기',
      text: '방명록 작성 링크 공유하기',
      url: url,
    });
  };

  const { mutate: createLink } = useMutation({
    mutationFn: (formData: FormData) => api.guestbook.createLink(formData),
    onSuccess: (data) => {
      const newLink = `${window.location.origin}/guest-book/${data.id}/leave-message`;
      router.push(newLink);
      showToast.success('방명록 링크 생성이 완료되었습니다.');
      if (typeof navigator.share === 'function') {
        shareUrl(newLink);
      } else {
        showToast.info('공유 기능이 지원되지 않는 환경입니다.');
      }
      return newLink;
    },
    onError: () => {
      showToast.error('방명록 링크 생성이 실패했습니다.');
    },
  });

  useEffect(() => {
    if (!signedIn && !loading) {
      showToast.error('로그인 후 이용해주세요!');
      router.push('/users');
    }
  }, [signedIn, router, loading]);

  return { visitorName, setVisitorName, file, setFile, createLink };
};

export default useGuestBookLink;

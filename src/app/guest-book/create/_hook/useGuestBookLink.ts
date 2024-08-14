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

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const { mutate: createLink } = useMutation({
    mutationFn: (formData: FormData) => api.guestbook.createLink(formData),
    onSuccess: (data) => {
      const newLink = `/guest-book/${data.id}/leave-message`;
      router.push(newLink);
      showToast.success('방명록 링크 생성이 완료되었습니다.');
      copyToClipboard(`${window.location.origin}${newLink}`);
      showToast.success('방명록 링크 복사가 완료되었습니다.');
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

'use client';

import api from '@/api';
import { showToast } from '@/libs/utils';
import TImageFile from '@/types/image.file';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

type CreateLinkDto = {
  visitorName: string;
  imageKey: string;
};

type UploadImageParams = {
  presignedUrl: string;
  imageFile: File;
};

const useGuestBookLink = () => {
  const [visitorName, setVisitorName] = useState('');
  const [file, setFile] = useState<TImageFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const shareUrl = useCallback(async (url: string) => {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: '방명록 작성 링크 공유하기',
          text: '방명록 작성 링크 공유하기',
          url,
        });
      } catch (error) {}
    } else {
      showToast.info('공유 기능이 지원되지 않는 환경입니다.');
    }
  }, []);

  const handleCreateLink = async () => {
    if (!file) return;

    const imageKey = nanoid();
    try {
      const presignedUrl = await api.guestbook.getPresignedUrl(imageKey);

      await api.guestbook.uploadImage({
        presignedUrl,
        imageFile: file.file,
      });

      const createLinkResult = await api.guestbook.createLink({
        visitorName,
        imageKey,
      });

      const newLink = `${window.location.origin}/guest-book/${createLinkResult.id}/leave-message`;
      router.push(newLink);
      showToast.success('방명록 링크 생성이 완료되었습니다.');
      shareUrl(newLink);
    } catch (error) {
      showToast.error('방명록 링크 생성이 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    visitorName,
    setVisitorName,
    file,
    setFile,
    handleCreateLink,
    isLoading,
    setIsLoading,
  };
};

export default useGuestBookLink;

import { ChangeEvent } from 'react';
import { showToast } from '@/libs/utils';
import ImageFile from '@/types/image.file';

export const MAX_VISITOR_NAME_LENGTH = 10;

export const validateForm = (
  visitorName: string,
  file: ImageFile | null,
): boolean => {
  if (!visitorName) {
    showToast.error('방문자 이름을 입력해주세요.');
    return false;
  }
  if (!file) {
    showToast.error('이미지를 선택해주세요.');
    return false;
  }
  return true;
};

export const handleVisitorNameInput = (
  e: ChangeEvent<HTMLInputElement>,
  setVisitorName: (name: string) => void,
) => {
  if (e.target.value.length <= MAX_VISITOR_NAME_LENGTH) {
    setVisitorName(e.target.value);
  }
};

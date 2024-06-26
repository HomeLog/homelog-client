import TImageFile from '@/types/image.file';
import * as htmlToImage from 'html-to-image';

export const processImage = async () => {
  const imageUploadContainer = document.querySelector(
    '#image-upload-container',
  ) as HTMLElement;
  const image = await htmlToImage.toJpeg(imageUploadContainer, {
    quality: 1,
  });
  const base64Image = await fetch(image);
  return await base64Image.blob();
};

export function convertFileToImageFile(file: File): TImageFile {
  const result = {
    ...file,
    previewUrl: URL.createObjectURL(file),
    date: new Date()
      .toLocaleDateString('ko-KR')
      .replace(/\./g, '')
      .replace(/ /g, '.'),
  };

  return result;
}

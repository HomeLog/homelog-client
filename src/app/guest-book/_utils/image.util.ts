import TImageFile from '@/types/image.file';
import * as htmlToImage from 'html-to-image';

export const processImage = async () => {
  const jpegDataUrl = await buildJpeg('image-upload-container');

  const base64Image = await fetch(jpegDataUrl);

  return base64Image.blob();
};

const buildJpeg = async (elementId: string) => {
  const element = document.getElementById(elementId) as HTMLElement;

  let dataUrl = '';
  const minDataLength = 2000000;
  let i = 0;
  const maxAttempts = 10;

  while (dataUrl.length < minDataLength && i < maxAttempts) {
    dataUrl = await htmlToImage.toJpeg(element, {
      quality: 1,
    });
    i += 1;
  }

  return dataUrl;
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

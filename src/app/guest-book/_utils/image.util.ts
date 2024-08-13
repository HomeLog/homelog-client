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
  const minDataLength = 1000000;
  let i = 0;
  const maxAttempts = 5;

  while (dataUrl.length < minDataLength && i < maxAttempts) {
    dataUrl = await htmlToImage.toJpeg(element, {
      quality: 1,
    });
    i += 1;
  }

  return dataUrl;
};

export const createImageFile = (file: File): TImageFile => ({
  ...file,
  previewUrl: URL.createObjectURL(file),
  date: new Date()
    .toLocaleDateString('ko-KR')
    .replace(/\./g, '')
    .replace(/ /g, '.'),
});

export const convertFileToImageFile = async (
  file: File,
): Promise<TImageFile> => {
  let convertedFile = file;
  if (file.type === 'image/heic' || file.type === 'image/heif') {
    try {
      const heic2any = await import('heic2any');
      const blob = await heic2any.default({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.7,
      });
      if (!(blob instanceof Blob)) {
        throw new Error('Conversion failed: Result is not a Blob');
      }
      convertedFile = new File(
        [blob],
        file.name.replace(/\.(heic|heif)$/i, '.jpg'),
        {
          type: 'image/jpeg',
          lastModified: file.lastModified,
        },
      );
    } catch (error) {
      throw error;
    }
  }
  return createImageFile(convertedFile);
};

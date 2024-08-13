import TImageFile from '@/types/image.file';
import heic2any from 'heic2any';
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

export async function convertFileToImageFile(file: File): Promise<TImageFile> {
  let convertedFile = file;

  if (file.type === 'image/heic' || file.type === 'image/heif') {
    try {
      const blob = await heic2any({
        blob: file,
        multiple: undefined,
        toType: 'image/jpeg',
        quality: 0.7,
      });

      if (blob instanceof Blob)
        convertedFile = new File(
          [blob],
          file.name.replace(/\.(heic|heif)$/i, '.jpg'),
          {
            type: 'image/jpeg',
            lastModified: file.lastModified,
          },
        );
      else throw new Error('Conversion failed');
    } catch (error) {
      throw error;
    }
  }

  const result: TImageFile = {
    ...convertedFile,
    previewUrl: URL.createObjectURL(convertedFile),
    date: new Date()
      .toLocaleDateString('ko-KR')
      .replace(/\./g, '')
      .replace(/ /g, '.'),
  };

  return result;
}

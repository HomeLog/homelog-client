import TImageFile from '@/types/image.file';
import html2canvas from 'html2canvas';

const buildJpeg = async (elementId: string) => {
  const element = document.getElementById(elementId);

  if (!element) throw new Error(`Element with id "${elementId}" not found`);

  const canvas = await html2canvas(element, {
    scale: 2,
  });

  return canvas.toDataURL('image/jpeg');
};

export const processImage = async () => {
  try {
    const jpegDataUrl = await buildJpeg('image-upload-container');
    const response = await fetch(jpegDataUrl);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw error;
  }
};

export const createImageFile = (file: File): Promise<TImageFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        resolve({
          ...file,
          previewUrl: event.target.result,
          date: new Date()
            .toLocaleDateString('ko-KR')
            .replace(/\./g, '')
            .replace(/ /g, '.'),
        });
      } else {
        reject(new Error('Failed to read file'));
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
};

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
  return await createImageFile(convertedFile);
};

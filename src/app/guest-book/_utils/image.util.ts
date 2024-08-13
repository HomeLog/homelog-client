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

function cropImageTo4by3Ratio(imageFile: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target || typeof event.target.result !== 'string') {
        reject(new Error('Failed to read file'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Unable to get canvas context'));
          return;
        }

        let width, height;
        const aspectRatio = 3 / 4;

        if (img.width / img.height > aspectRatio) {
          // 이미지가 더 넓은 경우
          height = img.height;
          width = height * aspectRatio;
        } else {
          // 이미지가 더 좁거나 정확히 3:4인 경우
          width = img.width;
          height = width / aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;

        // 이미지의 중앙을 기준으로 크롭
        const startX = (img.width - width) / 2;
        const startY = (img.height - height) / 2;

        ctx.drawImage(img, startX, startY, width, height, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas to Blob conversion failed'));
            }
          },
          'image/png',
          1,
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(imageFile);
  });
}

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
        quality: 1,
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

  try {
    const croppedBlob = await cropImageTo4by3Ratio(convertedFile);
    convertedFile = new File([croppedBlob], convertedFile.name, {
      type: 'image/jpeg',
      lastModified: convertedFile.lastModified,
    });
  } catch (error) {}

  return await createImageFile(convertedFile);
};

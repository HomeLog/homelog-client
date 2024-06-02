import ImageFile from '@/types/image.file';
import clsx, { ClassValue } from 'clsx';
import fs from 'fs/promises';
import { twMerge } from 'tailwind-merge';

export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCreatedAt(file: string): Promise<Date> {
  const { birthtime } = await fs.stat(file);
  return birthtime;
}

export function convertFileToImageFile(file: File): ImageFile {
  const result = {
    ...file,
    previewUrl: URL.createObjectURL(file),
    date: new Date(file.lastModified)
      .toLocaleDateString('ko-KR')
      .replace(/\./g, '')
      .replace(/ /g, '.'),
  };

  return result;
}

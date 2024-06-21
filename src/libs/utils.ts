import clsx, { ClassValue } from 'clsx';
import fs from 'fs/promises';
import { twMerge } from 'tailwind-merge';

export { default as showToast } from './toast/toast.util';

export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCreatedAt(file: string): Promise<Date> {
  const { birthtime } = await fs.stat(file);
  return birthtime;
}

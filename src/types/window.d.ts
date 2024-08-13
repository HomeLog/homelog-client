// window.d.ts

import { RuntimeEnvConfig } from '@/config';

declare global {
  interface Window {
    ENV?: RuntimeEnvConfig;
  }
}

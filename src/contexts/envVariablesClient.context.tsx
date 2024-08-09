'use client';

import { RuntimeEnvConfig } from '@/config';
import { createContext, useContext } from 'react';

export const defaultEnvVariables: RuntimeEnvConfig = {};

export const EnvVariablesClientContext =
  createContext<RuntimeEnvConfig>(defaultEnvVariables);

export const envScriptId = 'public-env';

const isSSR = typeof window === 'undefined';

export const getRuntimeEnv = (): RuntimeEnvConfig => {
  if (isSSR) return defaultEnvVariables;
  return window.ENV || defaultEnvVariables;
};

export const useEnvVariablesClientConfig = (): RuntimeEnvConfig => {
  const context = useContext(EnvVariablesClientContext);
  if (context === undefined) {
    throw new Error(
      'useEnvVariablesClientConfig는 EnvVariablesClientProvider 내에서 사용해야 합니다',
    );
  }
  return context;
};

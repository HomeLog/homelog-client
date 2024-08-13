'use client';

import { RuntimeEnvConfig } from '@/config';
import {
  defaultEnvVariables,
  EnvVariablesClientContext,
  getRuntimeEnv,
} from '@/contexts/envVariablesClient.context';
import { ReactNode, useEffect, useState } from 'react';

type EnvClientProviderProps = {
  children: ReactNode;
};
export const EnvVariablesClientProvider: React.FC<EnvClientProviderProps> = ({
  children,
}) => {
  const [envs, setEnvs] = useState<RuntimeEnvConfig>(defaultEnvVariables);

  useEffect(() => {
    const runtimeEnvs = getRuntimeEnv();
    setEnvs(runtimeEnvs);
  }, []);

  return (
    <EnvVariablesClientContext.Provider value={envs}>
      {children}
    </EnvVariablesClientContext.Provider>
  );
};

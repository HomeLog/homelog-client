import { runtimeEnvConfig } from '@/config';
import { unstable_noStore } from 'next/cache';
import { headers } from 'next/headers';

export const envScriptId = 'public-env';

export default function EnvVariablesScript() {
  unstable_noStore();
  const nonce = headers().get('x-nonce');

  return (
    <script
      id={envScriptId}
      nonce={nonce || undefined}
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(runtimeEnvConfig)};`,
      }}
    />
  );
}

export type RuntimeEnvConfig = {
  NEXT_PUBLIC_API_IMAGE_SERVER_URL?: string;
  NEXT_PUBLIC_SERVER_URL?: string;
};

export const runtimeEnvConfig: RuntimeEnvConfig = {
  NEXT_PUBLIC_API_IMAGE_SERVER_URL:
    process.env.NEXT_PUBLIC_API_IMAGE_SERVER_URL,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
};

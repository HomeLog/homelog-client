'use client';
import { useEnvVariablesClientConfig } from '@/contexts/envVariablesClient.context';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type signInProps = {
  title: string;
  src: string;
  alt: string;
};

function SocialSignIn({ title, src, alt }: signInProps) {
  const router = useRouter();
  const config = useEnvVariablesClientConfig();
  const handleClickSignIn = async () => {
    const url = `${config.NEXT_PUBLIC_SERVER_URL}/users/kakao`;
    router.push(url);
  };

  return (
    <>
      <button title={title} onClick={handleClickSignIn}>
        <Image src={src} alt={alt} width={400} height={1} />
      </button>
    </>
  );
}

export default SocialSignIn;

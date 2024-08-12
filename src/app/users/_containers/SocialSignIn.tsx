'use client';
import { useEnvVariablesClientConfig } from '@/contexts/envVariablesClient.context';
import { mergeClassNames } from '@/libs/utils';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const buttonsVariants = cva('w-full h-full', {
  variants: {
    align: {
      center: 'flex justify-center items-center',
    },
    size: {
      primary: 'w-[80%] h-full',
    },
  },
  defaultVariants: {
    size: 'primary',
    align: 'center',
  },
});

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
      <button
        title={title}
        onClick={handleClickSignIn}
        className={mergeClassNames(buttonsVariants())}
      >
        <Image src={src} alt={alt} width={400} height={1} />
      </button>
    </>
  );
}

export default SocialSignIn;

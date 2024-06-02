'use client';
import api from '@/app/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const KakaoCallbackPage = ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  const router = useRouter();
  const code = searchParams.code;

  useEffect(() => {
    const signInAndRedirect = async () => {
      await `${process.env.NEXT_PUBLIC_SERVER_URL}/users/kakao/callback?code=${code}`;
      router.push('/');
    };

    signInAndRedirect();
  }, [code, router]);

  return null;
};

export default KakaoCallbackPage;

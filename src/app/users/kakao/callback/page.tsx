'use client';
import api from '@/app/api';
import useAuth from '@/contexts/auth.context';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const KakaoCallbackPage = ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  const { signIn } = useAuth();
  const router = useRouter();
  const code = searchParams.code;

  useEffect(() => {
    const signInAndRedirect = async () => {
      await `${process.env.NEXT_PUBLIC_SERVER_URL}/users/kakao/callback?code=${code}`;
      signIn();
      router.push('/');
    };

    signInAndRedirect();
  }, [code, signIn, router]);

  return null;
};

export default KakaoCallbackPage;

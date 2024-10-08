'use client';
import api from '@/api';
import useAuth from '@/contexts/auth.context';
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
      await api.auth.signInKakao(code);
      signIn();
      router.replace('/');
    };

    signInAndRedirect();
  }, [code, signIn, router]);

  return null;
};

export default KakaoCallbackPage;

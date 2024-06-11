'use client';
import useAuth from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';
import { signOut } from './api/auth/auth.api';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import { useEffect } from 'react';
import HomeButton from './_containers/HomeButton';

function Home() {
  const router = useRouter();
  const { loading, isLoggedIn } = useAuth();
  useEffect(() => {
    if (loading === false && isLoggedIn === false) {
      router.push('/users');
    }
  }, [loading, isLoggedIn, router]);

  const redirectToProfileEditPage = () => {
    router.push('/profile');
  };
  const redirectToGenerateLinkPage = () => {
    router.push('/guest-book/link');
  };

  const logOut = () => {
    signOut();
    router.push('/users');
  };
  return (
    <>
      <Flex className='flex flex-row justify-evenly w-full bg-black'>
        <HomeButton onClick={redirectToProfileEditPage}>프로필 편집</HomeButton>
        <HomeButton onClick={redirectToGenerateLinkPage}>링크 생성</HomeButton>
        <HomeButton onClick={logOut}>로그아웃</HomeButton>
      </Flex>
    </>
  );
}

export default Home;

'use client';
import useAuth from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';
import { signOut } from './api/auth/auth.api';
import Image from 'next/image';
import Flex from '@/components/Flex';
import { useEffect } from 'react';
import HomeButton from './_containers/HomeButton';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';

function Home() {
  const router = useRouter();
  const { loading, isLoggedIn } = useAuth();
  const { data: profile } = useQueryGetProfile();
  const guestbookName = profile?.guestBookName;
  const homeImage = profile?.homeImageUrl ?? '/images/background.png';
  const profileImage = profile?.profileImageUrl ?? '/images/blank-profile.png';

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
    <div className='bg-[#F5F5F5] w-full h-full'>
      <Flex className='w-full h-1/3 relative drop-shadow-lg'>
        <div className='w-full h-full relative'>
          <Image
            src={homeImage}
            alt='Home Image'
            fill
            objectFit='cover'
            className='w-full'
          />
        </div>
        <div className='absolute bg-inherit aspect-square w-[14%]'>
          <Image
            src={profileImage}
            alt='Profile Image'
            fill
            objectFit='cover'
            className='rounded-full'
          />
        </div>
        <div className='absolute top-16 font-bold	text-2xl text-white	'>
          {guestbookName}
        </div>
        <Flex className='absolute bottom-5 flex flex-row justify-evenly w-full items-end'>
          <HomeButton onClick={redirectToProfileEditPage}>
            프로필 편집
          </HomeButton>
          <HomeButton onClick={redirectToGenerateLinkPage}>
            링크 생성
          </HomeButton>
          <HomeButton onClick={logOut}>로그아웃</HomeButton>
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;

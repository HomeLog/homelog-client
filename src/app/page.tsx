'use client';
import useAuth from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';
import { signOut } from './api/auth/auth.api';
import Image from 'next/image';
import Flex from '@/components/Flex';
import { useEffect } from 'react';
import HomeButton from './_containers/HomeButton';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';
import Polaroid from './_components/Polaroid';
import Grid from '@/components/Grid';

function Home() {
  const router = useRouter();
  const { loading, isLoggedIn } = useAuth();
  const { data: profile } = useQueryGetProfile();
  const guestbookName = profile?.guestBookName;
  const homeImage = profile?.homeImageUrl ?? '/images/background.png';
  const profileImage = profile?.profileImageUrl ?? '/images/blank-profile.png';
  const totalGuestbook = 0;

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
        <div id='home image' className='w-full h-full relative'>
          <Image
            src={homeImage}
            alt='Home Image'
            fill
            objectFit='cover'
            className='w-full'
          />
        </div>
        <Flex className='absolute w-full h-full'>
          <div
            id='guestbook name'
            className='relative font-bold	text-2xl text-white	mt-16'
          >
            {guestbookName}
          </div>
          <div
            id='profile image'
            className='relative aspect-square w-[14%] rounded-full overflow-hidden mt-5'
          >
            <Image
              src={profileImage}
              alt='Profile Image'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div
            id='total'
            className='relative text-sm text-white font-thin mt-1 mb-12'
          >
            Total: {totalGuestbook}
          </div>
          <Flex className='relative flex flex-row justify-evenly w-full items-end'>
            <HomeButton onClick={redirectToProfileEditPage}>
              프로필 편집
            </HomeButton>
            <HomeButton onClick={redirectToGenerateLinkPage}>
              링크 생성
            </HomeButton>
            <HomeButton onClick={logOut}>로그아웃</HomeButton>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;

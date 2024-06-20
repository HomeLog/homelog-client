'use client';
import { signOut } from '@/api/auth/auth.api';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import useAuth from '@/contexts/auth.context';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const buttonStyles = {
  intent: 'transparent' as 'transparent',
  size: 'sm' as 'sm',
  rounded: 'md' as 'md',
};

export default function Home() {
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
      <Flex className='relative w-full h-1/3 drop-shadow-lg'>
        <div id='home image' className='relative w-full h-full'>
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
            className='relative text-2xl font-bold text-white mt-14'
          >
            {guestbookName}
          </div>
          <div
            id='profile image'
            className='relative aspect-square w-[14%] rounded-full overflow-hidden mt-2'
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
            className='relative mt-1 mb-10 text-sm font-thin text-white'
          >
            Total: {totalGuestbook}
          </div>
          <Flex className='relative flex flex-row items-end w-full justify-evenly'>
            <Button {...buttonStyles} onClick={redirectToProfileEditPage}>
              프로필 편집
            </Button>
            <Button {...buttonStyles} onClick={redirectToGenerateLinkPage}>
              링크 생성
            </Button>
            <Button {...buttonStyles} onClick={logOut}>
              로그아웃
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

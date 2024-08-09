'use client';
import { signOut } from '@/api/auth/auth.api';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import useAuth from '@/contexts/auth.context';
import { useEnvVariablesClientConfig } from '@/contexts/envVariablesClient.context';
import useQueryGetTotalCountGuestbooks from '@/hooks/guestbook/useQuery.getTotalGuestbooksCount';
import useQueryGetProfile from '@/hooks/profile/useQuery.getProfile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import GuestbookList from './_components/GuestbookList';

const buttonStyles = {
  intent: 'transparent' as 'transparent',
  size: 'sm' as 'sm',
  rounded: 'md' as 'md',
};

export default function Home() {
  const router = useRouter();
  const { loading, signedIn } = useAuth();
  const config = useEnvVariablesClientConfig();
  const imageServerUrl = config.NEXT_PUBLIC_API_IMAGE_SERVER_URL;

  useEffect(() => {
    if (loading === false && signedIn === false) router.push('/users');
  }, [loading, signedIn, router]);

  const { data: profile } = useQueryGetProfile();
  const guestbookName = profile?.guestBookName;
  const homeImage = profile?.homeImageKey
    ? `${imageServerUrl}/w640/${profile?.homeImageKey}`
    : '/images/background.png';
  const avatarImage = profile?.avatarImageKey
    ? `${imageServerUrl}/w140/${profile?.avatarImageKey}`
    : '/images/blank-profile.png';

  const { data: totalGuestbooks, refetch: refetchTotalGuestbooks } =
    useQueryGetTotalCountGuestbooks();

  useEffect(() => {
    refetchTotalGuestbooks();
  }, [refetchTotalGuestbooks]);

  const redirectToProfileEditPage = () => {
    router.push('/profile');
  };

  const redirectToGenerateLinkPage = () => {
    router.push('/guest-book/create');
  };

  const logOut = () => {
    signOut();
    router.push('/users');
  };

  return (
    <>
      <div className='bg-[#F5F5F5] w-full h-full'>
        <Flex id='profile' className='relative w-full h-[285px] drop-shadow-lg'>
          <div id='home image' className='relative w-full h-full'>
            <Image
              src={homeImage}
              alt='Home Image'
              fill
              objectFit='cover'
              className='w-full'
            />
            <div
              id='filter'
              className='absolute inset-0 flex items-center justify-center bg-black opacity-40'
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
              id='avatar image'
              className='relative aspect-square w-[14%] rounded-full overflow-hidden mt-2'
            >
              <Image
                src={avatarImage}
                alt='Avatar Image'
                layout='fill'
                objectFit='cover'
              />
            </div>
            <div
              id='total'
              className='relative mt-1 mb-10 text-sm font-thin text-white'
            >
              Total: {totalGuestbooks}
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
        <GuestbookList />
      </div>
    </>
  );
}

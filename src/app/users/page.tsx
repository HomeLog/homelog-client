import React from 'react';
import SocialSignIn from './_containers/SocialSignIn';
import Flex from '@/components/Flex';
import Grid from '@/components/Grid';
import { Italiana } from 'next/font/google';
import clsx from 'clsx';

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
});

function page() {
  const kakaoSignInProps = {
    title: 'kakaoSignInButton',
    src: '/socialLogIn/kakao_login_large_wide.png',
    alt: '카카오 회원가입',
  };

  return (
    <Grid className='h-full grid-rows-12'>
      <Flex className='row-start-3 justify-end'>
        <p
          className={clsx(
            'text-2xl',
            'row-start-3',
            'w-full',
            'text-center',
            italiana.className,
          )}
        >
          Home-log
        </p>
      </Flex>
      <Flex className='row-start-5 row-span-2'>
        <SocialSignIn {...kakaoSignInProps} />
      </Flex>
    </Grid>
  );
}

export default page;

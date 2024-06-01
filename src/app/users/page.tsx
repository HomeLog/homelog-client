import React from 'react';
import SocialSignIn from './_containers/SocialSignIn';

function page() {
  const kakaoSignInProps = {
    title: 'kakaoSignInButton',
    src: '/socialLogIn/kakao_login_medium_wide.png',
    alt: '카카오 회원가입',
  };

  return (
    <div>
      <div>Home-log</div>
      <SocialSignIn {...kakaoSignInProps} />
    </div>
  );
}

export default page;

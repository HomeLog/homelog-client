'use client';
import useAuth from '@/contexts/auth.context';
import { redirect, useRouter } from 'next/navigation';

function Home() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  if (!isLoggedIn) router.push('/users');

  const redirectToProfileEditPage = () => {
    if (isLoggedIn) router.push('/profile');
    else router.push('/');
  };
  return (
    <>
      hello, home-log!
      <button onClick={redirectToProfileEditPage}>profile</button>
    </>
  );
}

export default Home;

'use client';
import useAuth from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Home() {
  const router = useRouter();
  const { loading, isLoggedIn } = useAuth();
  useEffect(() => {
    if (loading === false && isLoggedIn === false) {
      router.push('/users');
    }
  }, [loading, isLoggedIn, router]);

  return <></>;
}

export default Home;

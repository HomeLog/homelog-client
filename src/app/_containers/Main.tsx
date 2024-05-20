import { ReactNode } from 'react';

function Main({ children }: { children: ReactNode }) {
  return (
    <main className='flex flex-col items-center justify-between h-screen px-10'>
      {children}
    </main>
  );
}

export default Main;

import { ReactNode } from 'react';

function Main({ children }: { children: ReactNode }) {
  return (
    <main className='flex flex-col items-center justify-between flex-grow bg-inherit'>
      {children}
    </main>
  );
}

export default Main;

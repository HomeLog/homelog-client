import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ProvidersLayout from '../(provider)/layout';

function Background({ children }: { children: ReactNode }) {
  return (
    <ProvidersLayout>
      <div className='flex flex-col h-full max-w-md mx-auto bg-white'>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    </ProvidersLayout>
  );
}

export default Background;

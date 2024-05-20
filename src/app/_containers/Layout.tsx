import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';


function Background({ children }: { children: ReactNode }) {
  return (
    <div className='max-w-md min-h-screen mx-auto bg-white'>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

export default Background;

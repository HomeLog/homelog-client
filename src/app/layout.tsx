import Background from '@/app/_containers/Layout';
import '@app/globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Providers from './_provider';

export const metadata: Metadata = {
  title: 'HomeLog',
  description: '소중한 순간을 담는 서비스, HomeLog',
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
});

export default function HTMLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} bg-[#DADADA]`}>
        <Providers>
          <Background>{children}</Background>
        </Providers>
      </body>
    </html>
  );
}

import { AuthProvider } from '@/contexts/auth';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home description',
  authors: { name: 'João Victor' },
};

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--poppins',
});

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

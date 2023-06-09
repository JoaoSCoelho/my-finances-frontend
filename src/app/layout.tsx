import { AuthProvider } from '@/contexts/auth';
import { LoadingProvider } from '@/contexts/loading';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'My Finances',
    template: '%s | My Finances',
  },
  description: 'Controle suas financas facilmente',
  authors: { name: 'João Victor' },
};

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--poppins',
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <LoadingProvider>
          <AuthProvider>{children}</AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}

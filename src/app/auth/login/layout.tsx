import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Login',
};

export default function LoginLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

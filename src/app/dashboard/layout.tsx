import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

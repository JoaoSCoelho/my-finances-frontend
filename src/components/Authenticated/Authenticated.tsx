'use client';

import { AuthContext } from '@/contexts/auth';
import { useMe } from '@/hooks/useMe';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactElement, useContext } from 'react';

export default function Authenticated({ children }: PropsWithChildren): ReactElement {
  const { getAccessToken, signout } = useContext(AuthContext);
  const router = useRouter();
  const { user, isLoading, error } = useMe();
  const accessToken = getAccessToken();

  if (!accessToken || error) {
    signout();
    typeof location !== 'undefined' && router.push('/auth/login');
  }

  if (isLoading || !user) {
    return <></>;
  } else {
    close();
  }

  return children as ReactElement;
}

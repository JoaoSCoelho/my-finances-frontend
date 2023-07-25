'use client';

import { AuthContext } from '@/contexts/auth';
import { useMe } from '@/hooks/useMe';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactElement, useContext } from 'react';

import LoadingScreen from '../LoadingScreen/LoadingScreen';

interface IAuthenticatedProps extends PropsWithChildren {
  onLoadingComponent?: ReactElement | false;
}

export default function Authenticated({
  children,
  onLoadingComponent,
}: IAuthenticatedProps): ReactElement {
  const { getAccessToken, signout } = useContext(AuthContext);
  const { user, isLoading, isValidating, error } = useMe();
  const router = useRouter();

  const accessToken = getAccessToken();

  if (!accessToken || (error && !isValidating)) {
    signout();
    typeof location !== 'undefined' && router.push('/auth/login');
  }

  if (isLoading || !user) {
    if (onLoadingComponent !== false) return onLoadingComponent ?? <LoadingScreen />;
  }

  return children as ReactElement;
}

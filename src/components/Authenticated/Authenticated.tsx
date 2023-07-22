import { AuthContext } from '@/contexts/auth';
import { LoadingContext } from '@/contexts/loading';
import { useMe } from '@/hooks/useMe';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactElement, useContext } from 'react';

export default function Authenticated({ children }: PropsWithChildren): ReactElement {
  const { getAccessToken, signout } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);
  const router = useRouter();
  const { user, isLoading, error } = useMe();
  const accessToken = getAccessToken();

  if (!accessToken || error) {
    signout();
    router.push('/auth/login');
  }

  if (isLoading || !user) {
    setLoading('');
    return <></>;
  }

  return children as ReactElement;
}

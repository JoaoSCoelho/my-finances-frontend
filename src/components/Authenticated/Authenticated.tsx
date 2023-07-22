import { AuthContext } from '@/contexts/auth';
import { LoadingContext } from '@/contexts/loading';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

interface IAuthenticatedProps {
  children: JSX.Element;
}

export default function Authenticated({ children }: IAuthenticatedProps) {
  const { user, getAccessToken, setUser, signout, getAuthConfig } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);
  const router = useRouter();

  useEffect(() => {
    validateAccessToken();
  }, []);

  if (user) {
    return children;
  } else {
    setLoading('');
    return <></>;
  }

  async function validateAccessToken() {
    const accessToken = getAccessToken();

    if (accessToken) {
      try {
        const { data } = await api.get('users/me', getAuthConfig());

        if (data.user) setUser(data.user);
      } catch (err) {
        console.error(err);
        signout();
        router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
  }
}
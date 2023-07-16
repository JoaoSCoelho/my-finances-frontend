import { AuthContext } from '@/contexts/auth';
import { LoadingContext } from '@/contexts/loading';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

interface IAuthenticatedProps {
  children: JSX.Element;
}

export default function Authenticated({ children }: IAuthenticatedProps) {
  const { user, getAccessToken, setUser, signout } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);
  const router = useRouter();

  useEffect(() => {
    const validateAccessToken = async () => {
      const accessToken = getAccessToken();
      if (accessToken) {
        await api
          .get('users/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then(({ data }) => {
            if (data.user) {
              setUser(data.user);
            }
          })
          .catch(() => {
            signout();
            router.push('/auth/login');
          });
      } else {
        router.push('/auth/login');
      }
    };
    validateAccessToken();
  }, []);

  return user ? children : setLoading('')! || <></>;
}

import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import Loading from './Loading';

interface IAuthenticatedProps {
  children: JSX.Element;
}

export default function Authenticated({ children }: IAuthenticatedProps) {
  const { user, getToken, setUser, signout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const authToken = getToken();
      if (authToken) {
        await api
          .get('users/me', {
            headers: { Authorization: `Bearer ${authToken}` },
          })
          .then(({ data }) => {
            console.log('then');
            if (data.user) {
              setUser(data.user);
            }
          })
          .catch(() => {
            console.log('catch');
            signout();
            router.push('/auth/login');
          });
      } else {
        router.push('/auth/login');
      }
    };
    validateToken();
  }, []);

  return user ? children : <Loading />;
}

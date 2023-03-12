'use client';

import api from '@/services/api';
import { IClientUserObject } from '@/types/User';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';

export type AuthContextType = {
  user: IClientUserObject | null;
  signin: (token: string, user?: IClientUserObject) => void;
  signout: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IClientUserObject | null>(null);
  const router = useRouter();

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  const signin = (token: string, user?: IClientUserObject) => {
    setToken(token);
    user && setUser(user);
  };

  const signout = () => {
    setUser(null);
    setToken('');
  };

  useEffect(() => {
    const validateToken = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        await api
          .get('users/me', {
            headers: { Authorization: `Bearer ${authToken}` },
          })
          .then(({ data }) => {
            if (data.user) {
              setUser(data.user);
            }
          })
          .catch(() => {
            signout();
            router.push('/login');
          });
      }
    };
    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

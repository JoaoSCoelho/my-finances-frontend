'use client';

import api from '@/services/api';
import { IClientUserObject } from '@/types/User';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

export type AuthContextType = {
  user: IClientUserObject | null;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
  setToken: (token: string) => void;
  setUser: Dispatch<SetStateAction<IClientUserObject | null>>;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IClientUserObject | null>(null);
  const router = useRouter();

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  const signin = async (email: string, password: string) => {
    return await api
      .post('auth', { email, password })
      .then(({ data }) => {
        if (data.user && data.token) {
          setUser(data.user);
          setToken(data.token);
          return true;
        }
        return false;
      })
      .catch(() => false);
  };

  const signout = async () => {
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
    <AuthContext.Provider value={{ user, setUser, signin, signout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

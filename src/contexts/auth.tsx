'use client';

import { IClientUserObject } from '@/types/User';
import { createContext, useState, Dispatch, SetStateAction } from 'react';

export type AuthContextType = {
  user: IClientUserObject | null;
  setUser: Dispatch<SetStateAction<AuthContextType['user']>>;
  signin: (accessToken: string, user?: IClientUserObject) => void;
  signout: () => void;
  getAccessToken: () => string | null;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IClientUserObject | null>(null);

  const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
  };

  const signin = (accessToken: string, user?: IClientUserObject) => {
    setAccessToken(accessToken);
    user && setUser(user);
  };

  const signout = () => {
    setUser(null);
    setAccessToken('');
  };

  const getAccessToken = () => localStorage.getItem('accessToken');

  return (
    <AuthContext.Provider
      value={{ user, setUser, signin, signout, getAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

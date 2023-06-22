'use client';

import { IClientUserObject } from '@/types/User';
import { createContext, useState, Dispatch, SetStateAction } from 'react';

export type AuthContextType = {
  user: IClientUserObject | null;
  setUser: Dispatch<SetStateAction<AuthContextType['user']>>;
  signin: (token: string, user?: IClientUserObject) => void;
  signout: () => void;
  getToken: () => string | null;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IClientUserObject | null>(null);

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

  const getToken = () => localStorage.getItem('authToken');

  return (
    <AuthContext.Provider value={{ user, setUser, signin, signout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

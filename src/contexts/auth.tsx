'use client';

import api from '@/services/api';
import { IClientUserObject } from '@/types/User';
// eslint-disable-next-line import/named
import { AxiosRequestConfig } from 'axios';
import { createContext, useState, Dispatch, SetStateAction } from 'react';

export type AuthContextType = {
  user: IClientUserObject | null;
  setUser: Dispatch<SetStateAction<AuthContextType['user']>>;
  signin(accessToken: string, refreshToken: string, user?: IClientUserObject): void;
  signout(): void;
  getAccessToken(): string | null;
  getAuthConfig(): AxiosRequestConfig;
};

// Intersepta qualquer request da api que seja recusada por token expirado,
// da refresh no token e refaz a requisição
interceptRecusedByExpiredToken();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IClientUserObject | null>(null);

  return (
    <AuthContext.Provider
      value={{ user, setUser, signin, signout, getAccessToken, getAuthConfig }}
    >
      {children}
    </AuthContext.Provider>
  );

  function getAuthConfig(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
  }

  function signin(accessToken: string, refreshToken: string, user?: IClientUserObject) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    user && setUser(user);
  }

  function signout() {
    setUser(null);
    setAccessToken('');
    setRefreshToken('');
  }
};

function getAccessToken() {
  return localStorage.getItem('accessToken');
}
function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

function setAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}
function setRefreshToken(token: string) {
  localStorage.setItem('refreshToken', token);
}

async function makeRefreshToken(refreshToken: string) {
  try {
    const response = await api.post('/auth/refreshToken', { refreshToken });
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    return response;
  } catch (err) {
    return await Promise.reject(err);
  }
}

function interceptRecusedByExpiredToken() {
  api.interceptors.response.use(null, async (error) => {
    const refreshToken = getRefreshToken();

    if (
      error.response?.data.code === 100 &&
      error.response?.data.paramName === 'accessToken' &&
      error.response?.data.reason === 'expired' &&
      refreshToken
    ) {
      try {
        await makeRefreshToken(refreshToken);

        const newAccessToken = getAccessToken();

        return await api.request({
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } catch {
        return await Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  });
}

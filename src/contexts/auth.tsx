'use client';

import api from '@/services/api';
import { IUserObject } from '@/types/User';
// eslint-disable-next-line import/named
import { AxiosRequestConfig } from 'axios';
import { createContext, PropsWithChildren } from 'react';

export type AuthContextType = {
  signin(accessToken: string, refreshToken: string, user?: IUserObject): void;
  signout(): void;
  getAccessToken(): string | null;
  getAuthConfig(): AxiosRequestConfig;
};

// Intersepta qualquer request da api que seja recusada por token expirado,
// da refresh no token e refaz a requisição
interceptRecusedByExpiredToken();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <AuthContext.Provider value={{ signin, signout, getAccessToken, getAuthConfig }}>
      {children}
    </AuthContext.Provider>
  );

  // ------ functions ------

  function getAuthConfig(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
  }

  function signin(accessToken: string, refreshToken: string) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }

  function signout() {
    setAccessToken('');
    setRefreshToken('');
  }
};

// ------ functions ------

function getAccessToken() {
  if (typeof window !== 'undefined') return localStorage?.getItem('accessToken');
  else return '';
}
function getRefreshToken() {
  if (typeof window !== 'undefined') return localStorage?.getItem('refreshToken');
}

function setAccessToken(token: string) {
  if (typeof window !== 'undefined') localStorage?.setItem('accessToken', token);
}
function setRefreshToken(token: string) {
  if (typeof window !== 'undefined') localStorage?.setItem('refreshToken', token);
}

/** Faz refresh do `accessToken` */
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

        // Refaz solicitação que falhou por conta do accessToken
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

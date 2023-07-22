import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { IGeneralApiError } from '@/types/IGeneralApiError';
import { IUserObject } from '@/types/User';
import { useContext } from 'react';

import { useSWR } from './useSWR';

export function useMe<
  Data extends IUserObject = IUserObject,
  Error extends IGeneralApiError & Record<string, any> = IGeneralApiError &
    Record<string, any>,
>() {
  const { getAuthConfig } = useContext(AuthContext);
  const swrResult = useSWR<Data, Error>('users/me', fetcher);

  return {
    user: swrResult.data,
    ...swrResult,
  };

  // functions

  async function fetcher() {
    return await api
      .get('users/me', getAuthConfig())
      .then(({ data: { user } }) => user)
      .catch((reason) => {
        throw { ...reason, ...reason.response?.data };
      });
  }
}

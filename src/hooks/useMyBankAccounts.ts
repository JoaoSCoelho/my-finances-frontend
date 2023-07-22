import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { ITotalBankAccountObject } from '@/types/BankAccount';
import { IGeneralApiError } from '@/types/IGeneralApiError';
import { useContext } from 'react';
// eslint-disable-next-line import/named

import { useSWR } from './useSWR';

export function useMyBankAccounts<
  Data extends ITotalBankAccountObject[] = ITotalBankAccountObject[],
  Error extends IGeneralApiError & Record<string, any> = IGeneralApiError &
    Record<string, any>,
>() {
  const { getAuthConfig } = useContext(AuthContext);
  const swrResult = useSWR<Data, Error>('bankaccounts/my', fetcher);

  return {
    bankAccounts: swrResult.data,
    ...swrResult,
  };

  // functions

  async function fetcher() {
    return await api
      .get('bankaccounts/my', getAuthConfig())
      .then(({ data: { bankAccounts } }) => bankAccounts)
      .catch((reason) => {
        throw { ...reason, ...reason.response?.data };
      });
  }
}

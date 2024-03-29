import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { IGeneralApiError } from '@/types/IGeneralApiError';
import { ITransactionObject } from '@/types/Transaction';
import { useContext } from 'react';

import { useSWR } from './useSWR';

export function useMyTransactions<
  Data extends ITransactionObject[] = ITransactionObject[],
  Error extends IGeneralApiError & Record<string, any> = IGeneralApiError &
    Record<string, any>,
>() {
  const { getAuthConfig } = useContext(AuthContext);
  const swrResult = useSWR<Data, Error>('transactions', fetcher);

  return {
    transactions: swrResult.data,
    ...swrResult,
  };

  // functions

  async function fetcher() {
    return await api
      .get('transactions', getAuthConfig())
      .then(({ data: { transactions } }) => transactions)
      .catch((reason) => {
        throw { ...reason, ...reason.response?.data };
      });
  }
}

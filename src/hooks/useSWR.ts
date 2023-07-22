/* eslint-disable import/named */
import originalUseSWR, {
  BareFetcher,
  Fetcher,
  Key,
  MutatorCallback,
  MutatorOptions,
  SWRConfiguration,
} from 'swr';

export const useSWR = <
  Data = any,
  Error = any,
  SWRKey extends Key = string,
  SWROptions extends SWRConfiguration<Data, Error, BareFetcher<Data>> | undefined =
    | SWRConfiguration<Data, Error, BareFetcher<Data>>
    | undefined,
>(
  key: string,
  fetcher: Fetcher<Data, SWRKey> | BareFetcher<Data> | null,
  config?: SWROptions,
) => {
  const swrResult = originalUseSWR(key, fetcher, {
    revalidateOnMount: false,
    errorRetryCount: 1,
    ...(config || {}),
  });
  const { mutate } = swrResult;

  return { ...swrResult, refetch, offMutate };

  async function refetch() {
    await mutate();
  }

  function offMutate(
    data?: Data | Promise<Data | undefined> | MutatorCallback<Data>,
    opts?: MutatorOptions<Data>,
  ) {
    return mutate(data, { ...opts, revalidate: false });
  }
};

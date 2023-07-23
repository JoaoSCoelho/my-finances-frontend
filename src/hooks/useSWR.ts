'use client';

/* eslint-disable import/named */
import originalUseSWR, {
  BareFetcher,
  Fetcher,
  Key,
  MutatorCallback,
  MutatorOptions,
  SWRConfiguration,
} from 'swr';

export function useSWR<
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
) {
  const swrResult = originalUseSWR(key, fetcher, {
    errorRetryCount: 1,
    ...(config || {}),
  });
  const { mutate } = swrResult;

  return { ...swrResult, refetch, revalidate, offMutate };

  /** Seta `data = undefined` e revalida com o `fetcher()` */
  async function refetch() {
    await mutate(undefined, { revalidate: true });
  }

  /** Mantém os dados até revalidar com o `fetcher()` */
  async function revalidate() {
    await mutate();
  }

  /** Igual ao `mutate()` mas com `revalidate: false` */
  function offMutate(
    data?: Data | Promise<Data | undefined> | MutatorCallback<Data>,
    opts?: MutatorOptions<Data>,
  ) {
    return mutate(data, { ...opts, revalidate: false });
  }
}

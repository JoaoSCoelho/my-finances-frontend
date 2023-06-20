'use client';

import { createContext, useState } from 'react';

export type LoadingContextType = {
  isLoading: boolean;
  loadingText: string;
  setLoading: (param?: string | boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const LoadingContext = createContext<LoadingContextType>(null!);

export const LoadingProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');

  const setLoading = (param?: string | boolean) => {
    if (typeof param === 'string') {
      setIsLoading(true);
      setLoadingText(param);
    } else {
      setIsLoading(!!param);
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, loadingText, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

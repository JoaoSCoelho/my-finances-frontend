'use client';

import { usePathname } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

export type LoadingContextType = {
  isLoading: boolean;
  loadingText: string;
  setLoading: (param?: string | boolean, bypass?: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const LoadingContext = createContext<LoadingContextType>(null!);

export const LoadingProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');

  const pathname = usePathname();

  const setLoading = (param?: string | boolean, bypass = false) => {
    if (typeof param === 'string') {
      if (!isLoading || bypass) {
        setIsLoading(true);
        setLoadingText(param);
      }
    } else {
      setIsLoading(!!param);
    }
  };

  useEffect(() => setLoading(), [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, loadingText, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

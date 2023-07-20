'use client';

import Loading from '@/components/Loading/Loading';
import { LoadingContext } from '@/contexts/loading';
import { PropsWithChildren, useContext } from 'react';
import { ToastContainer } from 'react-toastify';

export default function Template({ children }: PropsWithChildren) {
  const { isLoading, loadingText } = useContext(LoadingContext);

  return (
    <>
      <ToastContainer />
      {isLoading && <Loading text={loadingText} />}
      {children}
    </>
  );
}

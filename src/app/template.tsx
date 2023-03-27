'use client';

import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export default function Template({ children }: PropsWithChildren) {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

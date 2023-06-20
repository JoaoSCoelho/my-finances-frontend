'use client';
import { LoadingContext } from '@/contexts/loading';
import { useRouter } from 'next/navigation';
import { ReactElement, useContext } from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

import styles from './Template.module.css';

export default function AuthTemplate({ children }: { children: ReactElement }) {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);

  return (
    <>
      <button
        className={styles.backBtn}
        type="button"
        onClick={() => {
          router.back();
          setLoading('');
        }}
      >
        <HiOutlineArrowNarrowLeft />
      </button>
      {children}
    </>
  );
}

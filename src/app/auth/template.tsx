'use client';
import { LoadingContext } from '@/contexts/loading';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useContext } from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

import styles from './Template.module.css';

export default function AuthTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <BackButton_Local />
      {children}
    </>
  );

  // local components

  function BackButton_Local() {
    const router = useRouter();

    const { setLoading } = useContext(LoadingContext);

    return (
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
    );
  }
}

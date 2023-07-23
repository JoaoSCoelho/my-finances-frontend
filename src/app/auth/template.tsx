'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
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

    return (
      <button
        className={styles.backBtn}
        type="button"
        onClick={() => {
          router.back();
        }}
      >
        <HiOutlineArrowNarrowLeft />
      </button>
    );
  }
}

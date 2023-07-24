'use client';

import BackButton from '@/components/BackButton/BackButton';
import { PropsWithChildren } from 'react';

import styles from './Template.module.css';

export default function AuthTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <BackButton className={styles.backButton} />
      {children}
    </>
  );
}

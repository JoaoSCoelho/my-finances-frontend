'use client';

import AsideMenu from '@/components/AsideMenu/AsideMenu';
import Authenticated from '@/components/Authenticated/Authenticated';
import Header from '@/components/Header/Header';
import { PropsWithChildren } from 'react';

import styles from './Template.module.css';

export default function DashboardTemplate({ children }: PropsWithChildren) {
  return (
    <Authenticated>
      <div className={styles.container}>
        <AsideMenu />

        <Header />

        <main className={styles.main}>{children}</main>
      </div>
    </Authenticated>
  );
}

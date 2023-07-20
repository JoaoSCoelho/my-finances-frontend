'use client';

import AsideMenu from '@/components/AsideMenu/AsideMenu';
import Authenticated from '@/components/Authenticated/Authenticated';
import Header from '@/components/Header/Header';
import { ReactNode } from 'react';

import styles from './Template.module.css';

export default function DashboardTemplate({ children }: { children: ReactNode }) {
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

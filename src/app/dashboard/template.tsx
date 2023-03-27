'use client';

import AsideMenu from '@/components/pages/dashboard/AsideMenu';
import Header from '@/components/pages/dashboard/Header';
import { ReactNode } from 'react';

import styles from './Template.module.css';

export default function DashboardTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.container}>
      <AsideMenu />

      <Header />

      <main className={styles.main}>{children}</main>
    </div>
  );
}

import { ReactElement } from 'react';

import styles from './Layout.module.css';

export default function AuthLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.formSide}>{children}</div>

        <div className={styles.imageSide}>
          <img className={styles.image} src="/coins.jpg" alt="Coins" />
        </div>
      </main>
    </>
  );
}

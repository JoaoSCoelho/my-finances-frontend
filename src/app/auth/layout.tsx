import Image from 'next/image';
import { PropsWithChildren } from 'react';

import coins from '../../assets/coins.jpg';
import styles from './Layout.module.css';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.formSide}>{children}</div>

        <div className={styles.imageSide}>
          <Image
            className={styles.image}
            fill
            sizes="(min-width: 0px) 50vw"
            priority
            src={coins}
            alt="Moedas douradas empilhadas"
          />
        </div>
      </main>
    </>
  );
}

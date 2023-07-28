'use client';

import { useState } from 'react';

import styles from './AsideMenu.module.css';
import Buttons from './Buttons/Buttons';
import SignoutButton from './SignoutButton/SignoutButton';

export default function AsideMenu() {
  const loadingOnState = useState<string | null>(null);

  return (
    <aside className={styles.asideMenu}>
      <div className={styles.buttons}>
        <Buttons
          buttonClassName={(isActive) =>
            [styles.button, isActive && styles.active].join(' ')
          }
          loadingOnState={loadingOnState}
        />
      </div>

      <div className={styles.bottomButtons}>
        <SignoutButton buttonClassName={styles.button} loadingOnState={loadingOnState} />
      </div>
    </aside>
  );
}

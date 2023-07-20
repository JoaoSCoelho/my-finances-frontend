import { AuthContext } from '@/contexts/auth';
import Image from 'next/image';
import { useContext } from 'react';
import { Popup } from 'reactjs-popup';

import defaultUser from '../../assets/default-user.png';
import styles from './Header.module.css';

export default function Header() {
  const auth = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.profileField}>
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <Image
              src={(auth.user?.profileImageURL as string | undefined) || defaultUser}
              alt={`Imagem de perfil de ${auth.user?.username}`}
              width={50}
              height={50}
            />
          </div>

          <Popup
            trigger={<div className={styles.username}>{auth.user?.username}</div>}
            on="hover"
            position="bottom center"
            arrow
            arrowStyle={{ color: 'var(--light-silver)' }}
            contentStyle={{
              backgroundColor: 'var(--light-silver)',
              color: 'var(--font-color)',
              padding: '.5em .8em',
            }}
          >
            {auth.user?.username}
          </Popup>
        </div>
      </div>
    </header>
  );
}

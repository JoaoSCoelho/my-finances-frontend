import { useMe } from '@/hooks/useMe';
import Image from 'next/image';
import { Popup } from 'reactjs-popup';

import defaultUser from '../../assets/default-user.png';
import styles from './Header.module.css';

export default function Header() {
  const { user } = useMe();

  return (
    <header className={styles.header}>
      <div className={styles.profileField}>
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <Image
              src={(user?.profileImageURL as string | undefined) || defaultUser}
              alt={`Imagem de perfil de ${user?.username}`}
              width={50}
              height={50}
            />
          </div>

          <Popup
            trigger={<div className={styles.username}>{user?.username}</div>}
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
            {user?.username}
          </Popup>
        </div>
      </div>
    </header>
  );
}

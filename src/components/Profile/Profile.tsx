'use client';

import { useMe } from '@/hooks/useMe';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { Popup } from 'reactjs-popup';

import defaultUser from '../../assets/default-user.png';
import styles from './Profile.module.css';

export default function Profile() {
  const { user } = useMe();

  return (
    <div className={styles.profile}>
      {user ? (
        <>
          <div className={styles.profileImage}>
            <Image
              src={user.profileImageURL || defaultUser}
              alt={`Imagem de perfil de ${user.username}`}
              width={50}
              height={50}
            />
          </div>

          <Popup
            trigger={<div className={styles.username}>{user.username}</div>}
            on="hover"
            position="bottom center"
            arrowStyle={{ color: 'var(--light-silver)' }}
            contentStyle={{
              backgroundColor: 'var(--light-silver)',
              color: 'var(--font-color)',
              padding: '.5em .8em',
            }}
          >
            {user.username}
          </Popup>
        </>
      ) : (
        <>
          <Skeleton height={53} width={53} circle />
          <div style={{ width: '100%' }}>
            <Skeleton />
          </div>
        </>
      )}
    </div>
  );
}

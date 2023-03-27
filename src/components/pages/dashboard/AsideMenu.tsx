import { AuthContext } from '@/contexts/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';

import styles from './AsideMenu.module.css';

export default function AsideMenu() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const signout = () => {
    auth.signout();
    router.push('/');
  };

  return (
    <aside className={styles.asideMenu}>
      <div className={styles.buttons}>
        <Link href="/dashboard" className={`${styles.button} ${styles.active}`}>
          <AiFillHome />
        </Link>
      </div>

      <div className={styles.bottomButtons}>
        <button
          type="button"
          onClick={signout}
          className={`${styles.button} ${styles.logout}`}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </aside>
  );
}

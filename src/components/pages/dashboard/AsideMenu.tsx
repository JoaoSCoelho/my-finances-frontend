import { AuthContext } from '@/contexts/auth';
import { LoadingContext } from '@/contexts/loading';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, ReactNode } from 'react';
import { AiFillHome, AiOutlineUnorderedList } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';

import styles from './AsideMenu.module.css';

type Button = {
  href: string;
  icon: ReactNode;
};

export default function AsideMenu() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading } = useContext(LoadingContext);

  const signout = () => {
    auth.signout();
    router.push('/');
  };

  const buttons: Button[] = [
    {
      href: '/dashboard',
      icon: <AiFillHome />,
    },
    {
      href: '/dashboard/transactions',
      icon: <AiOutlineUnorderedList />,
    },
  ];

  return (
    <aside className={styles.asideMenu}>
      <div className={styles.buttons}>
        {buttons.map((button) => (
          <Link
            onClick={() => {
              pathname !== button.href && setLoading('');
            }}
            key={button.href}
            href={button.href}
            className={`${styles.button} ${
              pathname === button.href && styles.active
            }`}
          >
            {button.icon}
          </Link>
        ))}
      </div>

      <div className={styles.bottomButtons}>
        <button
          type="button"
          onClick={() => {
            setLoading('Saindo...', true);
            signout();
          }}
          className={`${styles.button} ${styles.logout}`}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </aside>
  );
}

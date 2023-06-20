import { AuthContext } from '@/contexts/auth';
import { LoadingContext } from '@/contexts/loading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, ReactNode, useState, useEffect } from 'react';
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
  const [pathname, setPathname] = useState<string>();
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

  useEffect(() => {
    setPathname(window.location.pathname);
  });

  useEffect(() => setLoading(), []);

  return (
    <aside className={styles.asideMenu}>
      <div className={styles.buttons}>
        {buttons.map((button) => (
          <Link
            onClick={() => {
              setPathname(button.href);
              setLoading('');
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
          onClick={signout}
          className={`${styles.button} ${styles.logout}`}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </aside>
  );
}

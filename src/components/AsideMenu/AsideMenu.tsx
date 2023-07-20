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

  return (
    <aside className={styles.asideMenu}>
      <div className={styles.buttons}>
        <Buttons_Local />
      </div>

      <div className={styles.bottomButtons}>
        <SignoutButton_Local />
      </div>
    </aside>
  );

  function Buttons_Local() {
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
      <>
        {buttons.map((button) => (
          <Link
            onClick={() => (pathname !== button.href ? setLoading('') : router.refresh())}
            key={button.href}
            href={button.href}
            className={[styles.button, pathname === button.href && styles.active].join(' ')}
          >
            {button.icon}
          </Link>
        ))}
      </>
    );
  }

  function SignoutButton_Local() {
    return (
      <button
        type="button"
        onClick={onSignoutClick}
        className={[styles.button, styles.logout].join(' ')}
      >
        <FaSignOutAlt />
      </button>
    );

    function signout() {
      auth.signout();
      router.push('/');
    }

    function onSignoutClick() {
      setLoading('Saindo...', true);
      signout();
    }
  }
}

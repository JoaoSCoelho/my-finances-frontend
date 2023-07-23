'use client';

import { AuthContext } from '@/contexts/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, ReactNode, useState } from 'react';
import { AiFillHome, AiOutlineUnorderedList } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';

import Loading from '../Loading/Loading';
import styles from './AsideMenu.module.css';

type Button = {
  href: string;
  icon: ReactNode;
};

export default function AsideMenu() {
  const [loadingOn, setLoadingOn] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

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

  // functions

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
            onClick={() =>
              pathname === button.href ? setLoadingOn(null) : setLoadingOn(button.href)
            }
            key={button.href}
            href={button.href}
            className={[styles.button, pathname === button.href && styles.active].join(
              ' ',
            )}
          >
            {loadingOn === button.href ? <Loading /> : button.icon}
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
        {loadingOn === 'exit' ? <Loading /> : <FaSignOutAlt />}
      </button>
    );

    function signout() {
      auth.signout();
      router.push('/');
    }

    function onSignoutClick() {
      setLoadingOn('exit');
      signout();
    }
  }
}

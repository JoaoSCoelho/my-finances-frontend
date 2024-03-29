import Loading from '@/components/Loading/Loading';
import { AuthContext } from '@/contexts/auth';
import { UseStateReturn } from '@/types/UseStateReturn';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import styles from './SignoutButton.module.css';

interface ISignoutButtonProps {
  loadingOnState: UseStateReturn<string | null>;
  buttonClassName?: string;
}

export default function SignoutButton({
  loadingOnState: [loadingOn, setLoadingOn],
  buttonClassName,
}: ISignoutButtonProps) {
  const auth = useContext(AuthContext);
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={onSignoutClick}
      title="Sair"
      className={[buttonClassName, styles.button, styles.signout].join(' ')}
    >
      {loadingOn === 'exit' ? <Loading /> : <FaSignOutAlt />}
    </button>
  );

  // ------------ Functions ------------

  function signout() {
    auth.signout();
    router.push('/');
  }

  function onSignoutClick() {
    setLoadingOn('exit');
    signout();
  }
}

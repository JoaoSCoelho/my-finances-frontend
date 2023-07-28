import { IoClose } from 'react-icons/io5';

import styles from './Header.module.css';

interface IHeaderProps {
  close: () => any;
}

export default function Header({ close }: IHeaderProps) {
  return (
    <header className={styles.header}>
      <button className={styles.closeBtn} type="button" onClick={close}>
        <IoClose />
      </button>
    </header>
  );
}

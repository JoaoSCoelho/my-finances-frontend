import Profile from '../Profile/Profile';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.profileField}>
        <Profile />
      </div>
    </header>
  );
}

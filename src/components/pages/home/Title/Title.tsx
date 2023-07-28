import styles from './Title.module.css';

export default function Title() {
  return (
    <div className={styles.container}>
      <h1 className={styles.appName}>My Finances</h1>
    </div>
  );
}

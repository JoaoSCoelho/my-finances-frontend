import { PropsWithChildren } from 'react';

import styles from './ErrorAlert.module.css';

export default function ErrorAlert({ children }: PropsWithChildren) {
  return <span className={styles.error}>{children}</span>;
}

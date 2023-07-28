import { PropsWithChildren } from 'react';

import styles from './LoadingScreen.module.css';

interface ILoadingScreenProps extends PropsWithChildren {
  windowSize?: boolean;
  wrapperClassName?: string;
}

export default function LoadingScreen({
  children,
  wrapperClassName,
  windowSize = true,
}: ILoadingScreenProps) {
  return (
    <div
      className={[styles.wrapper, wrapperClassName, windowSize && styles.windowSize].join(
        ' ',
      )}
    >
      {children ?? <span className={styles.loadingText}>Carregando...</span>}
    </div>
  );
}

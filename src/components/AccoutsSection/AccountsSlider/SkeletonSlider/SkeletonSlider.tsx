import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import styles from './SkeletonSlider.module.css';

export default function SkeletonSlider() {
  return (
    <SkeletonTheme width={283} height={100} inline borderRadius="8px" baseColor="#e9e9e9">
      <div className={styles.container}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </SkeletonTheme>
  );
}

import styles from './Loading.module.css';
import { MoneyLoadingSvg } from './MoneyLoadingSvg';

interface ILoadingProps {
  text?: string;
}

export default function Loading(props: ILoadingProps) {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingContainer}>
        <MoneyLoadingSvg />
        <span className={styles.text}>{props.text}</span>
      </div>
    </div>
  );
}

import { FaHandHoldingUsd } from 'react-icons/fa';
import { ImLibrary } from 'react-icons/im';

import defaultBankImage from '../../assets/building-columns-solid.svg';
import BRLFormat from '../BRLFormat/BRLFormat';
import styles from './AccountCard.module.css';

interface IAccountCardProps {
  isTotal?: boolean;
  imageSrc?: string | null;
  name?: string;
  amount: number | string;
}

export default function AccountCard({
  isTotal = false,
  imageSrc,
  name,
  amount,
}: IAccountCardProps) {
  return (
    <div className={styles.accountCardWrapper}>
      <div
        className={`
          ${styles.accountCard}
          ${isTotal && styles.total}
          ${amount < 0 && styles.negative}
        `}
      >
        <div className={styles.accountImage}>
          {isTotal ? (
            <FaHandHoldingUsd />
          ) : imageSrc ? (
            <img src={imageSrc || defaultBankImage} alt={name + ' logo'} />
          ) : (
            <ImLibrary />
          )}
        </div>
        <div className={styles.accountInfo}>
          <span className={styles.accountName}>{isTotal ? 'Total' : name}</span>
          <strong className={styles.accountAmount}>
            <BRLFormat value={amount} />
          </strong>
        </div>
      </div>
    </div>
  );
}

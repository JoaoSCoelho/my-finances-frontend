import { IBankAccountObject } from '@/types/BankAccount';

import styles from './BankAccountTag.module.css';

interface IBankAccountTagProps {
  bankAccount?: IBankAccountObject;
}

export default function BankAccountTag({ bankAccount }: IBankAccountTagProps) {
  return (
    <div className={styles.bankAccountTag}>
      {bankAccount?.imageURL && (
        <img src={bankAccount?.imageURL} alt={bankAccount?.name} />
      )}
      {bankAccount?.name}
    </div>
  );
}

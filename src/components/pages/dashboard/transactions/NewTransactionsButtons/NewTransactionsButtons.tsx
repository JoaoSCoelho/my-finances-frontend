import NewTransactionButton from '@/components/NewTransactionButton/NewTransactionButton';
import { ITransactionObject, TransactionTypes } from '@/types/Transaction';
import { UseStateReturn } from '@/types/UseStateReturn';

import styles from './NewTransactionsButtons.module.css';

interface INewTransactionsButtonsProps {
  newTransactionState: UseStateReturn<ITransactionObject | undefined>;
}

export default function NewTransactionsButtons({
  newTransactionState,
}: INewTransactionsButtonsProps) {
  const buttonsTypes: TransactionTypes[] = ['income', 'expense', 'transfer'];

  return (
    <div className={styles.container}>
      {buttonsTypes.map((buttonType, idx) => (
        <NewTransactionButton
          key={`new-transaction-${buttonType}-button-${idx}`}
          buttonType={buttonType}
          newTransactionState={newTransactionState}
        />
      ))}
    </div>
  );
}

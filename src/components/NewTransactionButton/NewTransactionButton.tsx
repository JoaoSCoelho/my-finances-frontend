import { ITransactionObject, TransactionTypes } from '@/types/Transaction';
import { UseStateReturn } from '@/types/UseStateReturn';
import { BiArrowFromBottom, BiArrowToBottom, BiTransferAlt } from 'react-icons/bi';

import styles from './NewTransactionButton.module.css';

interface INewTransactionButtonProps {
  newTransactionState: UseStateReturn<ITransactionObject | undefined>;
  buttonType: TransactionTypes;
}

export default function NewTransactionButton({
  newTransactionState: [newTransaction, setNewTransaction],
  buttonType,
}: INewTransactionButtonProps) {
  return (
    <button
      className={[styles.button, styles[buttonType]].join(' ')}
      onClick={() =>
        setNewTransaction({
          id: 'new-transaction',
          type: buttonType,
          amount: undefined,
          createdTimestamp: Date.now(),
          gain: undefined,
          spent: undefined,
          title: '',
          bankAccountId: undefined,
          giverBankAccountId: undefined,
          receiverBankAccountId: undefined,
        })
      }
      type="button"
      disabled={!!newTransaction}
    >
      {buttonType === 'income' ? (
        <>
          <BiArrowToBottom /> Receita
        </>
      ) : buttonType === 'expense' ? (
        <>
          <BiArrowFromBottom /> Despesa
        </>
      ) : (
        <>
          <BiTransferAlt /> Transferência
        </>
      )}
    </button>
  );
}

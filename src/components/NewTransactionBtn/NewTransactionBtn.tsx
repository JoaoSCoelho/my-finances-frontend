import { ITransactionObject, TransactionTypes } from '@/types/Transaction';
import { Dispatch, SetStateAction } from 'react';
import { BiArrowFromBottom, BiArrowToBottom, BiTransferAlt } from 'react-icons/bi';

import styles from './NewTransactionBtn.module.css';

interface INewTransactionBtnProps {
  newTransaction?: ITransactionObject;
  buttonType: TransactionTypes;
  setNewTransaction: Dispatch<SetStateAction<ITransactionObject | undefined>>;
}

export default function NewTransactionBtn({
  newTransaction,
  buttonType,
  setNewTransaction,
}: INewTransactionBtnProps) {
  return (
    <button
      className={`${styles.button} ${styles[buttonType]}`}
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

import { ITransactionObject } from '@/types/Transaction';
import { Dispatch, SetStateAction } from 'react';

interface INewTransactionBtnProps {
  newTransaction?: Omit<ITransactionObject, 'id'>;
  buttonType: 'income' | 'expense' | 'transfer';
  setNewTransaction: Dispatch<
    SetStateAction<Omit<ITransactionObject, 'id'> | undefined>
  >;
}

export default function NewTransactionBtn({
  newTransaction,
  buttonType,
  setNewTransaction,
}: INewTransactionBtnProps) {
  return (
    <button
      onClick={() =>
        setNewTransaction({
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
      {buttonType === 'income'
        ? '+ Receita'
        : buttonType === 'expense'
        ? '- Despesa'
        : '⇌ Transferência'}
    </button>
  );
}

import { useMyBankAccounts } from '@/hooks/useMyBankAccounts';
import { useMyTransactions } from '@/hooks/useMyTransactions';
import { ITransactionObject } from '@/types/Transaction';
import { UseStateReturn } from '@/types/UseStateReturn';

import TransactionCard from '../TransactionCard/TransactionCard';
import TransactionsListSkeleton from './TransactionsListSkeleton/TransactionsListSkeleton';

interface ITransactionsListProps {
  newTransactionState: UseStateReturn<ITransactionObject | undefined>;
}

export default function TransactionsList({
  newTransactionState: [newTransaction, setNewTransaction],
}: ITransactionsListProps) {
  const { bankAccounts } = useMyBankAccounts();
  const { transactions } = useMyTransactions();

  if (!bankAccounts || !transactions) {
    return <TransactionsListSkeleton />;
  }

  return (
    <ul>
      {newTransaction && (
        <li>
          <TransactionCard
            bankAccounts={bankAccounts}
            transaction={newTransaction}
            setNewTransaction={setNewTransaction}
            editable
          />
        </li>
      )}
      {transactions!
        .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
        .map((transaction) => (
          <li key={transaction.id || 'new-transaction'}>
            <TransactionCard
              bankAccounts={bankAccounts}
              transaction={transaction}
              setNewTransaction={setNewTransaction}
              editable={transaction.id !== 'new-transaction'}
            />
          </li>
        ))}
    </ul>
  );
}

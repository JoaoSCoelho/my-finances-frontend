'use client';

import NewTransactionBtn from '@/components/NewTransactionBtn/NewTransactionBtn';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import TransactionCard from '@/components/TransactionCard/TransactionCard';
import { LoadingContext } from '@/contexts/loading';
import { useMyBankAccounts } from '@/hooks/useMyBankAccounts';
import { useMyTransactions } from '@/hooks/useMyTransactions';
import { ITransactionObject, TransactionTypes } from '@/types/Transaction';
import { useContext, useState } from 'react';

import styles from './Transactions.module.css';

export default function Transactions() {
  const [newTransaction, setNewTransaction] = useState<Omit<ITransactionObject, 'id'>>();
  const { setLoading } = useContext(LoadingContext);
  const {
    bankAccounts,
    error: bankAccountsError,
    isLoading: bankAccountsIsLoading,
  } = useMyBankAccounts();
  const {
    transactions,
    error: transactionsError,
    isLoading: transactionsIsLoading,
  } = useMyTransactions();

  if (
    bankAccountsIsLoading ||
    bankAccountsError ||
    transactionsError ||
    transactionsIsLoading
  ) {
    // Trocar por skeleton
    setLoading('');
    return <></>;
  } else {
    setLoading();
  }

  return (
    <>
      <SectionHeader title="Transferências" />

      <NewTransactionsButtons_Local />
      <ul>
        {newTransaction && (
          <TransactionCard
            bankAccounts={bankAccounts!}
            transaction={newTransaction}
            setNewTransaction={setNewTransaction}
            editable
          />
        )}
        {transactions!
          .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
          .map((transaction) => (
            <li key={transaction.id}>
              <TransactionCard
                bankAccounts={bankAccounts!}
                transaction={transaction}
                setNewTransaction={setNewTransaction}
                editable={!!transaction.id}
              />
            </li>
          ))}
      </ul>
    </>
  );

  // local components

  function NewTransactionsButtons_Local() {
    const buttonsTypes: TransactionTypes[] = ['income', 'expense', 'transfer'];

    return (
      <div className={styles.newTransactionButtonsContainer}>
        {buttonsTypes.map((buttonType, idx) => (
          <NewTransactionBtn
            key={`new-transaction-${buttonType}-button-${idx}`}
            buttonType={buttonType}
            newTransaction={newTransaction}
            setNewTransaction={setNewTransaction}
          />
        ))}
      </div>
    );
  }
}

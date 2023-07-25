'use client';

import NewTransactionsButtons from '@/components/pages/dashboard/transactions/NewTransactionsButtons/NewTransactionsButtons';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import TransactionsList from '@/components/TransactionsList/TransactionsList';
import { ITransactionObject } from '@/types/Transaction';
import { useState } from 'react';

export default function Transactions() {
  const newTransactionState = useState<ITransactionObject>();

  return (
    <>
      <SectionHeader title="Transferências" />

      <NewTransactionsButtons newTransactionState={newTransactionState} />

      <TransactionsList newTransactionState={newTransactionState} />
    </>
  );
}

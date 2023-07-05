'use client';

import TransactionCard from '@/components/TransactionCard';
import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { IBankAccountObject } from '@/types/BankAccount';
import { IExpenseObject } from '@/types/Expense';
import { IIncomeObject } from '@/types/Income';
import { ITransactionObject } from '@/types/Transaction';
import { ITransferObject } from '@/types/Transfer';
import { useContext, useEffect, useState } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState<ITransactionObject[]>([]);
  const [bankAccounts, setBankAccounts] = useState<IBankAccountObject[]>([]);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const accessToken = getAccessToken();

    api
      .get('bankaccounts/my', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => setBankAccounts(response.data.bankAccounts));

    async function exec() {
      const newTransactions: ITransactionObject[] = [];

      await api
        .get('transactions/expenses', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) =>
          newTransactions.push(
            ...response.data.expenses.map((expense: IExpenseObject) => ({
              ...expense,
              type: 'expense',
            })),
          ),
        );

      await api
        .get('transactions/incomes', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) =>
          newTransactions.push(
            ...response.data.incomes.map((income: IIncomeObject) => ({
              ...income,
              type: 'income',
            })),
          ),
        );

      await api
        .get('transactions/transfers', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) =>
          newTransactions.push(
            ...response.data.transfers.map((transfer: ITransferObject) => ({
              ...transfer,
              type: 'transfer',
            })),
          ),
        );

      setTransactions(newTransactions);
    }

    exec();
  }, []);

  return (
    <ul>
      {transactions
        .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
        .map((transaction) => (
          <li key={transaction.id}>
            <TransactionCard
              bankAccounts={bankAccounts}
              transaction={transaction}
            />
          </li>
        ))}
    </ul>
  );
}

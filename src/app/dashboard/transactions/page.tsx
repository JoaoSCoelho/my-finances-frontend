'use client';

import NewTransactionBtn from '@/components/pages/dashboard/transactions/NewTransactionBtn';
import TransactionCard from '@/components/TransactionCard';
import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { IBankAccountObject } from '@/types/BankAccount';
import { IExpenseObject } from '@/types/Expense';
import { IIncomeObject } from '@/types/Income';
import { ITransactionObject } from '@/types/Transaction';
import { ITransferObject } from '@/types/Transfer';
import { useContext, useEffect, useState } from 'react';

import styles from './Transactions.module.css';

export default function Transactions() {
  const [transactions, setTransactions] = useState<ITransactionObject[]>([]);
  const [bankAccounts, setBankAccounts] = useState<IBankAccountObject[]>([]);
  const [newTransaction, setNewTransaction] =
    useState<Omit<ITransactionObject, 'id'>>();

  const { getAccessToken } = useContext(AuthContext);

  const accessToken = getAccessToken();

  async function setDbTransactions() {
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

  useEffect(() => {
    api
      .get('bankaccounts/my', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => setBankAccounts(response.data.bankAccounts));

    setDbTransactions();
  }, []);

  return (
    <>
      <div className={styles.newTransactionButtonsContainer}>
        <NewTransactionBtn
          buttonType="income"
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
        />
        <NewTransactionBtn
          buttonType="expense"
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
        />
        <NewTransactionBtn
          buttonType="transfer"
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
        />
      </div>
      <ul>
        {newTransaction && (
          <TransactionCard
            bankAccounts={bankAccounts}
            transaction={newTransaction}
            setTransactions={setTransactions as any}
            setNewTransaction={setNewTransaction}
            setDbTransactions={setDbTransactions}
            editable
          />
        )}
        {transactions
          .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
          .map((transaction) => (
            <li key={transaction.id}>
              <TransactionCard
                bankAccounts={bankAccounts}
                transaction={transaction}
                setTransactions={setTransactions as any}
                setNewTransaction={setNewTransaction}
                editable={!!transaction.id}
                setDbTransactions={setDbTransactions}
              />
            </li>
          ))}
      </ul>
    </>
  );
}

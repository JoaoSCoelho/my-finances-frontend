import { AuthContext } from '@/contexts/auth';
import { useMyTransactions } from '@/hooks/useMyTransactions';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { IBankAccountObject } from '@/types/BankAccount';
import { SetState } from '@/types/SetState';
import { ITransactionObject, TransactionTypes } from '@/types/Transaction';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import BankAccountInfo from './BankAccountInfo/BankAccountInfo';
import DeleteButton from './DeleteButton/DeleteButton';
import EditButton from './EditButton/EditButton';
import MoneyValue from './MoneyValue/MoneyValue';
import SaveButton from './SaveButton/SaveButton';
import Title from './Title/Title';
import styles from './TransactionCard.module.css';
import TransactionSymbol from './TransactionSymbol/TransactionSymbol';
import { transactionSchemas } from './yup';

interface ITransactionCardProps {
  transaction: ITransactionObject;
  bankAccounts: IBankAccountObject[];
  editable?: boolean;
  setNewTransaction: SetState<ITransactionObject<TransactionTypes> | undefined>;
}

export interface ITransactionForm<T extends TransactionTypes = TransactionTypes> {
  title: string;
  amount: T extends 'transfer' ? number : undefined;
  spent: T extends 'expense' ? number : undefined;
  gain: T extends 'income' ? number : undefined;
  bankAccountId: T extends 'transfer' ? undefined : string;
  giverBankAccountId: T extends 'transfer' ? string : undefined;
  receiverBankAccountId: T extends 'transfer' ? string : undefined;
}

dayjs.extend(localizedFormat);

export default function TransactionCard({
  transaction,
  bankAccounts,
  setNewTransaction,
  editable = false,
}: ITransactionCardProps) {
  const isNew = transaction.id === 'new-transaction';
  const [canEdit, setCanEdit] = useState(isNew && editable);

  const {
    transactions,
    offMutate: offMutateTransactions,
    revalidate: revalidateTransactions,
    refetch: refetchTransactions,
  } = useMyTransactions();

  const { getAuthConfig } = useContext(AuthContext);

  const form = useForm<ITransactionForm<typeof transaction.type>>({
    defaultValues: transaction,
    resolver: yupResolver(transactionSchemas[transaction.type]),
  });
  const { handleSubmit } = form;

  // ------------ Functions ------------

  const onSubmit: SubmitHandler<ITransactionForm<typeof transaction.type>> = (data) => {
    saveIt(data);

    if (isNew) {
      offMutateTransactions([...(transactions || []), { ...transaction, ...data }]);
      setNewTransaction(undefined);
    } else {
      offMutateTransactions([
        ...(transactions?.filter((t) => t.id !== transaction.id) || []),
        { ...transaction, ...data },
      ]);
      setCanEdit(false);
    }
  };

  const onDiscard = async () => {
    if (isNew) {
      setNewTransaction(undefined);
    } else {
      deleteIt();

      offMutateTransactions([
        ...(transactions?.filter((t) => t.id !== transaction.id) || []),
      ]);
    }
  };

  async function saveIt(data: ITransactionForm<TransactionTypes>) {
    const requestMethod = isNew ? 'post' : 'put';
    const requestBaseURL = `/transactions/${transaction.type}s`;
    const requestURLParams = isNew ? '' : transaction.id;
    const requestURL = requestBaseURL + '/' + requestURLParams;

    try {
      await api[requestMethod](requestURL, data, getAuthConfig());
      return await revalidateTransactions();
    } catch (error: any) {
      const requestAction = isNew ? 'criar' : 'modificar';

      refetchTransactions();
      toast.error(
        `Erro ao ${requestAction} transação: ${
          error.response?.data?.error || 'Erro inesperado'
        }`,
        defaultToastOptions,
      );
    }
  }

  async function deleteIt() {
    try {
      await api.delete(
        `/transactions/${transaction.type}s/${transaction.id}`,
        getAuthConfig(),
      );
      return await revalidateTransactions();
    } catch (error: any) {
      refetchTransactions();
      toast.error(
        `Erro ao deletar transação: ${error.response?.data?.error || 'Erro inesperado'}`,
        defaultToastOptions,
      );
    }
  }

  // ------------ Return ------------

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={[styles.container, styles[transaction.type]].join(' ')}
    >
      {canEdit && (
        <DeleteButton
          onClick={onDiscard}
          containerClassName={styles.deleteButtonContainer}
        />
      )}

      <div className={styles.contentContainer}>
        <TransactionSymbol type={transaction.type} />

        <div>
          <Title canEdit={canEdit} form={form} transaction={transaction} />

          <div className={styles.contentInfo}>
            <MoneyValue canEdit={canEdit} form={form} transaction={transaction} />

            <BankAccountInfo
              bankAccounts={bankAccounts}
              canEdit={canEdit}
              form={form}
              transaction={transaction}
            />

            <div className={styles.date}>
              {dayjs(transaction.createdTimestamp).format('DD/MM/YYYY LT')}
            </div>
          </div>
        </div>
      </div>

      {canEdit && <SaveButton containerClassName={styles.saveButtonContainer} />}

      {editable && !isNew && !canEdit && (
        <EditButton
          setCanEdit={setCanEdit}
          containerClassName={styles.editButtonContainer}
        />
      )}
    </form>
  );
}

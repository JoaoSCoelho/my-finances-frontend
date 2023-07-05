import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { IBankAccountObject } from '@/types/BankAccount';
import { ITransactionObject, TransactionTypes } from '@/types/Transaction';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';
import {
  BiArrowFromBottom,
  BiArrowToBottom,
  BiPencil,
  BiTransferAlt,
} from 'react-icons/bi';
import { FiSave, FiTrash2 } from 'react-icons/fi';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { toast } from 'react-toastify';
import * as yup from 'yup';

dayjs.extend(localizedFormat);

import ControlledBRLFormat from './ControlledBRLFormat';
import styles from './TransactionCard.module.css';

interface ITransactionCardProps {
  transaction: Omit<ITransactionObject, 'id'> & { id?: string };
  bankAccounts: IBankAccountObject[];
  editable?: boolean;
  setTransactions: Dispatch<
    SetStateAction<(Omit<ITransactionObject, 'id'> & { id?: string })[]>
  >;
  setNewTransaction: Dispatch<
    SetStateAction<Omit<ITransactionObject<TransactionTypes>, 'id'> | undefined>
  >;
  setDbTransactions: () => Promise<void>;
}

interface ITransactionForm<T extends TransactionTypes = TransactionTypes> {
  title: string;
  amount: T extends 'transfer' ? number : undefined;
  spent: T extends 'expense' ? number : undefined;
  gain: T extends 'income' ? number : undefined;
  bankAccountId: T extends 'transfer' ? undefined : string;
  giverBankAccountId: T extends 'transfer' ? string : undefined;
  receiverBankAccountId: T extends 'transfer' ? string : undefined;
}

const transactionTitleSchema = yup
  .string()
  .required('Campo obrigatório')
  .min(3, 'Mínimo de 3 caracteres')
  .max(50, 'Máximo de 50 caracteres')
  .matches(
    /^[\dA-Za-záàâãäéèêëíïìîóôõöòúùûüçñÁÀÂÃÄÉÈÊËÍÏÌÎÓÔÕÖÒÚÙÛÜÇÑ !@#$%¨&*_()+=\-:/'",§<>.|`´^~ºª?°]+$/gi,
    'Pode ter apenas caracteres alfanuméricos (alguns deles acentuados), espaços, underlines e alguns caracteres especiais',
  );

const noNegativeAmountSchema = yup
  .number()
  .required('Campo obrigatório')
  .min(0, 'Minimo: 0')
  .max(999999999999, 'Máximo: 1 trilhão');

const IDSchema = yup
  .string()
  .required('Campo obrigatório')
  .length(21, 'Selecione uma conta');

const transferSchema = yup.object({
  title: transactionTitleSchema,
  amount: noNegativeAmountSchema,
  giverBankAccountId: IDSchema,
  receiverBankAccountId: IDSchema,
});

const incomeSchema = yup.object({
  title: transactionTitleSchema,
  gain: noNegativeAmountSchema,
  bankAccountId: IDSchema,
});

const expenseSchema = yup.object({
  title: transactionTitleSchema,
  spent: noNegativeAmountSchema,
  bankAccountId: IDSchema,
});

export default function TransactionCard({
  transaction,
  bankAccounts,
  setTransactions,
  setNewTransaction,
  setDbTransactions,
  editable = false,
}: ITransactionCardProps) {
  const bankAccount = bankAccounts.find(
    (bankAccount) => bankAccount.id === transaction.bankAccountId,
  );
  const giverBankAccount = bankAccounts.find(
    (bankAccount) => bankAccount.id === transaction.giverBankAccountId,
  );
  const receiverBankAccount = bankAccounts.find(
    (bankAccount) => bankAccount.id === transaction.receiverBankAccountId,
  );
  const { getAccessToken } = useContext(AuthContext);
  const [isNew] = useState<boolean>(!transaction.id);
  const [canEdit, setCanEdit] = useState<boolean>(isNew && editable);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ITransactionForm<typeof transaction.type>>({
    defaultValues: transaction,
    resolver: yupResolver(
      transaction.type === 'transfer'
        ? transferSchema
        : transaction.type === 'income'
        ? incomeSchema
        : expenseSchema,
    ),
  });

  const onSubmit: SubmitHandler<ITransactionForm<typeof transaction.type>> = (
    data,
  ) => {
    api[isNew ? 'post' : 'put'](
      `/transactions/${transaction.type}s${isNew ? '' : `/${transaction.id}`}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
      .then(() =>
        toast.info(
          `Transação ${isNew ? 'criada' : 'modificada'} com sucesso!`,
          defaultToastOptions,
        ),
      )
      .catch((error) => {
        console.log(error.response?.data);
        toast.error(
          `Erro ao ${isNew ? 'criar' : 'modificar'} transação: ${
            error.response?.data?.error
          }`,
          defaultToastOptions,
        );
        toast.info('Recarregando em 5s', defaultToastOptions);

        setTimeout(() => setDbTransactions(), 5000);
      });

    if (isNew) {
      setTransactions((transactions) => [
        ...transactions,
        { ...data, type: transaction.type, createdTimestamp: Date.now() },
      ]);
      setNewTransaction(undefined);
    } else {
      setCanEdit(false);
      setTransactions((transactions) => [
        ...transactions.filter((t) => t.id !== transaction.id),
        {
          ...transaction,
          ...data,
        },
      ]);
    }
  };

  const onDelete = async () => {
    if (isNew) {
      setNewTransaction(undefined);
    } else {
      api
        .delete(`/transactions/${transaction.type}s/${transaction.id}`, {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        })
        .then(() =>
          toast.info('Transação deletada com sucesso!', defaultToastOptions),
        )
        .catch((error) => {
          console.log(error.response?.data);
          toast.error(
            `Erro ao deletar transação: ${error.response?.data?.error}`,
            defaultToastOptions,
          );
          toast.info('Recarregando em 5s', defaultToastOptions);

          setTimeout(() => setDbTransactions(), 5000);
        });

      setCanEdit(false);
      setTransactions((transactions) => [
        ...transactions.filter((t) => t.id !== transaction.id),
      ]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.container} ${styles[transaction.type]}`}
    >
      {canEdit && (
        <div className={styles.deleteButtonContainer}>
          <button onClick={() => onDelete()} type="button">
            <FiTrash2 />
          </button>
        </div>
      )}
      <div className={styles.contentContainer}>
        <div className={styles.typeSymbol}>
          {transaction.type === 'income' ? (
            <BiArrowToBottom />
          ) : transaction.type === 'expense' ? (
            <BiArrowFromBottom />
          ) : (
            <BiTransferAlt />
          )}
        </div>
        <div>
          {canEdit ? (
            <>
              <input
                {...register('title')}
                type="text"
                name="title"
                id="transaction-title"
                defaultValue={transaction.title}
                className={`${styles.title} ${styles.input}`}
                autoFocus
                placeholder="Título"
              />
              {errors.title && (
                <span className={styles.error}>{errors.title.message}</span>
              )}
            </>
          ) : (
            <strong className={styles.title}>{transaction.title}</strong>
          )}
          <div className={styles.contentInfo}>
            <div className={styles.moneyValue}>
              <ControlledBRLFormat
                control={control as unknown as Control}
                name={
                  transaction.type === 'expense'
                    ? 'spent'
                    : transaction.type === 'income'
                    ? 'gain'
                    : 'amount'
                }
                allowNegative={false}
                displayType={canEdit ? 'input' : 'text'}
                value={
                  transaction.type === 'expense'
                    ? transaction.spent
                    : transaction.type === 'income'
                    ? transaction.gain
                    : transaction.amount
                }
              />
              {(errors.gain || errors.spent || errors.amount) && (
                <span className={styles.error}>
                  {errors.gain?.message ||
                    errors.spent?.message ||
                    errors.amount?.message}
                </span>
              )}
            </div>
            <div className={styles.bankAccountInfo}>
              {transaction.type === 'transfer' ? (
                <>
                  {canEdit ? (
                    <select required {...register('giverBankAccountId')}>
                      <option hidden value="">
                        Banco de origem
                      </option>
                      {bankAccounts.map((bankAccount) => (
                        <option
                          key={`giver-${bankAccount.id}`}
                          value={bankAccount.id}
                        >
                          {bankAccount.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.bankAccount}>
                      {giverBankAccount!.imageURL && (
                        <img
                          src={giverBankAccount!.imageURL}
                          alt={giverBankAccount!.name}
                        />
                      )}
                      {giverBankAccount!.name}
                    </div>
                  )}
                  <HiArrowNarrowRight
                    className={styles.transferDirectionArrow}
                  />
                  {canEdit ? (
                    <select required {...register('receiverBankAccountId')}>
                      <option hidden value="">
                        Banco de destino
                      </option>
                      {bankAccounts.map((bankAccount) => (
                        <option
                          key={`receiver-${bankAccount.id}`}
                          value={bankAccount.id}
                        >
                          {bankAccount.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.bankAccount}>
                      {receiverBankAccount!.imageURL && (
                        <img
                          src={receiverBankAccount!.imageURL}
                          alt={receiverBankAccount!.name}
                        />
                      )}
                      {receiverBankAccount!.name}
                    </div>
                  )}
                </>
              ) : canEdit ? (
                <select required {...register('bankAccountId')}>
                  <option hidden value="">
                    Selecione um banco
                  </option>
                  {bankAccounts.map((bankAccount) => (
                    <option key={bankAccount.id} value={bankAccount.id}>
                      {bankAccount.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className={styles.bankAccount}>
                  {bankAccount!.imageURL && (
                    <img src={bankAccount!.imageURL} alt={bankAccount!.name} />
                  )}
                  {bankAccount!.name}
                </div>
              )}
              {(errors.bankAccountId ||
                errors.giverBankAccountId ||
                errors.receiverBankAccountId) && (
                <span className={styles.error}>
                  {errors.bankAccountId?.message ||
                    errors.giverBankAccountId?.message ||
                    errors.receiverBankAccountId?.message}
                </span>
              )}
            </div>

            <div className={styles.date}>
              {dayjs(transaction.createdTimestamp).format('DD/MM/YYYY LT')}
            </div>
          </div>
        </div>
      </div>
      {canEdit && (
        <div className={styles.saveButtonContainer}>
          <button type="submit">
            <FiSave />
          </button>
        </div>
      )}
      {editable && !isNew && !canEdit && (
        <div className={styles.editButtonContainer}>
          <button onClick={() => setCanEdit(true)} type="button">
            <BiPencil />
          </button>
        </div>
      )}
    </form>
  );
}

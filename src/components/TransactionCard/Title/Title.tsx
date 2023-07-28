import { ITransactionObject } from '@/types/Transaction';
import { UseFormReturn } from 'react-hook-form';

import ErrorAlert from '../ErrorAlert/ErrorAlert';
import { ITransactionForm } from '../TransactionCard';
import styles from './Title.module.css';

interface ITitleProps {
  canEdit: boolean;
  form: UseFormReturn<ITransactionForm>;
  transaction: ITransactionObject;
}

export default function Title({
  canEdit,
  form: {
    register,
    formState: { errors },
  },
  transaction,
}: ITitleProps) {
  return canEdit ? (
    <>
      <input
        {...register('title')}
        type="text"
        name="title"
        id="transaction-title"
        defaultValue={transaction.title}
        className={[styles.title, styles.input].join(' ')}
        autoFocus
        placeholder="Título"
      />
      {errors.title && <ErrorAlert>{errors.title.message}</ErrorAlert>}
    </>
  ) : (
    <strong className={styles.title}>{transaction.title}</strong>
  );
}

import ControlledBRLFormat from '@/components/BRLFormat/ControlledBRLFormat';
import { ITransactionObject } from '@/types/Transaction';
import { Control, UseFormReturn } from 'react-hook-form';

import ErrorAlert from '../ErrorAlert/ErrorAlert';
import { ITransactionForm } from '../TransactionCard';
import styles from './MoneyValue.module.css';

interface IMoneyValueProps {
  form: UseFormReturn<ITransactionForm>;
  transaction: ITransactionObject;
  canEdit: boolean;
}

export default function MoneyValue({
  form: {
    control,
    formState: { errors },
  },
  transaction,
  canEdit,
}: IMoneyValueProps) {
  return (
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
        <ErrorAlert>
          {errors.gain?.message || errors.spent?.message || errors.amount?.message}
        </ErrorAlert>
      )}
    </div>
  );
}

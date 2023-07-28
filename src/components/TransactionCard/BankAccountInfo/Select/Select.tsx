import { IBankAccountObject } from '@/types/BankAccount';
import { Path, UseFormReturn } from 'react-hook-form';

import { ITransactionForm } from '../../TransactionCard';
import styles from './Select.module.css';

interface ISelectProps {
  placeholder: string;
  form: UseFormReturn<ITransactionForm>;
  bankAccounts: IBankAccountObject[];
  name: string;
}

export default function Select({
  placeholder,
  form: { register },
  bankAccounts,
  name,
}: ISelectProps) {
  return (
    <select
      className={styles.select}
      required
      {...register(name as Path<ITransactionForm>)}
    >
      <option hidden value="">
        {placeholder}
      </option>
      {bankAccounts.map((bankAccount) => (
        <option key={`${name}-${bankAccount.id}`} value={bankAccount.id}>
          {bankAccount.name}
        </option>
      ))}
    </select>
  );
}

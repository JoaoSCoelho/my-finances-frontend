import { IBankAccountObject } from '@/types/BankAccount';
import { ITransactionObject } from '@/types/Transaction';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { HiArrowNarrowRight } from 'react-icons/hi';

import ErrorAlert from '../ErrorAlert/ErrorAlert';
import { ITransactionForm } from '../TransactionCard';
import styles from './BankAccountInfo.module.css';
import BankAccountTag from './BankAccountTag/BankAccountTag';
import Select from './Select/Select';

interface IBankAccountInfo {
  transaction: ITransactionObject;
  canEdit: boolean;
  form: UseFormReturn<ITransactionForm>;
  bankAccounts: IBankAccountObject[];
}

export default function BankAccountInfo({
  transaction,
  canEdit,
  form,
  bankAccounts,
}: IBankAccountInfo) {
  const bankAccount = bankAccounts.find(
    (bankAccount) => bankAccount.id === transaction.bankAccountId,
  );
  const giverBankAccount = bankAccounts.find(
    (bankAccount) => bankAccount.id === transaction.giverBankAccountId,
  );
  const receiverBankAccount = bankAccounts.find(
    (bankAccount) => bankAccount.id === transaction.receiverBankAccountId,
  );

  const {
    formState: { errors },
  } = form;

  return (
    <div className={styles.bankAccountInfo}>
      {transaction.type === 'transfer' ? (
        <>
          {canEdit ? (
            <Select
              bankAccounts={bankAccounts}
              form={form}
              name="giverBankAccountId"
              placeholder="Banco de origem"
            />
          ) : (
            <BankAccountTag bankAccount={giverBankAccount} />
          )}

          <HiArrowNarrowRight className={styles.transferDirectionArrow} />

          {canEdit ? (
            <Select
              bankAccounts={bankAccounts}
              form={form}
              name="receiverBankAccountId"
              placeholder="Banco de destino"
            />
          ) : (
            <BankAccountTag bankAccount={receiverBankAccount} />
          )}
        </>
      ) : canEdit ? (
        <Select
          bankAccounts={bankAccounts}
          form={form}
          name="bankAccountId"
          placeholder="Selecione um banco"
        />
      ) : (
        <BankAccountTag bankAccount={bankAccount} />
      )}
      {(errors.bankAccountId ||
        errors.giverBankAccountId ||
        errors.receiverBankAccountId) && (
        <ErrorAlert>
          {errors.bankAccountId?.message ||
            errors.giverBankAccountId?.message ||
            errors.receiverBankAccountId?.message}
        </ErrorAlert>
      )}
    </div>
  );
}

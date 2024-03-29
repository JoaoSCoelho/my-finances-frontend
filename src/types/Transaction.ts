import { IExpenseObject } from './Expense';
import { IIncomeObject } from './Income';
import { ITransferObject } from './Transfer';

export type TransactionTypes = 'expense' | 'income' | 'transfer';

export type TransactionObject =
  | (IExpenseObject & { type: 'expense' })
  | (IIncomeObject & { type: 'income' })
  | (ITransferObject & { type: 'transfer' });

export interface ITransactionObject<T extends TransactionTypes = TransactionTypes> {
  type: T;
  id: string;
  bankAccountId: T extends 'transfer' ? undefined : string;
  spent: T extends 'expense' ? number : undefined;
  gain: T extends 'income' ? number : undefined;
  amount: T extends 'transfer' ? number : undefined;
  description?: string;
  createdTimestamp: number;
  title: string;
  giverBankAccountId: T extends 'transfer' ? string : undefined;
  receiverBankAccountId: T extends 'transfer' ? string : undefined;
}

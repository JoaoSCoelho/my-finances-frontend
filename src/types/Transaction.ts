export interface ITransactionObject<
  T extends 'expense' | 'income' | 'transfer' =
    | 'expense'
    | 'income'
    | 'transfer',
> {
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

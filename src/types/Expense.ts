export interface IExpenseObject {
  id: string;
  bankAccountId: string;
  spent: number;
  description?: string;
  createdTimestamp: number;
  title: string;
}

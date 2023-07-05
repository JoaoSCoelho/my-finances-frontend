export interface ITransferObject {
  id: string;
  giverBankAccountId: string;
  receiverBankAccountId: string;
  amount: number;
  description?: string;
  createdTimestamp: number;
  title: string;
}

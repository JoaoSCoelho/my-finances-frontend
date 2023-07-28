export interface IBankAccountObject {
  id: string;
  userId: string;
  createdTimestamp: number;
  name: string;
  initialAmount: number;
  imageURL?: string;
}

export interface ITotalBankAccountObject extends IBankAccountObject {
  totalAmount: number;
}

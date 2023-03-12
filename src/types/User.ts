export interface IUserObject {
  id: string;
  username: string;
  email: string;
  hashPassword: string;
  createdTimestamp: number;
  confirmedEmail: boolean;
}

export type IClientUserObject = Omit<IUserObject, 'hashPassword'>;

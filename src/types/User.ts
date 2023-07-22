export interface IUserObject {
  id: string;
  username: string;
  email: string;
  createdTimestamp: number;
  confirmedEmail: boolean;
  profileImageURL?: string;
}

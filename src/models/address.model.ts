import { IUser } from "./user.model";

export interface IAddress {
  _id: string;
  userId: IUser;
  details: string;
}

import { IUser } from "./user.model";

export interface IPhone {
  _id: string;
  userId?: IUser;
  phoneNumber: string;
}

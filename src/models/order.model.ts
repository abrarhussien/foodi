import { IAddress } from "./address.model";
import { IOrderStatus } from "./orderStatus.model";
import { IPhone } from "./phone.model";
import { IUser } from "./user.model";

export interface IOrder {
  _id: string;
  addressId: IAddress;
  phoneId: IPhone;
  statusId: IOrderStatus;
  userId: IUser;
  createdAt: string;
}

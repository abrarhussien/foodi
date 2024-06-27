import { IProduct } from "./product.model";

export interface IItem {
  _id: string;
  productId: IProduct;
  quantity: number;
  orderId: string;
}

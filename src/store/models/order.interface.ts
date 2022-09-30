import { IProduct } from "./product.interface";

export interface IOrder {
    id: string;
    name: string;
    product: IProduct;
    amount: number;
    totalPrice: number;
}
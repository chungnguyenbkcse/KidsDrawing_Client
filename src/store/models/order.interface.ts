import { IProduct } from "./product.interface";

export interface IOrder {
    id: any;
    name: string;
    product: IProduct;
    amount: number;
    totalPrice: number;
}
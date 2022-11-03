export interface IProduct {
    id: any;
    name: string;
    category: string;
    description: string;
    amount: number;
    price: number;
    hasExpiryDate: boolean;
}

export enum ProductModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}
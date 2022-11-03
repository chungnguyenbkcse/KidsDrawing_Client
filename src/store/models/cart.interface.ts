export interface ICart {
    id: any;
    name: string;
    image: string;
    student_id: any;
    student_name: string;
    price: number;
    quantity: number;
}

export enum CartModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
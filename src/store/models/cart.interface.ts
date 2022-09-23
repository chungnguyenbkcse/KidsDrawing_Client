export interface ICart {
    id: number;
    name: string;
    image: string;
    student_id: number;
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
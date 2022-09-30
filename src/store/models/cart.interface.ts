export interface ICart {
    id: string;
    name: string;
    image: string;
    student_id: string;
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
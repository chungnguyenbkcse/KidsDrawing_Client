export interface IMyClass {
    id: number;
    creator_id: number;
    registration_id: number;
    security_code: string;
    name: string;
    create_time: string;
    update_time: string;

}

export enum MyClassModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
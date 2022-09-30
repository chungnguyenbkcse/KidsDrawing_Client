export interface IMyClass {
    id: string;
    creator_id: string;
    user_register_teach_semester: number;
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
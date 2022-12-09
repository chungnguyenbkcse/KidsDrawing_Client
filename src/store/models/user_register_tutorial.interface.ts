export interface IUserRegisterTutorial {
    id: any;
    name: string;
    number: number;
    teacher_name: string;
    class_id: number;
    class_name: string;
    status: string;
    create_time: string;
    update_time: string;
}

export enum UserRegisterTutorialModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
export interface IUserRegisterTutorial {
    id: any;
    section_id: number;
    creator_id: number;
    creator_name: string;
    section_name: string;
    section_number: number;
    class_id: number;
    class_name: string;
    name: string;
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
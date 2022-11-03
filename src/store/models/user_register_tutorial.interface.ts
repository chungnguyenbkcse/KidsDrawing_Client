export interface IUserRegisterTutorial {
    id: any;
    section_id: any;
    creator_id: any;
    creator_name: string;
    section_name: string;
    section_number: number;
    class_id: any;
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
export interface IUserRegisterTutorialPage {
    id: string;
    user_register_tutorial_id: string;
    name: string;
    description: string;
}

export enum UserRegisterTutorialPageModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
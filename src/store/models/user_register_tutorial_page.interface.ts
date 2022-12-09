export interface IUserRegisterTutorialPage {
    id: any;
    section_id: number;
    description: string;
    number: number;
}

export enum UserRegisterTutorialPageModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
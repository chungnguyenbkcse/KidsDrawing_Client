export interface ITutorialPage {
    id: any;
    section_id: number;
    description: string;
    number: number;
}

export enum TutorialPageModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
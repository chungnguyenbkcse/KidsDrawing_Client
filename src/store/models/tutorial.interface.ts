export interface ITutorial {
    id: number;
    section_id: number;
    creator_id: number;
    name: string;
    status: string;
    description: string;
    create_time: string;
    update_time: string;
}

export enum TutorialModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
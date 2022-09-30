export interface ITutorial {
    id: string;
    section_id: string;
    creator_id: string;
    creator_name: string;
    class_name: string;
    class_id: string;
    section_number: number;
    name: string;
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
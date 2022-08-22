export interface ISection {
    id: number;
    class_id: number;
    name: string;
    description: string;
    number: number;
    teach_form: boolean;
    recording: string;
    message: string;
}

export enum SectionModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
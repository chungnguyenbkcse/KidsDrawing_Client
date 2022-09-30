export interface ISection {
    id: string;
    class_id: string;
    name: string;
    number: number;
    teacher_name: string;
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
export interface ISection {
    id: any;
    class_id: number;
    name: string;
    status: string;
    time_approved: string;
    update_time: string;
    create_time: string;
    number: number;
    teacher_name: string;
    teach_form: boolean;
    recording: string;
    message: string;
    total_exercise_not_submit: number;
}

export enum SectionModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
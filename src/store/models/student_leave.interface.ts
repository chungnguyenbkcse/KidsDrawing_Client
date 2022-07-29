export interface IStudentLeave {
    id: number;
    section_id: number;
    class_id: number;
    student_id: number;
    reviewer_id: number;
    description: string;
    status: boolean;
    create_time: string;
    update_time: string;
}

export enum StudentLeaveModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
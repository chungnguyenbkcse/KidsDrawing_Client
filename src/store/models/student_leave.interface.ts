export interface IStudentLeave {
    id: number;
    section_id: number;
    section_name: string;
    class_id: number;
    class_name: string;
    section_number: number;
    student_id: number;
    student_name: string;
    reviewer_id: number;
    description: string;
    status: string;
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
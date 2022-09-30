export interface IStudentLeave {
    id: string;
    section_id: string;
    section_name: string;
    class_id: string;
    class_name: string;
    section_number: number;
    student_id: string;
    student_name: string;
    reviewer_id: string;
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
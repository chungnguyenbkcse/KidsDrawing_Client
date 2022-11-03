export interface IStudentLeave {
    id: any;
    section_id: any;
    section_name: string;
    class_id: any;
    class_name: string;
    section_number: number;
    student_id: any;
    student_name: string;
    reviewer_id: any;
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
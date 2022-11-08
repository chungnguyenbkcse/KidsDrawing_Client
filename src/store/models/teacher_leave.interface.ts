export interface ITeacherLeave {
    id: any;
    section_id: number;
    section_name: string;
    class_id: number;
    class_name: string;
    teacher_id: number;
    teacher_name: string;
    section_number: number;
    reviewer_id: number;
    substitute_teacher_id: number;
    substitute_teacher_name: string;
    description: string;
    status: string;
    create_time: string;
    update_time: string;
}

export enum TeacherLeaveModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
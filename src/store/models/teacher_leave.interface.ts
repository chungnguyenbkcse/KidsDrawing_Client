export interface ITeacherLeave {
    id: string;
    section_id: string;
    section_name: string;
    class_id: string;
    class_name: string;
    teacher_id: string;
    teacher_name: string;
    section_number: number;
    reviewer_id: string;
    substitute_teacher_id: string;
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
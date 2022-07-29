export interface ITeacherLeave {
    id: number;
    section_id: number;
    class_id: number;
    teacher_id: number;
    reviewer_id: number;
    substitute_teacher_id: number;
    description: string;
    status: boolean;
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
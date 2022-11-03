export interface ITeacherLeave {
    id: any;
    section_id: any;
    section_name: string;
    class_id: any;
    class_name: string;
    teacher_id: any;
    teacher_name: string;
    section_number: number;
    reviewer_id: any;
    substitute_teacher_id: any;
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
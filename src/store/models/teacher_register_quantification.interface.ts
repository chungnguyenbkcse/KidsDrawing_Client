export interface ITeacherRegisterQuantification {
    id: number;
    teacher_id: number;
    reviewer_id: number;
    course_id: number;
    degree_photo_url: string;
    status: string;
}

export enum TeacherRegisterQuantificationModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
export interface ITeacherRegisterQuantification {
    id: string;
    teacher_id: string;
    teacher_name: string;
    reviewer_id: string;
    course_id: string;
    course_name: string;
    art_age_name: string;
    art_type_name: string;
    art_level_name: string;
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
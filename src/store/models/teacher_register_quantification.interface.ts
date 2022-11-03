export interface ITeacherRegisterQuantification {
    id: any;
    teacher_id: any;
    teacher_name: string;
    reviewer_id: any;
    course_id: any;
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
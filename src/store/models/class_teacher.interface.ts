export interface IClassTeacher {
    id: string;
    name: string;
    course_id: string;
    link_url: string;
    semester_class_id: string;
    user_register_teach_semester: number;
    security_code: string;
    total_student: number;
    num_of_section: number;
    course_name: string;
    semester_name: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
}

export enum ClassTeacherModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
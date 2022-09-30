export interface IClassesStudent {
    id: string;
    name: string;
    link_url: string;
    student_id: string;
    student_name: string;
    teacher_name: string;
    teacher_id: string;
    course_id: string;
    semester_class_id: string;
    semester_class_name: string;
    user_register_teach_semester: number;
    security_code: string;
    total_student: number;
    total_section: number;
    course_name: string;
    semester_name: string;
    art_type_name: string;
    art_level_name: string;
    art_type_id: string;
    art_level_id: string;
    art_age_id: string;
    art_age_name: string;
    user_register_join_semester_id: string;
}

export enum ClassesStudentModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
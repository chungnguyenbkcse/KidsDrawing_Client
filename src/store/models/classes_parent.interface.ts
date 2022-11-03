export interface IClassesParent {
    id: any;
    name: string;
    link_url: string;
    student_id: any;
    student_name: string;
    teacher_name: string;
    teacher_id: any;
    course_id: any;
    semester_class_id: any;
    semester_class_name: string;
    user_register_teach_semester: number;
    security_code: string;
    total_student: number;
    total_section: number;
    course_name: string;
    semester_name: string;
    art_type_name: string;
    art_level_name: string;
    art_type_id: any;
    art_level_id: any;
    art_age_id: any;
    art_age_name: string;
}

export enum ClassesParentModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
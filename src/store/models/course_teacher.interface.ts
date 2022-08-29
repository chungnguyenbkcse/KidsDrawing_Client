export interface ICourseTeacher {
    id: number;
    name: string;
    course_name: string;
    course_id: number;
    semester_class_id: number;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    semester_name: string;
    image_url: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
    registration_deadline: string;
}

export enum CourseTeacherModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
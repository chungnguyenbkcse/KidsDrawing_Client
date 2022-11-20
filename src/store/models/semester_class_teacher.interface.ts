export interface ISemesterClassTeacher {
    id: any;
    name: string;
    course_name: string;
    course_id: number;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    semester_name: string;
    semester_id: number;
    image_url: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
    total_register: number;
    registration_deadline: string;
    status: string;
}

export enum SemesterClassTeacherModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
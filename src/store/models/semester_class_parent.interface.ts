export interface ISemesterClassParent {
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
    registration_expiration_time: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
    registration_deadline: string;
    student_name: string;
    student_id: number;
    start_date: string;
    status: string;
}

export enum SemesterClassParentModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
export interface ICourseStudent {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    image_url: string;
    is_enabled: boolean;
    creator_id: any;
    art_type_id: any;
    art_type_name: string;
    art_level_id: any;
    art_level_name: string;
    art_age_id: any;
    art_age_name: string;
    create_time: string;
    update_time: string;
}

export enum CourseStudentModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
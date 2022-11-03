export interface IContestParentNew{
    id: any;
    name: string;
    description: string;
    max_participant: number;
    total_register_contest: number;
    registration_time: string;
    image_url: string;
    start_time: string;
    end_time: string;
    is_enabled: boolean;
    creator_id: any;
    art_type_id: any;
    art_age_id: any;
    art_type_name: string;
    art_age_name: string;
    create_time: string;
    update_time: string;
    student_registered_name: string[];
    student_registered_id: any[];
}

export enum ContestParentNewModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
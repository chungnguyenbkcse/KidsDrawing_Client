export interface IContestParent{
    id: any;
    name: string;
    student_id: number;
    student_name: string;
    description: string;
    status: string;
    max_participant: number;
    total_register_contest: number;
    total_contest_submission: number;
    total_contest_submission_graded: number;
    registration_time: string;
    image_url: string;
    start_time: string;
    end_time: string;
    is_enabled: boolean;
    
    art_type_id: number;
    art_age_id: number;
    art_type_name: string;
    art_age_name: string;
    create_time: string;
    update_time: string;
}

export enum ContestParentModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
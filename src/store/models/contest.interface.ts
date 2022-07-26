export interface IContest {
    id: number;
    name: string;
    description: string;
    max_participant: number;
    registration_time: string;
    image_url: string;
    start_time: string;
    end_time: string;
    is_enabled: boolean;
    creator_id: number;
    art_type_id: number;
    art_age_id: number;
    create_time: string;
    update_time: string;
}

export enum ContestModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
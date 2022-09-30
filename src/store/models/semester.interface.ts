export interface ISemester {
    id: string;
    number: number;
    year: number;
    name: string;
    creator_id: string;
    description: string;
    start_time: string;
    end_time: string;
    create_time: string;
    update_time: string;
}

export enum SemesterModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
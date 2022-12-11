export interface ISemester {
    id: any;
    number: number;
    year: number;
    name: string;
    holiday: string[];
    checked_genaration: boolean;
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
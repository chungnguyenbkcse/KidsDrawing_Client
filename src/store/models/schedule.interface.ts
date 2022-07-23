export interface ISchedule {
    id: number;
    creator_id: number;
    name: string;
    create_time: string;
    update_time: string;
}

export enum ScheduleModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
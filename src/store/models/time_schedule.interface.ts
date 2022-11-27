export interface ITimeSchedule {
    start_time: string;
    end_time: string;
}

export enum TimeScheduleModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
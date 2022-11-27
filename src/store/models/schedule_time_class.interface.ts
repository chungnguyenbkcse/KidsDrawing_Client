export interface IScheduleTimeClass {
    class_name: string;
    start_time: string;
    end_time: string;
}

export enum ScheduleTimeClassModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
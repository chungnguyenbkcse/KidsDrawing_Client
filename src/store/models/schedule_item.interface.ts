export interface IScheduleItem {
    id: any;
    schedule_id: number;
    lesson_time: number;
    date_of_week: number;
}

export enum ScheduleItemModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
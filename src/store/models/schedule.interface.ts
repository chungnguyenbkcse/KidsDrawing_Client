export interface ISchedule {
    id: any;
    lesson_time_id: number;
    lesson_time: string;
    semester_class_id: number;
    date_of_week: number;
}

export enum ScheduleModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
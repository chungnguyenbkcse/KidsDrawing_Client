export interface ITimeScheduleTeacher {
    class_name: string;
    start_time: string;
    end_time: string;
}

export enum TimeScheduleTeacherModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
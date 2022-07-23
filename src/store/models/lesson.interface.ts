export interface ILesson {
    id: number;
    start_time: string;
    end_time: string;
}

export enum LessonModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
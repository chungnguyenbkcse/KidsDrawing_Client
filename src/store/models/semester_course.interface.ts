export interface ISemesterCourse {
    id: number;
    creation_id: number;
    course_id: number;
    schedule_id: number;
}

export enum SemesterCourseModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
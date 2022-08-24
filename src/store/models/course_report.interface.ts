export interface ICourseReport {
    total_register: number;
    name: string;
}

export enum CourseReportModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
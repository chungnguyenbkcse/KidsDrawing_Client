export interface IAttendance {
    id: any;
    student_id: number;
    section_id: number;
    status: string;
    section_number: number;
    email: string;
    course_name: string;
    course_id: number;
    student_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}

export enum AttendanceModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
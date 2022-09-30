export interface IAttendance {
    id: string;
    student_id: string;
    section_id: string;
    status: string;
    section_number: number;
    email: string;
    course_name: string;
    course_id: string;
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
export interface ISemesterClass {
    id: any;
    name: string;
    semester_id: number;
    semester_name: string;
    registration_time: string;
    registration_expiration_time: string;
    course_id: number;
    course_name: string;
    max_participant: number;
}

export enum SemesterClassModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    Create1 = 5,
    ClosePopup = 4
}
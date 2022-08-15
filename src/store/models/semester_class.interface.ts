export interface ISemesterClass {
    id: number;
    name: string;
    creation_id: number;
    course_id: number;
    max_participant: number;
}

export enum SemesterClassModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
export interface ITeacher {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
}

export enum TeacherModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}
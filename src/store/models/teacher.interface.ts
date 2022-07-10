export interface ITeacher {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    status: boolean;
    request_level: number;
    level: { art_type: string, art_level: string }[];
}

export enum TeacherModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}
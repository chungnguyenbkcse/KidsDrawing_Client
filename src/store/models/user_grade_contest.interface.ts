export interface IUserGradeContest {
    id: any;
    contest_id: any;
    teacher_id: any;
    teacher_name: string;
    contest_name: string;
}

export enum UserGradeContestModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
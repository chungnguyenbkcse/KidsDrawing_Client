export interface IUserGradeContest {
    id: number;
    contest_id: number;
    teacher_id: number;
}

export enum UserGradeContestModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
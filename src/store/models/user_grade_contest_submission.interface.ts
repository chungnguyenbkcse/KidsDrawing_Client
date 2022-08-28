export interface IUserGradeContestSubmission {
    student_id: number;
    contest_submission_id: number;
    feedback: string;
    score: number;
    time: string;
}

export enum UserGradeContestSubmissionModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
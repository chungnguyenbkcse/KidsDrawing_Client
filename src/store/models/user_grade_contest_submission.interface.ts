export interface IUserGradeContestSubmission {
    student_id: number;
    teacher_name: string;
    teacher_id: number;
    student_name: string;
    contest_id: number;
    contest_name: string;
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
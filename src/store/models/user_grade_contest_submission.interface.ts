export interface IUserGradeContestSubmission {
    student_id: string;
    teacher_name: string;
    teacher_id: string;
    student_name: string;
    contest_id: string;
    contest_name: string;
    contest_submission_id: string;
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
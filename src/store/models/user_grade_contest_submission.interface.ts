export interface IUserGradeContestSubmission {
    student_id: any;
    teacher_name: string;
    teacher_id: any;
    student_name: string;
    contest_id: any;
    contest_name: string;
    contest_submission_id: any;
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
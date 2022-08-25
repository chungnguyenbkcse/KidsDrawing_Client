export interface IUserGradeExerciseSubmission {
    student_id: number;
    student_name: string;
    exercise_submission_id: number;
    feedback: string;
    score: number;
    time: string;
}

export enum UserGradeExerciseSubmissionModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
export interface IExerciseSubmission {
    id: number;
    student_id: number;
    exercise_id: number;
    student_name: string;
    exercise_name: string;
    image_url: string;
    create_time: string;
    update_time: string;
}

export enum ExerciseSubmissionModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
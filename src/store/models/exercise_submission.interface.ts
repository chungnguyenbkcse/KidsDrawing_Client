export interface IExerciseSubmission {
    id: string;
    student_id: string;
    exercise_id: string;
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
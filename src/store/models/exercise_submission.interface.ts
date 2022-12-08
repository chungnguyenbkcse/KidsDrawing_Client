export interface IExerciseSubmission {
    id: any;
    student_id: number;
    exercise_id: number;
    student_name: string;
    exercise_name: string;
    exercise_description: string;
    exercise_deadline: string;
    image_url: string;
    feedback: string;
    score: number;
    time: string;
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
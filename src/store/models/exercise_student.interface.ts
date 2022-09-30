export interface IExerciseStudent {
    id: string;
    name: string;
    exercise_submission_id: string;
    description: string;
    section_id: string;
    level_id: string;
    level_name: string;
    deadline: string;
    time_submit:  string;
    teacher_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}

export enum ExerciseStudentModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
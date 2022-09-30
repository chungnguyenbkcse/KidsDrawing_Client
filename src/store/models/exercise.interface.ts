export interface IExercise {
    id: string;
    name: string;
    description: string;
    deadline: string;
    section_id: string;
    level_id: string;
    level_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}

export enum ExerciseModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
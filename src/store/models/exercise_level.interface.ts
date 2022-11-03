export interface IExerciseLevel {
    id: any;
    name: string;
    description: string;
    weight: number;
}

export enum ExerciseLevelModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
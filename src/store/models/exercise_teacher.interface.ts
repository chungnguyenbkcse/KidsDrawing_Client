export interface IExerciseTeacher {
    id: any;
    name: string;
    status: string;
    description: string;
    section_id: number;
    deadline: string;
    teacher_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}

export enum ExerciseTeacherModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
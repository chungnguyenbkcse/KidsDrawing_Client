export interface ISectionTeacher {
    id: any;
    class_id: number;
    name: string;
    number: number;
    teacher_name: string;
    teach_form: boolean;
    recording: string;
    message: string;
    total_exercise_submission: number;
    total_user_grade_exercise_submission: number;
}

export enum SectionTeacherModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
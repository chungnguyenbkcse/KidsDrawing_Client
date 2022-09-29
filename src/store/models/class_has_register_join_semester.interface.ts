export interface IClassHasRegisterJoinSemester {
    classes_id: number;
    user_register_join_semester_id: number;
    review_star: number;
    student_feedback: string;
    teacher_feedback: string;
}

export enum ClassHasRegisterJoinSemesterModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
export interface IContestSubmissionTeacher {
    id: any;
    student_id: any;
    contest_id: any;
    student_name: string;
    contest_name: string;
    image_url: string;
    create_time: string;
    update_time: string;
}

export enum ContestSubmissionTeacherModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
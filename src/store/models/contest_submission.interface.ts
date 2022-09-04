export interface IContestSubmission {
    id: number;
    student_id: number;
    contest_id: number;
    student_name: string;
    contest_name: string;
    image_url: string;
    create_time: string;
    update_time: string;
}

export enum ContestSubmissionModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
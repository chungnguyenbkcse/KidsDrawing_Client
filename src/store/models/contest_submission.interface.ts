export interface IContestSubmission {
    id: string;
    student_id: string;
    contest_id: string;
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
export interface IFinalScoreChild {
    course_id: number;
    course_name: string;
    final_score: number;
}

export enum FinalScoreChildModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4,
    Create1 = 5
}
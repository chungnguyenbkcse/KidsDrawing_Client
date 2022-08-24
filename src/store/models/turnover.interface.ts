export interface ITurnover {
    turnover: number;
}

export enum TurnoverModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
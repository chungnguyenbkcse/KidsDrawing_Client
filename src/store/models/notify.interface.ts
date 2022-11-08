export interface INotify {
    idx: number;
    name: string;
    description: string;
    time: string;
}

export enum NotifyModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
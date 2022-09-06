export interface INotificationDb {
    id: number;
    name: string;
    description: string;
    time: string;
}

export enum NotificationDbModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
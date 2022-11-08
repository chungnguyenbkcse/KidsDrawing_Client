export interface IUserReadNotification {
    notification_id: number;
    user_id: number;
    is_read: boolean;
}

export enum UserReadNotificationModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
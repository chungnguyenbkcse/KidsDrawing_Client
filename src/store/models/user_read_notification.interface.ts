export interface IUserReadNotification {
    notification_id: string;
    user_id: string;
    is_read: boolean;
}

export enum UserReadNotificationModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}
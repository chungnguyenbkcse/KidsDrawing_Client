import { IUserReadNotification, UserReadNotificationModificationStatus } from "../models/user_read_notification.interface";

// register_successfull_user_read_notifications
export const ADD_USER_READED_NOTIFICATION: string = "ADD_USER_READED_NOTIFICATION";
export const EDIT_USER_READED_NOTIFICATION: string = "EDIT_USER_READED_NOTIFICATION";
export const REMOVE_USER_READED_NOTIFICATION: string = "REMOVE_USER_READED_NOTIFICATION";
export const CHANGE_USER_READED_NOTIFICATION_AMOUNT: string = "CHANGE_USER_READED_NOTIFICATION_AMOUNT";
export const CHANGE_USER_READED_NOTIFICATION_PENDING_EDIT: string = "CHANGE_USER_READED_NOTIFICATION_PENDING_EDIT";
export const CLEAR_USER_READED_NOTIFICATION_PENDING_EDIT: string = "CLEAR_USER_READED_NOTIFICATION_PENDING_EDIT";
export const REMOVE_USER_READED_NOTIFICATION_ALL: string = "REMOVE_USER_READED_NOTIFICATION_ALL";
export const INITIAL_USER_READED_NOTIFICATION: string = "INITIAL_USER_READED_NOTIFICATION";

// not_register_user_read_notifications
export const ADD_USER_NOT_READED_NOTIFICATION: string = "ADD_USER_NOT_READED_NOTIFICATION";
export const EDIT_USER_NOT_READED_NOTIFICATION: string = "EDIT_USER_NOT_READED_NOTIFICATION";
export const REMOVE_USER_NOT_READED_NOTIFICATION: string = "REMOVE_USER_NOT_READED_NOTIFICATION";
export const CHANGE_USER_NOT_READED_NOTIFICATION_AMOUNT: string = "CHANGE_USER_NOT_READED_NOTIFICATION_AMOUNT";
export const CHANGE_USER_NOT_READED_NOTIFICATION_PENDING_EDIT: string = "CHANGE_USER_NOT_READED_NOTIFICATION_PENDING_EDIT";
export const CLEAR_USER_NOT_READED_NOTIFICATION_PENDING_EDIT: string = "CLEAR_USER_NOT_READED_NOTIFICATION_PENDING_EDIT";
export const REMOVE_USER_NOT_READED_NOTIFICATION_ALL: string = "REMOVE_USER_NOT_READED_NOTIFICATION_ALL";
export const INITIAL_USER_NOT_READED_NOTIFICATION: string = "INITIAL_USER_NOT_READED_NOTIFICATION";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(user_read_notification: IUserReadNotification) {
    return {
        type: FETCH_DATA_SUCCESS,
        user_read_notification
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialUserReadedNotification(user_read_notification: IUserReadNotification): IInitialUserReadedNotificationActionType {
    return { type: INITIAL_USER_READED_NOTIFICATION, user_read_notification: user_read_notification };
}

export function removeUserReadedNotificationAll(): IRemoveUserReadedNotificationAllActionType {
    return { type: REMOVE_USER_READED_NOTIFICATION_ALL };
}

export function addUserReadedNotification(user_read_notification: IUserReadNotification): IAddUserReadedNotificationActionType {
    return { type: ADD_USER_READED_NOTIFICATION, user_read_notification: user_read_notification };
}

export function editUserReadedNotification(user_read_notification: IUserReadNotification): IEditUserReadedNotificationActionType {
    return { type: EDIT_USER_READED_NOTIFICATION, user_read_notification: user_read_notification };
}

export function removeUserReadedNotification(id: string): IRemoveUserReadedNotificationActionType {
    return { type: REMOVE_USER_READED_NOTIFICATION, id: id };
}

export function changeSelectedUserReadedNotification(user_read_notification: IUserReadNotification): IChangeSelectedUserReadedNotificationActionType {
    return { type: CHANGE_USER_READED_NOTIFICATION_PENDING_EDIT, user_read_notification: user_read_notification };
}

export function clearSelectedUserReadedNotification(): IClearSelectedUserReadedNotificationActionType {
    return { type: CLEAR_USER_READED_NOTIFICATION_PENDING_EDIT };
}


export function initialUserNotReadedNotification(user_read_notification: IUserReadNotification): IInitialUserNotReadedNotificationActionType {
    return { type: INITIAL_USER_NOT_READED_NOTIFICATION, user_read_notification: user_read_notification };
}

export function removeUserNotReadedNotificationAll(): IRemoveUserNotReadedNotificationAllActionType {
    return { type: REMOVE_USER_NOT_READED_NOTIFICATION_ALL };
}

export function addUserNotReadedNotification(user_read_notification: IUserReadNotification): IAddUserNotReadedNotificationActionType {
    return { type: ADD_USER_NOT_READED_NOTIFICATION, user_read_notification: user_read_notification };
}

export function editUserNotReadedNotification(user_read_notification: IUserReadNotification): IEditUserNotReadedNotificationActionType {
    return { type: EDIT_USER_NOT_READED_NOTIFICATION, user_read_notification: user_read_notification };
}

export function removeUserNotReadedNotification(id: string): IRemoveUserNotReadedNotificationActionType {
    return { type: REMOVE_USER_NOT_READED_NOTIFICATION, id: id };
}

export function changeSelectedUserNotReadedNotification(user_read_notification: IUserReadNotification): IChangeSelectedUserNotReadedNotificationActionType {
    return { type: CHANGE_USER_NOT_READED_NOTIFICATION_PENDING_EDIT, user_read_notification: user_read_notification };
}

export function clearSelectedUserNotReadedNotification(): IClearSelectedUserNotReadedNotificationActionType {
    return { type: CLEAR_USER_NOT_READED_NOTIFICATION_PENDING_EDIT };
}

export function setModificationState(value: UserReadNotificationModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_user_read_notifications
interface IAddUserReadedNotificationActionType { type: string, user_read_notification: IUserReadNotification };
interface IEditUserReadedNotificationActionType { type: string, user_read_notification: IUserReadNotification };
interface IRemoveUserReadedNotificationActionType { type: string, id: string };
interface IChangeSelectedUserReadedNotificationActionType { type: string, user_read_notification: IUserReadNotification };
interface IClearSelectedUserReadedNotificationActionType { type: string };
interface IRemoveUserReadedNotificationAllActionType { type: string }
interface IInitialUserReadedNotificationActionType {type: string, user_read_notification: IUserReadNotification}

// not_register_user_read_notifications
interface IAddUserNotReadedNotificationActionType { type: string, user_read_notification: IUserReadNotification };
interface IEditUserNotReadedNotificationActionType { type: string, user_read_notification: IUserReadNotification };
interface IRemoveUserNotReadedNotificationActionType { type: string, id: string };
interface IChangeSelectedUserNotReadedNotificationActionType { type: string, user_read_notification: IUserReadNotification };
interface IClearSelectedUserNotReadedNotificationActionType { type: string };
interface IRemoveUserNotReadedNotificationAllActionType { type: string }
interface IInitialUserNotReadedNotificationActionType {type: string, user_read_notification: IUserReadNotification}



interface ISetModificationStateActionType { type: string, value:  UserReadNotificationModificationStatus};
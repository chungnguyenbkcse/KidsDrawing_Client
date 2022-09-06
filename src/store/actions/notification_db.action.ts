import { INotificationDb, NotificationDbModificationStatus } from "../models/notification_db.interface";
export const ADD_NOTIFICATION_DB: string = "ADD_NOTIFICATION_DB";
export const EDIT_NOTIFICATION_DB: string = "EDIT_NOTIFICATION_DB";
export const REMOVE_NOTIFICATION_DB: string = "REMOVE_NOTIFICATION_DB";
export const CHANGE_NOTIFICATION_DB_AMOUNT: string = "CHANGE_NOTIFICATION_DB_AMOUNT";
export const CHANGE_NOTIFICATION_DB_PENDING_EDIT: string = "CHANGE_NOTIFICATION_DB_PENDING_EDIT";
export const CLEAR_NOTIFICATION_DB_PENDING_EDIT: string = "CLEAR_NOTIFICATION_DB_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_NOTIFICATION_DB_ALL: string = "REMOVE_NOTIFICATION_DB_ALL";
export const INITIAL_NOTIFICATION_DB: string = "INITIAL_NOTIFICATION_DB";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(notification_db: INotificationDb) {
    return {
        type: FETCH_DATA_SUCCESS,
        notification_db
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialNotificationDb(notification_db: INotificationDb): IInitialNotificationDbActionType {
    return { type: INITIAL_NOTIFICATION_DB, notification_db: notification_db };
}

export function removeNotificationDbAll(): IRemoveNotificationDbAllActionType {
    return { type: REMOVE_NOTIFICATION_DB_ALL };
}

export function addNotificationDb(notification_db: INotificationDb): IAddNotificationDbActionType {
    return { type: ADD_NOTIFICATION_DB, notification_db: notification_db };
}

export function editNotificationDb(notification_db: INotificationDb): IEditNotificationDbActionType {
    return { type: EDIT_NOTIFICATION_DB, notification_db: notification_db };
}

export function removeNotificationDb(id: number): IRemoveNotificationDbActionType {
    return { type: REMOVE_NOTIFICATION_DB, id: id };
}

export function changeSelectedNotificationDb(notification_db: INotificationDb): IChangeSelectedNotificationDbActionType {
    return { type: CHANGE_NOTIFICATION_DB_PENDING_EDIT, notification_db: notification_db };
}

export function clearSelectedNotificationDb(): IClearSelectedNotificationDbActionType {
    return { type: CLEAR_NOTIFICATION_DB_PENDING_EDIT };
}

export function setModificationState(value: NotificationDbModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddNotificationDbActionType { type: string, notification_db: INotificationDb };
interface IEditNotificationDbActionType { type: string, notification_db: INotificationDb };
interface IRemoveNotificationDbActionType { type: string, id: number };
interface IChangeSelectedNotificationDbActionType { type: string, notification_db: INotificationDb };
interface IClearSelectedNotificationDbActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  NotificationDbModificationStatus};
interface IRemoveNotificationDbAllActionType { type: string }
interface IInitialNotificationDbActionType {type: string, notification_db: INotificationDb}
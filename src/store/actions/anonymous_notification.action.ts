import { IAnonymousNotification, AnonymousNotificationModificationStatus } from "../models/anonymous_notification.interface";
export const ADD_ANONYMOUS_NOTIFICATION: string = "ADD_ANONYMOUS_NOTIFICATION";
export const EDIT_ANONYMOUS_NOTIFICATION: string = "EDIT_ANONYMOUS_NOTIFICATION";
export const REMOVE_ANONYMOUS_NOTIFICATION: string = "REMOVE_ANONYMOUS_NOTIFICATION";
export const CHANGE_ANONYMOUS_NOTIFICATION_AMOUNT: string = "CHANGE_ANONYMOUS_NOTIFICATION_AMOUNT";
export const CHANGE_ANONYMOUS_NOTIFICATION_PENDING_EDIT: string = "CHANGE_ANONYMOUS_NOTIFICATION_PENDING_EDIT";
export const CLEAR_ANONYMOUS_NOTIFICATION_PENDING_EDIT: string = "CLEAR_ANONYMOUS_NOTIFICATION_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_ANONYMOUS_NOTIFICATION_ALL: string = "REMOVE_ANONYMOUS_NOTIFICATION_ALL";
export const INITIAL_ANONYMOUS_NOTIFICATION: string = "INITIAL_ANONYMOUS_NOTIFICATION";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(anonymous_notification: IAnonymousNotification) {
    return {
        type: FETCH_DATA_SUCCESS,
        anonymous_notification
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialAnonymousNotification(anonymous_notification: IAnonymousNotification): IInitialAnonymousNotificationActionType {
    return { type: INITIAL_ANONYMOUS_NOTIFICATION, anonymous_notification: anonymous_notification };
}

export function removeAnonymousNotificationAll(): IRemoveAnonymousNotificationAllActionType {
    return { type: REMOVE_ANONYMOUS_NOTIFICATION_ALL };
}

export function addAnonymousNotification(anonymous_notification: IAnonymousNotification): IAddAnonymousNotificationActionType {
    return { type: ADD_ANONYMOUS_NOTIFICATION, anonymous_notification: anonymous_notification };
}

export function editAnonymousNotification(anonymous_notification: IAnonymousNotification): IEditAnonymousNotificationActionType {
    return { type: EDIT_ANONYMOUS_NOTIFICATION, anonymous_notification: anonymous_notification };
}

export function removeAnonymousNotification(id: any): IRemoveAnonymousNotificationActionType {
    return { type: REMOVE_ANONYMOUS_NOTIFICATION, id: id };
}

export function changeSelectedAnonymousNotification(anonymous_notification: IAnonymousNotification): IChangeSelectedAnonymousNotificationActionType {
    return { type: CHANGE_ANONYMOUS_NOTIFICATION_PENDING_EDIT, anonymous_notification: anonymous_notification };
}

export function clearSelectedAnonymousNotification(): IClearSelectedAnonymousNotificationActionType {
    return { type: CLEAR_ANONYMOUS_NOTIFICATION_PENDING_EDIT };
}

export function setModificationStateAnonymousNotification(value: AnonymousNotificationModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddAnonymousNotificationActionType { type: string, anonymous_notification: IAnonymousNotification };
interface IEditAnonymousNotificationActionType { type: string, anonymous_notification: IAnonymousNotification };
interface IRemoveAnonymousNotificationActionType { type: string, id: any };
interface IChangeSelectedAnonymousNotificationActionType { type: string, anonymous_notification: IAnonymousNotification };
interface IClearSelectedAnonymousNotificationActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  AnonymousNotificationModificationStatus};
interface IRemoveAnonymousNotificationAllActionType { type: string }
interface IInitialAnonymousNotificationActionType {type: string, anonymous_notification: IAnonymousNotification}
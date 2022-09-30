import { INotify, NotifyModificationStatus } from "../models/notify.interface";
export const ADD_NOTIFY: string = "ADD_NOTIFY";
export const EDIT_NOTIFY: string = "EDIT_NOTIFY";
export const REMOVE_NOTIFY: string = "REMOVE_NOTIFY";
export const CHANGE_NOTIFY_AMOUNT: string = "CHANGE_NOTIFY_AMOUNT";
export const CHANGE_NOTIFY_PENDING_EDIT: string = "CHANGE_NOTIFY_PENDING_EDIT";
export const CLEAR_NOTIFY_PENDING_EDIT: string = "CLEAR_NOTIFY_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_NOTIFY_ALL: string = "REMOVE_NOTIFY_ALL";
export const INITIAL_NOTIFY: string = "INITIAL_NOTIFY";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(notify: INotify) {
    return {
        type: FETCH_DATA_SUCCESS,
        notify
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialNotify(notify: INotify): IInitialNotifyActionType {
    return { type: INITIAL_NOTIFY, notify: notify };
}

export function removeNotifyAll(): IRemoveNotifyAllActionType {
    return { type: REMOVE_NOTIFY_ALL };
}

export function addNotify(notify: INotify): IAddNotifyActionType {
    return { type: ADD_NOTIFY, notify: notify };
}

export function editNotify(notify: INotify): IEditNotifyActionType {
    return { type: EDIT_NOTIFY, notify: notify };
}

export function removeNotify(id: string): IRemoveNotifyActionType {
    return { type: REMOVE_NOTIFY, id: id };
}

export function changeSelectedNotify(notify: INotify): IChangeSelectedNotifyActionType {
    return { type: CHANGE_NOTIFY_PENDING_EDIT, notify: notify };
}

export function clearSelectedNotify(): IClearSelectedNotifyActionType {
    return { type: CLEAR_NOTIFY_PENDING_EDIT };
}

export function setModificationStateNotify(value: NotifyModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddNotifyActionType { type: string, notify: INotify };
interface IEditNotifyActionType { type: string, notify: INotify };
interface IRemoveNotifyActionType { type: string, id: string };
interface IChangeSelectedNotifyActionType { type: string, notify: INotify };
interface IClearSelectedNotifyActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  NotifyModificationStatus};
interface IRemoveNotifyAllActionType { type: string }
interface IInitialNotifyActionType {type: string, notify: INotify}
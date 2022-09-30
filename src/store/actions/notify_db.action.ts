import { INotifyDb, NotifyDbModificationStatus } from "../models/notify_db.interface";
export const ADD_NOTIFY_DB: string = "ADD_NOTIFY_DB";
export const EDIT_NOTIFY_DB: string = "EDIT_NOTIFY_DB";
export const REMOVE_NOTIFY_DB: string = "REMOVE_NOTIFY_DB";
export const CHANGE_NOTIFY_DB_AMOUNT: string = "CHANGE_NOTIFY_DB_AMOUNT";
export const CHANGE_NOTIFY_DB_PENDING_EDIT: string = "CHANGE_NOTIFY_DB_PENDING_EDIT";
export const CLEAR_NOTIFY_DB_PENDING_EDIT: string = "CLEAR_NOTIFY_DB_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_NOTIFY_DB_ALL: string = "REMOVE_NOTIFY_DB_ALL";
export const INITIAL_NOTIFY_DB: string = "INITIAL_NOTIFY_DB";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(notify_db: INotifyDb) {
    return {
        type: FETCH_DATA_SUCCESS,
        notify_db
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialNotifyDb(notify_db: INotifyDb): IInitialNotifyDbActionType {
    return { type: INITIAL_NOTIFY_DB, notify_db: notify_db };
}

export function removeNotifyDbAll(): IRemoveNotifyDbAllActionType {
    return { type: REMOVE_NOTIFY_DB_ALL };
}

export function addNotifyDb(notify_db: INotifyDb): IAddNotifyDbActionType {
    return { type: ADD_NOTIFY_DB, notify_db: notify_db };
}

export function editNotifyDb(notify_db: INotifyDb): IEditNotifyDbActionType {
    return { type: EDIT_NOTIFY_DB, notify_db: notify_db };
}

export function removeNotifyDb(id: string): IRemoveNotifyDbActionType {
    return { type: REMOVE_NOTIFY_DB, id: id };
}

export function changeSelectedNotifyDb(notify_db: INotifyDb): IChangeSelectedNotifyDbActionType {
    return { type: CHANGE_NOTIFY_DB_PENDING_EDIT, notify_db: notify_db };
}

export function clearSelectedNotifyDb(): IClearSelectedNotifyDbActionType {
    return { type: CLEAR_NOTIFY_DB_PENDING_EDIT };
}

export function setModificationState(value: NotifyDbModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddNotifyDbActionType { type: string, notify_db: INotifyDb };
interface IEditNotifyDbActionType { type: string, notify_db: INotifyDb };
interface IRemoveNotifyDbActionType { type: string, id: string };
interface IChangeSelectedNotifyDbActionType { type: string, notify_db: INotifyDb };
interface IClearSelectedNotifyDbActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  NotifyDbModificationStatus};
interface IRemoveNotifyDbAllActionType { type: string }
interface IInitialNotifyDbActionType {type: string, notify_db: INotifyDb}
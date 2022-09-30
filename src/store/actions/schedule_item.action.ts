import { IScheduleItem, ScheduleItemModificationStatus } from "../models/schedule_item.interface";
export const ADD_SCHEDULE_ITEM: string = "ADD_SCHEDULE_ITEM";
export const EDIT_SCHEDULE_ITEM: string = "EDIT_SCHEDULE_ITEM";
export const REMOVE_SCHEDULE_ITEM: string = "REMOVE_SCHEDULE_ITEM";
export const CHANGE_SCHEDULE_ITEM_AMOUNT: string = "CHANGE_SCHEDULE_ITEM_AMOUNT";
export const CHANGE_SCHEDULE_ITEM_PENDING_EDIT: string = "CHANGE_SCHEDULE_ITEM_PENDING_EDIT";
export const CLEAR_SCHEDULE_ITEM_PENDING_EDIT: string = "CLEAR_SCHEDULE_ITEM_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_SCHEDULE_ITEM_ALL: string = "REMOVE_SCHEDULE_ITEM_ALL";
export const INITIAL_SCHEDULE_ITEM: string = "INITIAL_SCHEDULE_ITEM";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(schedule_item: IScheduleItem) {
    return {
        type: FETCH_DATA_SUCCESS,
        schedule_item
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialScheduleItem(schedule_item: IScheduleItem): IInitialScheduleItemActionType {
    return { type: INITIAL_SCHEDULE_ITEM, schedule_item: schedule_item };
}

export function removeScheduleItemAll(): IRemoveScheduleItemAllActionType {
    return { type: REMOVE_SCHEDULE_ITEM_ALL };
}

export function addScheduleItem(schedule_item: IScheduleItem): IAddScheduleItemActionType {
    return { type: ADD_SCHEDULE_ITEM, schedule_item: schedule_item };
}

export function editScheduleItem(schedule_item: IScheduleItem): IEditScheduleItemActionType {
    return { type: EDIT_SCHEDULE_ITEM, schedule_item: schedule_item };
}

export function removeScheduleItem(id: string): IRemoveScheduleItemActionType {
    return { type: REMOVE_SCHEDULE_ITEM, id: id };
}

export function changeSelectedScheduleItem(schedule_item: IScheduleItem): IChangeSelectedScheduleItemActionType {
    return { type: CHANGE_SCHEDULE_ITEM_PENDING_EDIT, schedule_item: schedule_item };
}

export function clearSelectedScheduleItem(): IClearSelectedScheduleItemActionType {
    return { type: CLEAR_SCHEDULE_ITEM_PENDING_EDIT };
}

export function setModificationState(value: ScheduleItemModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddScheduleItemActionType { type: string, schedule_item: IScheduleItem };
interface IEditScheduleItemActionType { type: string, schedule_item: IScheduleItem };
interface IRemoveScheduleItemActionType { type: string, id: string };
interface IChangeSelectedScheduleItemActionType { type: string, schedule_item: IScheduleItem };
interface IClearSelectedScheduleItemActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ScheduleItemModificationStatus};
interface IRemoveScheduleItemAllActionType { type: string }
interface IInitialScheduleItemActionType {type: string, schedule_item: IScheduleItem}
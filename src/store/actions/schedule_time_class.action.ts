import { IScheduleTimeClass, ScheduleTimeClassModificationStatus } from "../models/schedule_time_class.interface";
export const ADD_TIME_SCHEDULE: string = "ADD_TIME_SCHEDULE";
export const EDIT_TIME_SCHEDULE: string = "EDIT_TIME_SCHEDULE";
export const REMOVE_TIME_SCHEDULE: string = "REMOVE_TIME_SCHEDULE";
export const CHANGE_TIME_SCHEDULE_AMOUNT: string = "CHANGE_TIME_SCHEDULE_AMOUNT";
export const CHANGE_TIME_SCHEDULE_PENDING_EDIT: string = "CHANGE_TIME_SCHEDULE_PENDING_EDIT";
export const CLEAR_TIME_SCHEDULE_PENDING_EDIT: string = "CLEAR_TIME_SCHEDULE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_TIME_SCHEDULE_ALL: string = "REMOVE_TIME_SCHEDULE_ALL";
export const INITIAL_TIME_SCHEDULE: string = "INITIAL_TIME_SCHEDULE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(schedule_time_class: IScheduleTimeClass) {
    return {
        type: FETCH_DATA_SUCCESS,
        schedule_time_class
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialScheduleTimeClass(schedule_time_class: IScheduleTimeClass): IInitialScheduleTimeClassActionType {
    return { type: INITIAL_TIME_SCHEDULE, schedule_time_class: schedule_time_class };
}

export function removeScheduleTimeClassAll(): IRemoveScheduleTimeClassAllActionType {
    return { type: REMOVE_TIME_SCHEDULE_ALL };
}

export function addScheduleTimeClass(schedule_time_class: IScheduleTimeClass): IAddScheduleTimeClassActionType {
    return { type: ADD_TIME_SCHEDULE, schedule_time_class: schedule_time_class };
}

export function editScheduleTimeClass(schedule_time_class: IScheduleTimeClass): IEditScheduleTimeClassActionType {
    return { type: EDIT_TIME_SCHEDULE, schedule_time_class: schedule_time_class };
}

export function removeScheduleTimeClass(id: string): IRemoveScheduleTimeClassActionType {
    return { type: REMOVE_TIME_SCHEDULE, id: id };
}

export function changeSelectedScheduleTimeClass(schedule_time_class: IScheduleTimeClass): IChangeSelectedScheduleTimeClassActionType {
    return { type: CHANGE_TIME_SCHEDULE_PENDING_EDIT, schedule_time_class: schedule_time_class };
}

export function clearSelectedScheduleTimeClass(): IClearSelectedScheduleTimeClassActionType {
    return { type: CLEAR_TIME_SCHEDULE_PENDING_EDIT };
}

export function setModificationState(value: ScheduleTimeClassModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddScheduleTimeClassActionType { type: string, schedule_time_class: IScheduleTimeClass };
interface IEditScheduleTimeClassActionType { type: string, schedule_time_class: IScheduleTimeClass };
interface IRemoveScheduleTimeClassActionType { type: string, id: string };
interface IChangeSelectedScheduleTimeClassActionType { type: string, schedule_time_class: IScheduleTimeClass };
interface IClearSelectedScheduleTimeClassActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ScheduleTimeClassModificationStatus};
interface IRemoveScheduleTimeClassAllActionType { type: string }
interface IInitialScheduleTimeClassActionType {type: string, schedule_time_class: IScheduleTimeClass}
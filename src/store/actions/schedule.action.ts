import { ISchedule, ScheduleModificationStatus } from "../models/schedule.interface";
export const ADD_SCHEDULE: string = "ADD_SCHEDULE";
export const EDIT_SCHEDULE: string = "EDIT_SCHEDULE";
export const REMOVE_SCHEDULE: string = "REMOVE_SCHEDULE";
export const CHANGE_SCHEDULE_AMOUNT: string = "CHANGE_SCHEDULE_AMOUNT";
export const CHANGE_SCHEDULE_PENDING_EDIT: string = "CHANGE_SCHEDULE_PENDING_EDIT";
export const CLEAR_SCHEDULE_PENDING_EDIT: string = "CLEAR_SCHEDULE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_SCHEDULE_ALL: string = "REMOVE_SCHEDULE_ALL";
export const INITIAL_SCHEDULE: string = "INITIAL_SCHEDULE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(schedule: ISchedule) {
    return {
        type: FETCH_DATA_SUCCESS,
        schedule
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialSchedule(schedule: ISchedule): IInitialScheduleActionType {
    return { type: INITIAL_SCHEDULE, schedule: schedule };
}

export function removeScheduleAll(): IRemoveScheduleAllActionType {
    return { type: REMOVE_SCHEDULE_ALL };
}

export function addSchedule(schedule: ISchedule): IAddScheduleActionType {
    return { type: ADD_SCHEDULE, schedule: schedule };
}

export function editSchedule(schedule: ISchedule): IEditScheduleActionType {
    return { type: EDIT_SCHEDULE, schedule: schedule };
}

export function removeSchedule(id: any): IRemoveScheduleActionType {
    return { type: REMOVE_SCHEDULE, id: id };
}

export function changeSelectedSchedule(schedule: ISchedule): IChangeSelectedScheduleActionType {
    return { type: CHANGE_SCHEDULE_PENDING_EDIT, schedule: schedule };
}

export function clearSelectedSchedule(): IClearSelectedScheduleActionType {
    return { type: CLEAR_SCHEDULE_PENDING_EDIT };
}

export function setModificationState(value: ScheduleModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddScheduleActionType { type: string, schedule: ISchedule };
interface IEditScheduleActionType { type: string, schedule: ISchedule };
interface IRemoveScheduleActionType { type: string, id: any };
interface IChangeSelectedScheduleActionType { type: string, schedule: ISchedule };
interface IClearSelectedScheduleActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ScheduleModificationStatus};
interface IRemoveScheduleAllActionType { type: string }
interface IInitialScheduleActionType {type: string, schedule: ISchedule}
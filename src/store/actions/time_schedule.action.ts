import { ITimeSchedule, TimeScheduleModificationStatus } from "../models/time_schedule.interface";
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

export function fetchDataSuccess(time_schedule: ITimeSchedule) {
    return {
        type: FETCH_DATA_SUCCESS,
        time_schedule
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialTimeSchedule(time_schedule: ITimeSchedule): IInitialTimeScheduleActionType {
    return { type: INITIAL_TIME_SCHEDULE, time_schedule: time_schedule };
}

export function removeTimeScheduleAll(): IRemoveTimeScheduleAllActionType {
    return { type: REMOVE_TIME_SCHEDULE_ALL };
}

export function addTimeSchedule(time_schedule: ITimeSchedule): IAddTimeScheduleActionType {
    return { type: ADD_TIME_SCHEDULE, time_schedule: time_schedule };
}

export function editTimeSchedule(time_schedule: ITimeSchedule): IEditTimeScheduleActionType {
    return { type: EDIT_TIME_SCHEDULE, time_schedule: time_schedule };
}

export function removeTimeSchedule(id: string): IRemoveTimeScheduleActionType {
    return { type: REMOVE_TIME_SCHEDULE, id: id };
}

export function changeSelectedTimeSchedule(time_schedule: ITimeSchedule): IChangeSelectedTimeScheduleActionType {
    return { type: CHANGE_TIME_SCHEDULE_PENDING_EDIT, time_schedule: time_schedule };
}

export function clearSelectedTimeSchedule(): IClearSelectedTimeScheduleActionType {
    return { type: CLEAR_TIME_SCHEDULE_PENDING_EDIT };
}

export function setModificationState(value: TimeScheduleModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddTimeScheduleActionType { type: string, time_schedule: ITimeSchedule };
interface IEditTimeScheduleActionType { type: string, time_schedule: ITimeSchedule };
interface IRemoveTimeScheduleActionType { type: string, id: string };
interface IChangeSelectedTimeScheduleActionType { type: string, time_schedule: ITimeSchedule };
interface IClearSelectedTimeScheduleActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  TimeScheduleModificationStatus};
interface IRemoveTimeScheduleAllActionType { type: string }
interface IInitialTimeScheduleActionType {type: string, time_schedule: ITimeSchedule}
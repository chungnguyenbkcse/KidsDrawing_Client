import { ITimeScheduleTeacher, TimeScheduleTeacherModificationStatus } from "../models/time_schedule_teacher.interface";
export const ADD_TIME_SCHEDULE_TEACHER: string = "ADD_TIME_SCHEDULE_TEACHER";
export const EDIT_TIME_SCHEDULE_TEACHER: string = "EDIT_TIME_SCHEDULE_TEACHER";
export const REMOVE_TIME_SCHEDULE_TEACHER: string = "REMOVE_TIME_SCHEDULE_TEACHER";
export const CHANGE_TIME_SCHEDULE_TEACHER_AMOUNT: string = "CHANGE_TIME_SCHEDULE_TEACHER_AMOUNT";
export const CHANGE_TIME_SCHEDULE_TEACHER_PENDING_EDIT: string = "CHANGE_TIME_SCHEDULE_TEACHER_PENDING_EDIT";
export const CLEAR_TIME_SCHEDULE_TEACHER_PENDING_EDIT: string = "CLEAR_TIME_SCHEDULE_TEACHER_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_TIME_SCHEDULE_TEACHER_ALL: string = "REMOVE_TIME_SCHEDULE_TEACHER_ALL";
export const INITIAL_TIME_SCHEDULE_TEACHER: string = "INITIAL_TIME_SCHEDULE_TEACHER";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(time_schedule_teacher: ITimeScheduleTeacher) {
    return {
        type: FETCH_DATA_SUCCESS,
        time_schedule_teacher
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialTimeScheduleTeacher(time_schedule_teacher: ITimeScheduleTeacher): IInitialTimeScheduleActionType {
    return { type: INITIAL_TIME_SCHEDULE_TEACHER, time_schedule_teacher: time_schedule_teacher };
}

export function removeTimeScheduleTeacherAll(): IRemoveTimeScheduleAllActionType {
    return { type: REMOVE_TIME_SCHEDULE_TEACHER_ALL };
}

export function addTimeScheduleTeacher(time_schedule_teacher: ITimeScheduleTeacher): IAddTimeScheduleActionType {
    return { type: ADD_TIME_SCHEDULE_TEACHER, time_schedule_teacher: time_schedule_teacher };
}

export function editTimeScheduleTeacher(time_schedule_teacher: ITimeScheduleTeacher): IEditTimeScheduleActionType {
    return { type: EDIT_TIME_SCHEDULE_TEACHER, time_schedule_teacher: time_schedule_teacher };
}

export function removeTimeScheduleTeacher(id: number): IRemoveTimeScheduleActionType {
    return { type: REMOVE_TIME_SCHEDULE_TEACHER, id: id };
}

export function changeSelectedTimeScheduleTeacher(time_schedule_teacher: ITimeScheduleTeacher): IChangeSelectedTimeScheduleActionType {
    return { type: CHANGE_TIME_SCHEDULE_TEACHER_PENDING_EDIT, time_schedule_teacher: time_schedule_teacher };
}

export function clearSelectedTimeScheduleTeacher(): IClearSelectedTimeScheduleActionType {
    return { type: CLEAR_TIME_SCHEDULE_TEACHER_PENDING_EDIT };
}

export function setModificationState(value: TimeScheduleTeacherModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddTimeScheduleActionType { type: string, time_schedule_teacher: ITimeScheduleTeacher };
interface IEditTimeScheduleActionType { type: string, time_schedule_teacher: ITimeScheduleTeacher };
interface IRemoveTimeScheduleActionType { type: string, id: number };
interface IChangeSelectedTimeScheduleActionType { type: string, time_schedule_teacher: ITimeScheduleTeacher };
interface IClearSelectedTimeScheduleActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  TimeScheduleTeacherModificationStatus};
interface IRemoveTimeScheduleAllActionType { type: string }
interface IInitialTimeScheduleActionType {type: string, time_schedule_teacher: ITimeScheduleTeacher}
import { IAttendance, AttendanceModificationStatus } from "../models/attendance.interface";
export const ADD_ATTENDANCE: string = "ADD_ATTENDANCE";
export const EDIT_ATTENDANCE: string = "EDIT_ATTENDANCE";
export const REMOVE_ATTENDANCE: string = "REMOVE_ATTENDANCE";
export const CHANGE_ATTENDANCE_AMOUNT: string = "CHANGE_ATTENDANCE_AMOUNT";
export const CHANGE_ATTENDANCE_PENDING_EDIT: string = "CHANGE_ATTENDANCE_PENDING_EDIT";
export const CLEAR_ATTENDANCE_PENDING_EDIT: string = "CLEAR_ATTENDANCE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_ATTENDANCE_ALL: string = "REMOVE_ATTENDANCE_ALL";
export const INITIAL_ATTENDANCE: string = "INITIAL_ATTENDANCE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(attendance: IAttendance) {
    return {
        type: FETCH_DATA_SUCCESS,
        attendance
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialAttendance(attendance: IAttendance): IInitialAttendanceActionType {
    return { type: INITIAL_ATTENDANCE, attendance: attendance };
}

export function removeAttendanceAll(): IRemoveAttendanceAllActionType {
    return { type: REMOVE_ATTENDANCE_ALL };
}

export function addAttendance(attendance: IAttendance): IAddAttendanceActionType {
    return { type: ADD_ATTENDANCE, attendance: attendance };
}

export function editAttendance(attendance: IAttendance): IEditAttendanceActionType {
    return { type: EDIT_ATTENDANCE, attendance: attendance };
}

export function removeAttendance(id: any): IRemoveAttendanceActionType {
    return { type: REMOVE_ATTENDANCE, id: id };
}

export function changeSelectedAttendance(attendance: IAttendance): IChangeSelectedAttendanceActionType {
    return { type: CHANGE_ATTENDANCE_PENDING_EDIT, attendance: attendance };
}

export function clearSelectedAttendance(): IClearSelectedAttendanceActionType {
    return { type: CLEAR_ATTENDANCE_PENDING_EDIT };
}

export function setModificationState(value: AttendanceModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddAttendanceActionType { type: string, attendance: IAttendance };
interface IEditAttendanceActionType { type: string, attendance: IAttendance };
interface IRemoveAttendanceActionType { type: string, id: any };
interface IChangeSelectedAttendanceActionType { type: string, attendance: IAttendance };
interface IClearSelectedAttendanceActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  AttendanceModificationStatus};
interface IRemoveAttendanceAllActionType { type: string }
interface IInitialAttendanceActionType {type: string, attendance: IAttendance}
import { IStudentLeave, StudentLeaveModificationStatus } from "../models/student_leave.interface";

export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export const REMOVE_REMOVE_LEAVE_ALL: string = "REMOVE_REMOVE_LEAVE_ALL";
export const INITIAL_REMOVE_LEAVE: string = "INITIAL_REMOVE_LEAVE";
export const ADD_REMOVE_LEAVE: string = "ADD_REMOVE_LEAVE";
export const REMOVE_REMOVE_LEAVE: string = "REMOVE_REMOVE_LEAVE";
export const EDIT_REMOVE_LEAVE: string = "EDIT_REMOVE_LEAVE";


export const REMOVE_LEAVES_ALL: string = "REMOVE_LEAVES_ALL";
export const INITIAL_LEAVES: string = "INITIAL_LEAVES";
export const ADD_LEAVES: string = "ADD_LEAVES";
export const EDIT_LEAVES: string = "EDIT_LEAVES";
export const REMOVE_LEAVES: string = "REMOVE_LEAVES";

export const REMOVE_ACCEPT_LEAVE_ALL: string = "REMOVE_ACCEPT_LEAVE_ALL";
export const INITIAL_ACCEPT_LEAVE: string = "INITIAL_ACCEPT_LEAVE";
export const ADD_ACCEPT_LEAVE: string = "ADD_ACCEPT_LEAVE";
export const EDIT_ACCEPT_LEAVE: string = "EDIT_ACCEPT_LEAVE";
export const REMOVE_ACCEPT_LEAVE: string = "REMOVE_ACCEPT_LEAVE";

export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const CHANGE_USER_PENDING_EDIT: string = "CHANGE_USER_PENDING_EDIT";
export const CLEAR_USER_PENDING_EDIT: string = "CLEAR_USER_PENDING_EDIT";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(teacherLeave: IStudentLeave) {
    return {
        type: FETCH_DATA_SUCCESS,
        teacherLeave
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialRemoveStudentLeave(student_leave: IStudentLeave): IInitialRemoveStudentLeaveActionType {
    return { type: INITIAL_REMOVE_LEAVE, student_leave: student_leave };
}

export function removeRemoveStudentLeaveAll(): IRemoveRemoveStudentLeaveAllActionType {
    return { type: REMOVE_REMOVE_LEAVE_ALL };
}

export function addRemoveStudentLeave(student_leave: IStudentLeave): IAddRemoveStudentLeaveActionType {
    return { type: ADD_REMOVE_LEAVE, student_leave: student_leave };
}

export function editRemoveStudentLeave(student_leave: IStudentLeave): IEditRemoveStudentLeaveActionType {
    return { type: EDIT_REMOVE_LEAVE, student_leave: student_leave };
}

export function removeRemoveStudentLeave(id: number): IRemoveRemoveStudentLeaveActionType {
    return { type: REMOVE_REMOVE_LEAVE, id: id };
}


export function initialAcceptStudentLeave(student_leave: IStudentLeave): IInitialAcceptStudentLeaveActionType {
    return { type: INITIAL_ACCEPT_LEAVE, student_leave: student_leave };
}

export function removeAcceptStudentLeaveAll(): IRemoveAcceptStudentLeaveAllActionType {
    return { type: REMOVE_ACCEPT_LEAVE_ALL };
}

export function addAcceptStudentLeave(student_leave: IStudentLeave): IAddAcceptStudentLeaveActionType {
    return { type: ADD_ACCEPT_LEAVE, student_leave: student_leave };
}

export function editAcceptStudentLeave(student_leave: IStudentLeave): IEditAcceptStudentLeaveActionType {
    return { type: EDIT_ACCEPT_LEAVE, student_leave: student_leave };
}

export function removeAcceptStudentLeave(id: number): IRemoveAcceptStudentLeaveActionType {
    return { type: REMOVE_ACCEPT_LEAVE, id: id };
}


export function initialLeaves(student_leave: IStudentLeave): IInitialLeavesActionType {
    return { type: INITIAL_LEAVES, student_leave: student_leave };
}

export function removeLeavesAll(): IRemoveLeavesAllActionType {
    return { type: REMOVE_LEAVES_ALL };
}

export function addLeaves(student_leave: IStudentLeave): IAddLeavesActionType {
    return { type: ADD_LEAVES, student_leave: student_leave };
}

export function editLeaves(student_leave: IStudentLeave): IEditLeavesActionType {
    return { type: EDIT_LEAVES, student_leave: student_leave };
}

export function removeLeaves(id: number): IRemoveLeavesActionType {
    return { type: REMOVE_LEAVES, id: id };
}

interface IInitialLeavesActionType {type: string, student_leave: IStudentLeave};
interface IRemoveLeavesAllActionType { type: string };
interface IAddLeavesActionType { type: string, student_leave: IStudentLeave };
interface IEditLeavesActionType { type: string, student_leave: IStudentLeave };
interface IRemoveLeavesActionType { type: string, id: number };

interface IInitialAcceptStudentLeaveActionType {type: string, student_leave: IStudentLeave};
interface IRemoveAcceptStudentLeaveAllActionType { type: string };
interface IAddAcceptStudentLeaveActionType { type: string, student_leave: IStudentLeave };
interface IEditAcceptStudentLeaveActionType { type: string, student_leave: IStudentLeave };
interface IRemoveAcceptStudentLeaveActionType { type: string, id: number };

interface IInitialRemoveStudentLeaveActionType {type: string, student_leave: IStudentLeave};
interface IRemoveRemoveStudentLeaveAllActionType { type: string };
interface IAddRemoveStudentLeaveActionType { type: string, student_leave: IStudentLeave };
interface IEditRemoveStudentLeaveActionType { type: string, student_leave: IStudentLeave };
interface IRemoveRemoveStudentLeaveActionType { type: string, id: number };
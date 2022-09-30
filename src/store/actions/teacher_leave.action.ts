import { ITeacherLeave } from "../models/teacher_leave.interface";

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

export function fetchDataSuccess(teacherLeave: ITeacherLeave) {
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

export function initialRemoveTeacherLeave(teacher_leave: ITeacherLeave): IInitialRemoveTeacherLeaveActionType {
    return { type: INITIAL_REMOVE_LEAVE, teacher_leave: teacher_leave };
}

export function removeRemoveTeacherLeaveAll(): IRemoveRemoveTeacherLeaveAllActionType {
    return { type: REMOVE_REMOVE_LEAVE_ALL };
}

export function addRemoveTeacherLeave(teacher_leave: ITeacherLeave): IAddRemoveTeacherLeaveActionType {
    return { type: ADD_REMOVE_LEAVE, teacher_leave: teacher_leave };
}

export function editRemoveTeacherLeave(teacher_leave: ITeacherLeave): IEditRemoveTeacherLeaveActionType {
    return { type: EDIT_REMOVE_LEAVE, teacher_leave: teacher_leave };
}

export function removeRemoveTeacherLeave(id: string): IRemoveRemoveTeacherLeaveActionType {
    return { type: REMOVE_REMOVE_LEAVE, id: id };
}


export function initialAcceptTeacherLeave(teacher_leave: ITeacherLeave): IInitialAcceptTeacherLeaveActionType {
    return { type: INITIAL_ACCEPT_LEAVE, teacher_leave: teacher_leave };
}

export function removeAcceptTeacherLeaveAll(): IRemoveAcceptTeacherLeaveAllActionType {
    return { type: REMOVE_ACCEPT_LEAVE_ALL };
}

export function addAcceptTeacherLeave(teacher_leave: ITeacherLeave): IAddAcceptTeacherLeaveActionType {
    return { type: ADD_ACCEPT_LEAVE, teacher_leave: teacher_leave };
}

export function editAcceptTeacherLeave(teacher_leave: ITeacherLeave): IEditAcceptTeacherLeaveActionType {
    return { type: EDIT_ACCEPT_LEAVE, teacher_leave: teacher_leave };
}

export function removeAcceptTeacherLeave(id: string): IRemoveAcceptTeacherLeaveActionType {
    return { type: REMOVE_ACCEPT_LEAVE, id: id };
}


export function initialLeaves(teacher_leave: ITeacherLeave): IInitialLeavesActionType {
    return { type: INITIAL_LEAVES, teacher_leave: teacher_leave };
}

export function removeLeavesAll(): IRemoveLeavesAllActionType {
    return { type: REMOVE_LEAVES_ALL };
}

export function addLeaves(teacher_leave: ITeacherLeave): IAddLeavesActionType {
    return { type: ADD_LEAVES, teacher_leave: teacher_leave };
}

export function editLeaves(teacher_leave: ITeacherLeave): IEditLeavesActionType {
    return { type: EDIT_LEAVES, teacher_leave: teacher_leave };
}

export function removeLeaves(id: string): IRemoveLeavesActionType {
    return { type: REMOVE_LEAVES, id: id };
}

interface IInitialLeavesActionType {type: string, teacher_leave: ITeacherLeave};
interface IRemoveLeavesAllActionType { type: string };
interface IAddLeavesActionType { type: string, teacher_leave: ITeacherLeave };
interface IEditLeavesActionType { type: string, teacher_leave: ITeacherLeave };
interface IRemoveLeavesActionType { type: string, id: string };

interface IInitialAcceptTeacherLeaveActionType {type: string, teacher_leave: ITeacherLeave};
interface IRemoveAcceptTeacherLeaveAllActionType { type: string };
interface IAddAcceptTeacherLeaveActionType { type: string, teacher_leave: ITeacherLeave };
interface IEditAcceptTeacherLeaveActionType { type: string, teacher_leave: ITeacherLeave };
interface IRemoveAcceptTeacherLeaveActionType { type: string, id: string };

interface IInitialRemoveTeacherLeaveActionType {type: string, teacher_leave: ITeacherLeave};
interface IRemoveRemoveTeacherLeaveAllActionType { type: string };
interface IAddRemoveTeacherLeaveActionType { type: string, teacher_leave: ITeacherLeave };
interface IEditRemoveTeacherLeaveActionType { type: string, teacher_leave: ITeacherLeave };
interface IRemoveRemoveTeacherLeaveActionType { type: string, id: string };
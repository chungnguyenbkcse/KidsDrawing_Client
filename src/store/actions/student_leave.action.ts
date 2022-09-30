import { IStudentLeave, StudentLeaveModificationStatus } from "../models/student_leave.interface";

// register_successfull_student_leaves
export const ADD_STUDENT_LEAVE_NOT_APPROVED_NOW: string = "ADD_STUDENT_LEAVE_NOT_APPROVED_NOW";
export const EDIT_STUDENT_LEAVE_NOT_APPROVED_NOW: string = "EDIT_STUDENT_LEAVE_NOT_APPROVED_NOW";
export const REMOVE_STUDENT_LEAVE_NOT_APPROVED_NOW: string = "REMOVE_STUDENT_LEAVE_NOT_APPROVED_NOW";
export const CHANGE_STUDENT_LEAVE_NOT_APPROVED_NOW_AMOUNT: string = "CHANGE_STUDENT_LEAVE_NOT_APPROVED_NOW_AMOUNT";
export const CHANGE_STUDENT_LEAVE_NOT_APPROVED_NOW_PENDING_EDIT: string = "CHANGE_STUDENT_LEAVE_NOT_APPROVED_NOW_PENDING_EDIT";
export const CLEAR_STUDENT_LEAVE_NOT_APPROVED_NOW_PENDING_EDIT: string = "CLEAR_STUDENT_LEAVE_NOT_APPROVED_NOW_PENDING_EDIT";
export const REMOVE_STUDENT_LEAVE_NOT_APPROVED_NOW_ALL: string = "REMOVE_STUDENT_LEAVE_NOT_APPROVED_NOW_ALL";
export const INITIAL_STUDENT_LEAVE_NOT_APPROVED_NOW: string = "INITIAL_STUDENT_LEAVE_NOT_APPROVED_NOW";

// not_register_student_leaves
export const ADD_STUDENT_LEAVE_APPROVED: string = "ADD_STUDENT_LEAVE_APPROVED";
export const EDIT_STUDENT_LEAVE_APPROVED: string = "EDIT_STUDENT_LEAVE_APPROVED";
export const REMOVE_STUDENT_LEAVE_APPROVED: string = "REMOVE_STUDENT_LEAVE_APPROVED";
export const CHANGE_STUDENT_LEAVE_APPROVED_AMOUNT: string = "CHANGE_STUDENT_LEAVE_APPROVED_AMOUNT";
export const CHANGE_STUDENT_LEAVE_APPROVED_PENDING_EDIT: string = "CHANGE_STUDENT_LEAVE_APPROVED_PENDING_EDIT";
export const CLEAR_STUDENT_LEAVE_APPROVED_PENDING_EDIT: string = "CLEAR_STUDENT_LEAVE_APPROVED_PENDING_EDIT";
export const REMOVE_STUDENT_LEAVE_APPROVED_ALL: string = "REMOVE_STUDENT_LEAVE_APPROVED_ALL";
export const INITIAL_STUDENT_LEAVE_APPROVED: string = "INITIAL_STUDENT_LEAVE_APPROVED";


// not_register_student_leaves
export const ADD_STUDENT_LEAVE_NOT_APPROVED: string = "ADD_STUDENT_LEAVE_NOT_APPROVED";
export const EDIT_STUDENT_LEAVE_NOT_APPROVED: string = "EDIT_STUDENT_LEAVE_NOT_APPROVED";
export const REMOVE_STUDENT_LEAVE_NOT_APPROVED: string = "REMOVE_STUDENT_LEAVE_NOT_APPROVED";
export const CHANGE_STUDENT_LEAVE_NOT_APPROVED_AMOUNT: string = "CHANGE_STUDENT_LEAVE_NOT_APPROVED_AMOUNT";
export const CHANGE_STUDENT_LEAVE_NOT_APPROVED_PENDING_EDIT: string = "CHANGE_STUDENT_LEAVE_NOT_APPROVED_PENDING_EDIT";
export const CLEAR_STUDENT_LEAVE_NOT_APPROVED_PENDING_EDIT: string = "CLEAR_STUDENT_LEAVE_NOT_APPROVED_PENDING_EDIT";
export const REMOVE_STUDENT_LEAVE_NOT_APPROVED_ALL: string = "REMOVE_STUDENT_LEAVE_NOT_APPROVED_ALL";
export const INITIAL_STUDENT_LEAVE_NOT_APPROVED: string = "INITIAL_STUDENT_LEAVE_NOT_APPROVED";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(student_leave: IStudentLeave) {
    return {
        type: FETCH_DATA_SUCCESS,
        student_leave
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialStudentLeaveNotApprovedNow(student_leave: IStudentLeave): IInitialStudentLeaveNotApprovedNowActionType {
    return { type: INITIAL_STUDENT_LEAVE_NOT_APPROVED_NOW, student_leave: student_leave };
}

export function removeStudentLeaveNotApprovedNowAll(): IRemoveStudentLeaveNotApprovedNowAllActionType {
    return { type: REMOVE_STUDENT_LEAVE_NOT_APPROVED_NOW_ALL };
}

export function addStudentLeaveNotApprovedNow(student_leave: IStudentLeave): IAddStudentLeaveNotApprovedNowActionType {
    return { type: ADD_STUDENT_LEAVE_NOT_APPROVED_NOW, student_leave: student_leave };
}

export function editStudentLeaveNotApprovedNow(student_leave: IStudentLeave): IEditStudentLeaveNotApprovedNowActionType {
    return { type: EDIT_STUDENT_LEAVE_NOT_APPROVED_NOW, student_leave: student_leave };
}

export function removeStudentLeaveNotApprovedNow(id: string): IRemoveStudentLeaveNotApprovedNowActionType {
    return { type: REMOVE_STUDENT_LEAVE_NOT_APPROVED_NOW, id: id };
}

export function changeSelectedStudentLeaveNotApprovedNow(student_leave: IStudentLeave): IChangeSelectedStudentLeaveNotApprovedNowActionType {
    return { type: CHANGE_STUDENT_LEAVE_NOT_APPROVED_NOW_PENDING_EDIT, student_leave: student_leave };
}

export function clearSelectedStudentLeaveNotApprovedNow(): IClearSelectedStudentLeaveNotApprovedNowActionType {
    return { type: CLEAR_STUDENT_LEAVE_NOT_APPROVED_NOW_PENDING_EDIT };
}


export function initialStudentLeaveApproved(student_leave: IStudentLeave): IInitialStudentLeaveApprovedActionType {
    return { type: INITIAL_STUDENT_LEAVE_APPROVED, student_leave: student_leave };
}

export function removeStudentLeaveApprovedAll(): IRemoveStudentLeaveApprovedAllActionType {
    return { type: REMOVE_STUDENT_LEAVE_APPROVED_ALL };
}

export function addStudentLeaveApproved(student_leave: IStudentLeave): IAddStudentLeaveApprovedActionType {
    return { type: ADD_STUDENT_LEAVE_APPROVED, student_leave: student_leave };
}

export function editStudentLeaveApproved(student_leave: IStudentLeave): IEditStudentLeaveApprovedActionType {
    return { type: EDIT_STUDENT_LEAVE_APPROVED, student_leave: student_leave };
}

export function removeStudentLeaveApproved(id: string): IRemoveStudentLeaveApprovedActionType {
    return { type: REMOVE_STUDENT_LEAVE_APPROVED, id: id };
}

export function changeSelectedStudentLeaveApproved(student_leave: IStudentLeave): IChangeSelectedStudentLeaveApprovedActionType {
    return { type: CHANGE_STUDENT_LEAVE_APPROVED_PENDING_EDIT, student_leave: student_leave };
}

export function clearSelectedStudentLeaveApproved(): IClearSelectedStudentLeaveApprovedActionType {
    return { type: CLEAR_STUDENT_LEAVE_APPROVED_PENDING_EDIT };
}

export function setModificationState(value: StudentLeaveModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}



export function initialStudentLeaveNotApproved(student_leave: IStudentLeave): IInitialStudentLeaveNotApprovedActionType {
    return { type: INITIAL_STUDENT_LEAVE_NOT_APPROVED, student_leave: student_leave };
}

export function removeStudentLeaveNotApprovedAll(): IRemoveStudentLeaveNotApprovedAllActionType {
    return { type: REMOVE_STUDENT_LEAVE_NOT_APPROVED_ALL };
}

export function addStudentLeaveNotApproved(student_leave: IStudentLeave): IAddStudentLeaveNotApprovedActionType {
    return { type: ADD_STUDENT_LEAVE_NOT_APPROVED, student_leave: student_leave };
}

export function editStudentLeaveNotApproved(student_leave: IStudentLeave): IEditStudentLeaveNotApprovedActionType {
    return { type: EDIT_STUDENT_LEAVE_NOT_APPROVED, student_leave: student_leave };
}

export function removeStudentLeaveNotApproved(id: string): IRemoveStudentLeaveNotApprovedActionType {
    return { type: REMOVE_STUDENT_LEAVE_NOT_APPROVED, id: id };
}

export function changeSelectedStudentLeaveNotApproved(student_leave: IStudentLeave): IChangeSelectedStudentLeaveNotApprovedActionType {
    return { type: CHANGE_STUDENT_LEAVE_NOT_APPROVED_AMOUNT, student_leave: student_leave };
}

export function clearSelectedStudentLeaveNotApproved(): IClearSelectedStudentLeaveNotApprovedActionType {
    return { type: CHANGE_STUDENT_LEAVE_NOT_APPROVED_PENDING_EDIT };
}

// register_successfull_student_leaves
interface IAddStudentLeaveNotApprovedNowActionType { type: string, student_leave: IStudentLeave };
interface IEditStudentLeaveNotApprovedNowActionType { type: string, student_leave: IStudentLeave };
interface IRemoveStudentLeaveNotApprovedNowActionType { type: string, id: string };
interface IChangeSelectedStudentLeaveNotApprovedNowActionType { type: string, student_leave: IStudentLeave };
interface IClearSelectedStudentLeaveNotApprovedNowActionType { type: string };
interface IRemoveStudentLeaveNotApprovedNowAllActionType { type: string }
interface IInitialStudentLeaveNotApprovedNowActionType {type: string, student_leave: IStudentLeave}

// not_register_student_leaves
interface IAddStudentLeaveApprovedActionType { type: string, student_leave: IStudentLeave };
interface IEditStudentLeaveApprovedActionType { type: string, student_leave: IStudentLeave };
interface IRemoveStudentLeaveApprovedActionType { type: string, id: string };
interface IChangeSelectedStudentLeaveApprovedActionType { type: string, student_leave: IStudentLeave };
interface IClearSelectedStudentLeaveApprovedActionType { type: string };
interface IRemoveStudentLeaveApprovedAllActionType { type: string }
interface IInitialStudentLeaveApprovedActionType {type: string, student_leave: IStudentLeave}


// register_successfull_student_leaves
interface IAddStudentLeaveNotApprovedActionType { type: string, student_leave: IStudentLeave };
interface IEditStudentLeaveNotApprovedActionType { type: string, student_leave: IStudentLeave };
interface IRemoveStudentLeaveNotApprovedActionType { type: string, id: string };
interface IChangeSelectedStudentLeaveNotApprovedActionType { type: string, student_leave: IStudentLeave };
interface IClearSelectedStudentLeaveNotApprovedActionType { type: string };
interface IRemoveStudentLeaveNotApprovedAllActionType { type: string }
interface IInitialStudentLeaveNotApprovedActionType {type: string, student_leave: IStudentLeave}




interface ISetModificationStateActionType { type: string, value:  StudentLeaveModificationStatus};
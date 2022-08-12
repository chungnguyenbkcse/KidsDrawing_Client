import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../models/teacher_register_quantification.interface";

// Approved
export const REMOVE_TEACHER_REGISTER_QUANTIFICATION_APPROVED_ALL: string = "REMOVE_TEACHER_REGISTER_QUANTIFICATION_APPROVED_ALL";
export const INITIAL_TEACHER_REGISTER_QUANTIFICATION_APPROVED: string = "INITIAL_TEACHER_REGISTER_QUANTIFICATION_APPROVED";
export const ADD_TEACHER_REGISTER_QUANTIFICATION_APPROVED: string = "ADD_TEACHER_REGISTER_QUANTIFICATION_APPROVED";
export const EDIT_TEACHER_REGISTER_QUANTIFICATION_APPROVED: string = "EDIT_TEACHER_REGISTER_QUANTIFICATION_APPROVED";
export const REMOVE_TEACHER_REGISTER_QUANTIFICATION_APPROVED: string = "REMOVE_TEACHER_REGISTER_QUANTIFICATION_APPROVED";
export const CHANGE_TEACHER_REGISTER_QUANTIFICATION_AMOUNT_APPROVED: string = "CHANGE_TEACHER_REGISTER_QUANTIFICATION_AMOUNT_APPROVED";
export const CHANGE_TEACHER_REGISTER_QUANTIFICATION_APPROVED_PENDING_EDIT: string = "CHANGE_TEACHER_REGISTER_QUANTIFICATION_APPROVED_PENDING_EDIT";
export const CLEAR_TEACHER_REGISTER_QUANTIFICATION_APPROVED_PENDING_EDIT: string = "CLEAR_TEACHER_REGISTER_QUANTIFICATION_APPROVED_PENDING_EDIT";

// Not approved
export const REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_ALL: string = "REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_ALL";
export const INITIAL_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED: string = "INITIAL_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED";
export const ADD_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED: string = "ADD_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED";
export const EDIT_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED: string = "EDIT_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED";
export const REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED: string = "REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED";
export const CHANGE_TEACHER_REGISTER_QUANTIFICATION_AMOUNT_NOT_APPROVED: string = "CHANGE_TEACHER_REGISTER_QUANTIFICATION_AMOUNT_NOT_APPROVED";
export const CHANGE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_PENDING_EDIT: string = "CHANGE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_PENDING_EDIT";
export const CLEAR_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_PENDING_EDIT: string = "CLEAR_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_PENDING_EDIT";

// Not approved now
export const REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_ALL: string = "REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_ALL";
export const INITIAL_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW: string = "INITIAL_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW";
export const ADD_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW: string = "ADD_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW";
export const EDIT_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW: string = "EDIT_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW";
export const REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW: string = "REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW";
export const CHANGE_TEACHER_REGISTER_QUANTIFICATION_AMOUNT_NOT_APPROVED_NOW: string = "CHANGE_TEACHER_REGISTER_QUANTIFICATION_AMOUNT_NOT_APPROVED_NOW";
export const CHANGE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_PENDING_EDIT: string = "CHANGE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_PENDING_EDIT";
export const CLEAR_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_PENDING_EDIT: string = "CLEAR_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_PENDING_EDIT";

export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(teacher_register_quantification: ITeacherRegisterQuantification) {
    return {
        type: FETCH_DATA_SUCCESS,
        teacher_register_quantification
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function setModificationState(value: TeacherRegisterQuantificationModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}


// Approved
export function initialTeacherRegisterQuatificationApproved(teacher_register_quantification_approved: ITeacherRegisterQuantification): IInitialTeacherRegisterQuatificationApprovedActionType {
    return { type: INITIAL_TEACHER_REGISTER_QUANTIFICATION_APPROVED, teacher_register_quantification_approved: teacher_register_quantification_approved };
}

export function removeTeacherRegisterQuatificationApprovedAll(): IRemoveTeacherRegisterQuatificationAllApprovedActionType {
    return { type: REMOVE_TEACHER_REGISTER_QUANTIFICATION_APPROVED_ALL };
}

export function addTeacherRegisterQuatificationApproved(teacher_register_quantification_approved: ITeacherRegisterQuantification): IAddTeacherRegisterQuatificationApprovedActionType {
    return { type: ADD_TEACHER_REGISTER_QUANTIFICATION_APPROVED, teacher_register_quantification_approved: teacher_register_quantification_approved };
}

export function editTeacherRegisterQuatificationApproved(teacher_register_quantification_approved: ITeacherRegisterQuantification): IEditTeacherRegisterQuatificationApprovedActionType {
    return { type: EDIT_TEACHER_REGISTER_QUANTIFICATION_APPROVED, teacher_register_quantification_approved: teacher_register_quantification_approved };
}

export function removeTeacherRegisterQuatificationApproved(id: number): IRemoveTeacherRegisterQuatificationApprovedActionType {
    return { type: REMOVE_TEACHER_REGISTER_QUANTIFICATION_APPROVED, id: id };
}

export function changeSelectedTeacherRegisterQuatificationApproved(teacher_register_quantification_approved: ITeacherRegisterQuantification): IChangeSelectedTeacherRegisterQuatificationApprovedActionType {
    return { type: CHANGE_TEACHER_REGISTER_QUANTIFICATION_APPROVED_PENDING_EDIT, teacher_register_quantification_approved: teacher_register_quantification_approved };
}

export function clearSelectedTeacherRegisterQuatification(): IClearSelectedTeacherRegisterQuatificationApprovedActionType {
    return { type: CLEAR_TEACHER_REGISTER_QUANTIFICATION_APPROVED_PENDING_EDIT };
}


// Not Approved
export function initialTeacherRegisterQuatificationNotApproved(teacher_register_quantification_not_approved: ITeacherRegisterQuantification): IInitialTeacherRegisterQuatificationNotApprovedActionType {
    return { type: INITIAL_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED, teacher_register_quantification_not_approved: teacher_register_quantification_not_approved };
}

export function removeTeacherRegisterQuatificationNotApprovedAll(): IRemoveTeacherRegisterQuatificationAllNotApprovedActionType {
    return { type: REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_ALL };
}

export function addTeacherRegisterQuatificationNotApproved(teacher_register_quantification_not_approved: ITeacherRegisterQuantification): IAddTeacherRegisterQuatificationNotApprovedActionType {
    return { type: ADD_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED, teacher_register_quantification_not_approved: teacher_register_quantification_not_approved };
}

export function editTeacherRegisterQuatificationNotApproved(teacher_register_quantification_not_approved: ITeacherRegisterQuantification): IEditTeacherRegisterQuatificationNotApprovedActionType {
    return { type: EDIT_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED, teacher_register_quantification_not_approved: teacher_register_quantification_not_approved };
}

export function removeTeacherRegisterQuatificationNotApproved(id: number): IRemoveTeacherRegisterQuatificationNotApprovedActionType {
    return { type: REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED, id: id };
}

export function changeSelectedTeacherRegisterQuatificationNotApproved(teacher_register_quantification_not_approved: ITeacherRegisterQuantification): IChangeSelectedTeacherRegisterQuatificationNotApprovedActionType {
    return { type: CHANGE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_PENDING_EDIT, teacher_register_quantification_not_approved: teacher_register_quantification_not_approved };
}

export function clearSelectedTeacherRegisterNotQuatification(): IClearSelectedTeacherRegisterQuatificationNotApprovedActionType {
    return { type: CLEAR_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_PENDING_EDIT };
}



// Not Approved now
export function initialTeacherRegisterQuatificationNotApprovedNow(teacher_register_quantification_not_approved_now: ITeacherRegisterQuantification): IInitialTeacherRegisterQuatificationNotApprovedNowActionType {
    return { type: INITIAL_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW, teacher_register_quantification_not_approved_now: teacher_register_quantification_not_approved_now };
}

export function removeTeacherRegisterQuatificationNotApprovedNowAll(): IRemoveTeacherRegisterQuatificationAllNotApprovedNowActionType {
    return { type: REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_ALL };
}

export function addTeacherRegisterQuatificationNotApprovedNow(teacher_register_quantification_not_approved_now: ITeacherRegisterQuantification): IAddTeacherRegisterQuatificationNotApprovedNowActionType {
    return { type: ADD_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW, teacher_register_quantification_not_approved_now: teacher_register_quantification_not_approved_now };
}

export function editTeacherRegisterQuatificationNotApprovedNow(teacher_register_quantification_not_approved_now: ITeacherRegisterQuantification): IEditTeacherRegisterQuatificationNotApprovedNowActionType {
    return { type: EDIT_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW, teacher_register_quantification_not_approved_now: teacher_register_quantification_not_approved_now };
}

export function removeTeacherRegisterQuatificationNotApprovedNow(id: number): IRemoveTeacherRegisterQuatificationNotApprovedNowActionType {
    return { type: REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW, id: id };
}

export function changeSelectedTeacherRegisterQuatificationNotApprovedNow(teacher_register_quantification_not_approved_now: ITeacherRegisterQuantification): IChangeSelectedTeacherRegisterQuatificationNotApprovedNowActionType {
    return { type: CHANGE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_PENDING_EDIT, teacher_register_quantification_not_approved_now: teacher_register_quantification_not_approved_now };
}

export function clearSelectedTeacherRegisterNotQuatificationNow(): IClearSelectedTeacherRegisterQuatificationNotApprovedNowActionType {
    return { type: CLEAR_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_PENDING_EDIT };
}

// Approved
interface IAddTeacherRegisterQuatificationApprovedActionType { type: string, teacher_register_quantification_approved: ITeacherRegisterQuantification };
interface IEditTeacherRegisterQuatificationApprovedActionType { type: string, teacher_register_quantification_approved: ITeacherRegisterQuantification };
interface IRemoveTeacherRegisterQuatificationApprovedActionType { type: string, id: number };
interface IChangeSelectedTeacherRegisterQuatificationApprovedActionType { type: string, teacher_register_quantification_approved: ITeacherRegisterQuantification };
interface IClearSelectedTeacherRegisterQuatificationApprovedActionType { type: string };
interface IRemoveTeacherRegisterQuatificationAllApprovedActionType { type: string }
interface IInitialTeacherRegisterQuatificationApprovedActionType {type: string, teacher_register_quantification_approved: ITeacherRegisterQuantification}

// Not Approved
interface IAddTeacherRegisterQuatificationNotApprovedActionType { type: string, teacher_register_quantification_not_approved: ITeacherRegisterQuantification };
interface IEditTeacherRegisterQuatificationNotApprovedActionType { type: string, teacher_register_quantification_not_approved: ITeacherRegisterQuantification };
interface IRemoveTeacherRegisterQuatificationNotApprovedActionType { type: string, id: number };
interface IChangeSelectedTeacherRegisterQuatificationNotApprovedActionType { type: string, teacher_register_quantification_not_approved: ITeacherRegisterQuantification };
interface IClearSelectedTeacherRegisterQuatificationNotApprovedActionType { type: string };
interface IRemoveTeacherRegisterQuatificationAllNotApprovedActionType { type: string }
interface IInitialTeacherRegisterQuatificationNotApprovedActionType {type: string, teacher_register_quantification_not_approved: ITeacherRegisterQuantification}

// Not Approved now
interface IAddTeacherRegisterQuatificationNotApprovedNowActionType { type: string, teacher_register_quantification_not_approved_now: ITeacherRegisterQuantification };
interface IEditTeacherRegisterQuatificationNotApprovedNowActionType { type: string, teacher_register_quantification_not_approved_now: ITeacherRegisterQuantification };
interface IRemoveTeacherRegisterQuatificationNotApprovedNowActionType { type: string, id: number };
interface IChangeSelectedTeacherRegisterQuatificationNotApprovedNowActionType { type: string, teacher_register_quantification_not_approved_now: ITeacherRegisterQuantification };
interface IClearSelectedTeacherRegisterQuatificationNotApprovedNowActionType { type: string };
interface IRemoveTeacherRegisterQuatificationAllNotApprovedNowActionType { type: string }
interface IInitialTeacherRegisterQuatificationNotApprovedNowActionType {type: string, teacher_register_quantification_not_approved_now: ITeacherRegisterQuantification}

interface ISetModificationStateActionType { type: string, value:  TeacherRegisterQuantificationModificationStatus};
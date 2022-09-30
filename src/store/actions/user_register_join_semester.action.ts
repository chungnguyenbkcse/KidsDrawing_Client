import { IUserRegisterJoinSemester, UserRegisterJoinSemesterModificationStatus } from "../models/user_register_join_semester.interface";

// register_successfull_user_register_join_semesters
export const ADD_COMPLETED: string = "ADD_COMPLETED";
export const EDIT_COMPLETED: string = "EDIT_COMPLETED";
export const REMOVE_COMPLETED: string = "REMOVE_COMPLETED";
export const CHANGE_COMPLETED_AMOUNT: string = "CHANGE_COMPLETED_AMOUNT";
export const CHANGE_COMPLETED_PENDING_EDIT: string = "CHANGE_COMPLETED_PENDING_EDIT";
export const CLEAR_COMPLETED_PENDING_EDIT: string = "CLEAR_COMPLETED_PENDING_EDIT";
export const REMOVE_COMPLETED_ALL: string = "REMOVE_COMPLETED_ALL";
export const INITIAL_COMPLETED: string = "INITIAL_COMPLETED";

// not_register_user_register_join_semesters
export const ADD_WAITING: string = "ADD_WAITING";
export const EDIT_WAITING: string = "EDIT_WAITING";
export const REMOVE_WAITING: string = "REMOVE_WAITING";
export const CHANGE_WAITING_AMOUNT: string = "CHANGE_WAITING_AMOUNT";
export const CHANGE_WAITING_PENDING_EDIT: string = "CHANGE_WAITING_PENDING_EDIT";
export const CLEAR_WAITING_PENDING_EDIT: string = "CLEAR_WAITING_PENDING_EDIT";
export const REMOVE_WAITING_ALL: string = "REMOVE_WAITING_ALL";
export const INITIAL_WAITING: string = "INITIAL_WAITING";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(user_register_join_semester: IUserRegisterJoinSemester) {
    return {
        type: FETCH_DATA_SUCCESS,
        user_register_join_semester
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialCompleted(user_register_join_semester: IUserRegisterJoinSemester): IInitialCompletedActionType {
    return { type: INITIAL_COMPLETED, user_register_join_semester: user_register_join_semester };
}

export function removeCompletedAll(): IRemoveCompletedAllActionType {
    return { type: REMOVE_COMPLETED_ALL };
}

export function addCompleted(user_register_join_semester: IUserRegisterJoinSemester): IAddCompletedActionType {
    return { type: ADD_COMPLETED, user_register_join_semester: user_register_join_semester };
}

export function editCompleted(user_register_join_semester: IUserRegisterJoinSemester): IEditCompletedActionType {
    return { type: EDIT_COMPLETED, user_register_join_semester: user_register_join_semester };
}

export function removeCompleted(id: string): IRemoveCompletedActionType {
    return { type: REMOVE_COMPLETED, id: id };
}

export function changeSelectedCompleted(user_register_join_semester: IUserRegisterJoinSemester): IChangeSelectedCompletedActionType {
    return { type: CHANGE_COMPLETED_PENDING_EDIT, user_register_join_semester: user_register_join_semester };
}

export function clearSelectedCompleted(): IClearSelectedCompletedActionType {
    return { type: CLEAR_COMPLETED_PENDING_EDIT };
}


export function initialWaiting(user_register_join_semester: IUserRegisterJoinSemester): IInitialWaitingActionType {
    return { type: INITIAL_WAITING, user_register_join_semester: user_register_join_semester };
}

export function removeWaitingAll(): IRemoveWaitingAllActionType {
    return { type: REMOVE_WAITING_ALL };
}

export function addWaiting(user_register_join_semester: IUserRegisterJoinSemester): IAddWaitingActionType {
    return { type: ADD_WAITING, user_register_join_semester: user_register_join_semester };
}

export function editWaiting(user_register_join_semester: IUserRegisterJoinSemester): IEditWaitingActionType {
    return { type: EDIT_WAITING, user_register_join_semester: user_register_join_semester };
}

export function removeWaiting(id: string): IRemoveWaitingActionType {
    return { type: REMOVE_WAITING, id: id };
}

export function changeSelectedWaiting(user_register_join_semester: IUserRegisterJoinSemester): IChangeSelectedWaitingActionType {
    return { type: CHANGE_WAITING_PENDING_EDIT, user_register_join_semester: user_register_join_semester };
}

export function clearSelectedWaiting(): IClearSelectedWaitingActionType {
    return { type: CLEAR_WAITING_PENDING_EDIT };
}

export function setModificationState(value: UserRegisterJoinSemesterModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_user_register_join_semesters
interface IAddCompletedActionType { type: string, user_register_join_semester: IUserRegisterJoinSemester };
interface IEditCompletedActionType { type: string, user_register_join_semester: IUserRegisterJoinSemester };
interface IRemoveCompletedActionType { type: string, id: string };
interface IChangeSelectedCompletedActionType { type: string, user_register_join_semester: IUserRegisterJoinSemester };
interface IClearSelectedCompletedActionType { type: string };
interface IRemoveCompletedAllActionType { type: string }
interface IInitialCompletedActionType {type: string, user_register_join_semester: IUserRegisterJoinSemester}

// not_register_user_register_join_semesters
interface IAddWaitingActionType { type: string, user_register_join_semester: IUserRegisterJoinSemester };
interface IEditWaitingActionType { type: string, user_register_join_semester: IUserRegisterJoinSemester };
interface IRemoveWaitingActionType { type: string, id: string };
interface IChangeSelectedWaitingActionType { type: string, user_register_join_semester: IUserRegisterJoinSemester };
interface IClearSelectedWaitingActionType { type: string };
interface IRemoveWaitingAllActionType { type: string }
interface IInitialWaitingActionType {type: string, user_register_join_semester: IUserRegisterJoinSemester}



interface ISetModificationStateActionType { type: string, value:  UserRegisterJoinSemesterModificationStatus};
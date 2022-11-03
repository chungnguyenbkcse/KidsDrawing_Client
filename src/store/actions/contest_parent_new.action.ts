import { IContestParentNew, ContestParentNewModificationStatus } from "../models/contest_parent_new.interface";
export const ADD_CONTEST_PARENT_NEW: string = "ADD_CONTEST_PARENT_NEW";
export const EDIT_CONTEST_PARENT_NEW: string = "EDIT_CONTEST_PARENT_NEW";
export const REMOVE_CONTEST_PARENT_NEW: string = "REMOVE_CONTEST_PARENT_NEW";
export const CHANGE_CONTEST_PARENT_NEW_AMOUNT: string = "CHANGE_CONTEST_PARENT_NEW_AMOUNT";
export const CHANGE_CONTEST_PARENT_NEW_PENDING_EDIT: string = "CHANGE_CONTEST_PARENT_NEW_PENDING_EDIT";
export const CLEAR_CONTEST_PARENT_NEW_PENDING_EDIT: string = "CLEAR_CONTEST_PARENT_NEW_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_CONTEST_PARENT_NEW_ALL: string = "REMOVE_CONTEST_PARENT_NEW_ALL";
export const INITIAL_CONTEST_PARENT_NEW: string = "INITIAL_CONTEST_PARENT_NEW";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(contest_parent_new: IContestParentNew) {
    return {
        type: FETCH_DATA_SUCCESS,
        contest_parent_new
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialContestParentNew(contest_parent_new: IContestParentNew): IInitialContestParentNewActionType {
    return { type: INITIAL_CONTEST_PARENT_NEW, contest_parent_new: contest_parent_new };
}

export function removeContestParentNewAll(): IRemoveContestParentNewAllActionType {
    return { type: REMOVE_CONTEST_PARENT_NEW_ALL };
}

export function addContestParentNew(contest_parent_new: IContestParentNew): IAddContestParentNewActionType {
    return { type: ADD_CONTEST_PARENT_NEW, contest_parent_new: contest_parent_new };
}

export function editContestParentNew(contest_parent_new: IContestParentNew): IEditContestParentNewActionType {
    return { type: EDIT_CONTEST_PARENT_NEW, contest_parent_new: contest_parent_new };
}

export function removeContestParentNew(id: any): IRemoveContestParentNewActionType {
    return { type: REMOVE_CONTEST_PARENT_NEW, id: id };
}

export function changeSelectedContestParentNew(contest_parent_new: IContestParentNew): IChangeSelectedContestParentNewActionType {
    return { type: CHANGE_CONTEST_PARENT_NEW_PENDING_EDIT, contest_parent_new: contest_parent_new };
}

export function clearSelectedContestParentNew(): IClearSelectedContestParentNewActionType {
    return { type: CLEAR_CONTEST_PARENT_NEW_PENDING_EDIT };
}

export function setModificationState(value: ContestParentNewModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddContestParentNewActionType { type: string, contest_parent_new: IContestParentNew };
interface IEditContestParentNewActionType { type: string, contest_parent_new: IContestParentNew };
interface IRemoveContestParentNewActionType { type: string, id: any };
interface IChangeSelectedContestParentNewActionType { type: string, contest_parent_new: IContestParentNew };
interface IClearSelectedContestParentNewActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ContestParentNewModificationStatus};
interface IRemoveContestParentNewAllActionType { type: string }
interface IInitialContestParentNewActionType {type: string, contest_parent_new: IContestParentNew}
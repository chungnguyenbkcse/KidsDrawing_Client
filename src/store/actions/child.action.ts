import { IChild, ChildModificationStatus } from "../models/child.interface";
export const ADD_CHILD: string = "ADD_CHILD";
export const EDIT_CHILD: string = "EDIT_CHILD";
export const REMOVE_CHILD: string = "REMOVE_CHILD";
export const CHANGE_CHILD_AMOUNT: string = "CHANGE_CHILD_AMOUNT";
export const CHANGE_CHILD_PENDING_EDIT: string = "CHANGE_CHILD_PENDING_EDIT";
export const CLEAR_CHILD_PENDING_EDIT: string = "CLEAR_CHILD_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_CHILD_ALL: string = "REMOVE_CHILD_ALL";
export const INITIAL_CHILD: string = "INITIAL_CHILD";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(child: IChild) {
    return {
        type: FETCH_DATA_SUCCESS,
        child
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialChild(child: IChild): IInitialChildActionType {
    return { type: INITIAL_CHILD, child: child };
}

export function removeChildAll(): IRemoveChildAllActionType {
    return { type: REMOVE_CHILD_ALL };
}

export function addChild(child: IChild): IAddChildActionType {
    return { type: ADD_CHILD, child: child };
}

export function editChild(child: IChild): IEditChildActionType {
    return { type: EDIT_CHILD, child: child };
}

export function removeChild(id: any): IRemoveChildActionType {
    return { type: REMOVE_CHILD, id: id };
}

export function changeSelectedChild(child: IChild): IChangeSelectedChildActionType {
    return { type: CHANGE_CHILD_PENDING_EDIT, child: child };
}

export function clearSelectedChild(): IClearSelectedChildActionType {
    return { type: CLEAR_CHILD_PENDING_EDIT };
}

export function setModificationState(value: ChildModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddChildActionType { type: string, child: IChild };
interface IEditChildActionType { type: string, child: IChild };
interface IRemoveChildActionType { type: string, id: any };
interface IChangeSelectedChildActionType { type: string, child: IChild };
interface IClearSelectedChildActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ChildModificationStatus};
interface IRemoveChildAllActionType { type: string }
interface IInitialChildActionType {type: string, child: IChild}
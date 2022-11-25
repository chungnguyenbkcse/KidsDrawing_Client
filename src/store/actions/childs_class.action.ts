import { IChildsClass, ChildsClassModificationStatus } from "../models/childs_class.interface";
export const ADD_CHILDS_CLASS: string = "ADD_CHILDS_CLASS";
export const EDIT_CHILDS_CLASS: string = "EDIT_CHILDS_CLASS";
export const REMOVE_CHILDS_CLASS: string = "REMOVE_CHILDS_CLASS";
export const CHANGE_CHILDS_CLASS_AMOUNT: string = "CHANGE_CHILDS_CLASS_AMOUNT";
export const CHANGE_CHILDS_CLASS_PENDING_EDIT: string = "CHANGE_CHILDS_CLASS_PENDING_EDIT";
export const CLEAR_CHILDS_CLASS_PENDING_EDIT: string = "CLEAR_CHILDS_CLASS_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_CHILDS_CLASS_ALL: string = "REMOVE_CHILDS_CLASS_ALL";
export const INITIAL_CHILDS_CLASS: string = "INITIAL_CHILDS_CLASS";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(childs_class: IChildsClass) {
    return {
        type: FETCH_DATA_SUCCESS,
        childs_class
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialChildsClass(childs_class: IChildsClass): IInitialChildsClassActionType {
    return { type: INITIAL_CHILDS_CLASS, childs_class: childs_class };
}

export function removeChildsClassAll(): IRemoveChildsClassAllActionType {
    return { type: REMOVE_CHILDS_CLASS_ALL };
}

export function addChildsClass(childs_class: IChildsClass): IAddChildsClassActionType {
    return { type: ADD_CHILDS_CLASS, childs_class: childs_class };
}

export function editChildsClass(childs_class: IChildsClass): IEditChildsClassActionType {
    return { type: EDIT_CHILDS_CLASS, childs_class: childs_class };
}

export function removeChildsClass(id: any): IRemoveChildsClassActionType {
    return { type: REMOVE_CHILDS_CLASS, id: id };
}

export function changeSelectedChildsClass(childs_class: IChildsClass): IChangeSelectedChildsClassActionType {
    return { type: CHANGE_CHILDS_CLASS_PENDING_EDIT, childs_class: childs_class };
}

export function clearSelectedChildsClass(): IClearSelectedChildsClassActionType {
    return { type: CLEAR_CHILDS_CLASS_PENDING_EDIT };
}

export function setModificationState(value: ChildsClassModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddChildsClassActionType { type: string, childs_class: IChildsClass };
interface IEditChildsClassActionType { type: string, childs_class: IChildsClass };
interface IRemoveChildsClassActionType { type: string, id: any };
interface IChangeSelectedChildsClassActionType { type: string, childs_class: IChildsClass };
interface IClearSelectedChildsClassActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ChildsClassModificationStatus};
interface IRemoveChildsClassAllActionType { type: string }
interface IInitialChildsClassActionType {type: string, childs_class: IChildsClass}
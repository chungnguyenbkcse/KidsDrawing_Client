import { IMyClass, MyClassModificationStatus } from "../models/my_class.interface";
export const ADD_MY_CLASS: string = "ADD_MY_CLASS";
export const EDIT_MY_CLASS: string = "EDIT_MY_CLASS";
export const REMOVE_MY_CLASS: string = "REMOVE_MY_CLASS";
export const CHANGE_MY_CLASS_AMOUNT: string = "CHANGE_MY_CLASS_AMOUNT";
export const CHANGE_MY_CLASS_PENDING_EDIT: string = "CHANGE_MY_CLASS_PENDING_EDIT";
export const CLEAR_MY_CLASS_PENDING_EDIT: string = "CLEAR_MY_CLASS_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_MY_CLASS_ALL: string = "REMOVE_MY_CLASS_ALL";
export const INITIAL_MY_CLASS: string = "INITIAL_MY_CLASS";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(myclass: IMyClass) {
    return {
        type: FETCH_DATA_SUCCESS,
        myclass
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialMyClass(myclass: IMyClass): IInitialMyClassActionType {
    return { type: INITIAL_MY_CLASS, myclass: myclass };
}

export function removeMyClassAll(): IRemoveMyClassAllActionType {
    return { type: REMOVE_MY_CLASS_ALL };
}

export function addMyClass(myclass: IMyClass): IAddMyClassActionType {
    return { type: ADD_MY_CLASS, myclass: myclass };
}

export function editMyClass(myclass: IMyClass): IEditMyClassActionType {
    return { type: EDIT_MY_CLASS, myclass: myclass };
}

export function removeMyClass(id: number): IRemoveMyClassActionType {
    return { type: REMOVE_MY_CLASS, id: id };
}

export function changeSelectedMyClass(myclass: IMyClass): IChangeSelectedMyClassActionType {
    return { type: CHANGE_MY_CLASS_PENDING_EDIT, myclass: myclass };
}

export function clearSelectedMyClass(): IClearSelectedMyClassActionType {
    return { type: CLEAR_MY_CLASS_PENDING_EDIT };
}

export function setModificationState(value: MyClassModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddMyClassActionType { type: string, myclass: IMyClass };
interface IEditMyClassActionType { type: string, myclass: IMyClass };
interface IRemoveMyClassActionType { type: string, id: number };
interface IChangeSelectedMyClassActionType { type: string, myclass: IMyClass };
interface IClearSelectedMyClassActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  MyClassModificationStatus};
interface IRemoveMyClassAllActionType { type: string }
interface IInitialMyClassActionType {type: string, myclass: IMyClass}
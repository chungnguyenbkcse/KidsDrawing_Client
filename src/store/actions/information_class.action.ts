import { IInformationClass, InformationClassModificationStatus } from "../models/information_class.interface";
export const ADD_INFORMATION_CLASS: string = "ADD_INFORMATION_CLASS";
export const EDIT_INFORMATION_CLASS: string = "EDIT_INFORMATION_CLASS";
export const REMOVE_INFORMATION_CLASS: string = "REMOVE_INFORMATION_CLASS";
export const CHANGE_INFORMATION_CLASS_AMOUNT: string = "CHANGE_INFORMATION_CLASS_AMOUNT";
export const CHANGE_INFORMATION_CLASS_PENDING_EDIT: string = "CHANGE_INFORMATION_CLASS_PENDING_EDIT";
export const CLEAR_INFORMATION_CLASS_PENDING_EDIT: string = "CLEAR_INFORMATION_CLASS_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_INFORMATION_CLASS_ALL: string = "REMOVE_INFORMATION_CLASS_ALL";
export const INITIAL_INFORMATION_CLASS: string = "INITIAL_INFORMATION_CLASS";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(information_class: IInformationClass) {
    return {
        type: FETCH_DATA_SUCCESS,
        information_class
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialInformationClass(information_class: IInformationClass): IInitialInformationClassActionType {
    return { type: INITIAL_INFORMATION_CLASS, information_class: information_class };
}

export function removeInformationClassAll(): IRemoveInformationClassAllActionType {
    return { type: REMOVE_INFORMATION_CLASS_ALL };
}

export function addInformationClass(information_class: IInformationClass): IAddInformationClassActionType {
    return { type: ADD_INFORMATION_CLASS, information_class: information_class };
}

export function editInformationClass(information_class: IInformationClass): IEditInformationClassActionType {
    return { type: EDIT_INFORMATION_CLASS, information_class: information_class };
}

export function removeInformationClass(id: any): IRemoveInformationClassActionType {
    return { type: REMOVE_INFORMATION_CLASS, id: id };
}

export function changeSelectedInformationClass(information_class: IInformationClass): IChangeSelectedInformationClassActionType {
    return { type: CHANGE_INFORMATION_CLASS_PENDING_EDIT, information_class: information_class };
}

export function clearSelectedInformationClass(): IClearSelectedInformationClassActionType {
    return { type: CLEAR_INFORMATION_CLASS_PENDING_EDIT };
}

export function setModificationState(value: InformationClassModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddInformationClassActionType { type: string, information_class: IInformationClass };
interface IEditInformationClassActionType { type: string, information_class: IInformationClass };
interface IRemoveInformationClassActionType { type: string, id: any };
interface IChangeSelectedInformationClassActionType { type: string, information_class: IInformationClass };
interface IClearSelectedInformationClassActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  InformationClassModificationStatus};
interface IRemoveInformationClassAllActionType { type: string }
interface IInitialInformationClassActionType {type: string, information_class: IInformationClass}
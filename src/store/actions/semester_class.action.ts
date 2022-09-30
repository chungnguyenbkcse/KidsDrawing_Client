import { ISemesterClass, SemesterClassModificationStatus } from "../models/semester_class.interface";
export const ADD_SEMESTER_CLASS: string = "ADD_SEMESTER_CLASS";
export const EDIT_SEMESTER_CLASS: string = "EDIT_SEMESTER_CLASS";
export const REMOVE_SEMESTER_CLASS: string = "REMOVE_SEMESTER_CLASS";
export const CHANGE_SEMESTER_CLASS_AMOUNT: string = "CHANGE_SEMESTER_CLASS_AMOUNT";
export const CHANGE_SEMESTER_CLASS_PENDING_EDIT: string = "CHANGE_SEMESTER_CLASS_PENDING_EDIT";
export const CLEAR_SEMESTER_CLASS_PENDING_EDIT: string = "CLEAR_SEMESTER_CLASS_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_SEMESTER_CLASS_ALL: string = "REMOVE_SEMESTER_CLASS_ALL";
export const INITIAL_SEMESTER_CLASS: string = "INITIAL_SEMESTER_CLASS";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(semester_class: ISemesterClass) {
    return {
        type: FETCH_DATA_SUCCESS,
        semester_class
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialSemesterClass(semester_class: ISemesterClass): IInitialSemesterClassActionType {
    return { type: INITIAL_SEMESTER_CLASS, semester_class: semester_class };
}

export function removeSemesterClassAll(): IRemoveSemesterClassAllActionType {
    return { type: REMOVE_SEMESTER_CLASS_ALL };
}

export function addSemesterClass(semester_class: ISemesterClass): IAddSemesterClassActionType {
    return { type: ADD_SEMESTER_CLASS, semester_class: semester_class };
}

export function editSemesterClass(semester_class: ISemesterClass): IEditSemesterClassActionType {
    return { type: EDIT_SEMESTER_CLASS, semester_class: semester_class };
}

export function removeSemesterClass(id: string): IRemoveSemesterClassActionType {
    return { type: REMOVE_SEMESTER_CLASS, id: id };
}

export function changeSelectedSemesterClass(semester_class: ISemesterClass): IChangeSelectedSemesterClassActionType {
    return { type: CHANGE_SEMESTER_CLASS_PENDING_EDIT, semester_class: semester_class };
}

export function clearSelectedSemesterClass(): IClearSelectedSemesterClassActionType {
    return { type: CLEAR_SEMESTER_CLASS_PENDING_EDIT };
}

export function setModificationStateSemesterClass(value: SemesterClassModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddSemesterClassActionType { type: string, semester_class: ISemesterClass };
interface IEditSemesterClassActionType { type: string, semester_class: ISemesterClass };
interface IRemoveSemesterClassActionType { type: string, id: string };
interface IChangeSelectedSemesterClassActionType { type: string, semester_class: ISemesterClass };
interface IClearSelectedSemesterClassActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  SemesterClassModificationStatus};
interface IRemoveSemesterClassAllActionType { type: string }
interface IInitialSemesterClassActionType {type: string, semester_class: ISemesterClass}
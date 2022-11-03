import { ISemesterClassParent, SemesterClassParentModificationStatus } from "../models/semester_class_parent.interface";

// register_successfull_semester_class_parents
export const ADD_NOT_PAYED_NOW: string = "ADD_NOT_PAYED_NOW";
export const EDIT_NOT_PAYED_NOW: string = "EDIT_NOT_PAYED_NOW";
export const REMOVE_NOT_PAYED_NOW: string = "REMOVE_NOT_PAYED_NOW";
export const CHANGE_NOT_PAYED_NOW_AMOUNT: string = "CHANGE_NOT_PAYED_NOW_AMOUNT";
export const CHANGE_NOT_PAYED_NOW_PENDING_EDIT: string = "CHANGE_NOT_PAYED_NOW_PENDING_EDIT";
export const CLEAR_NOT_PAYED_NOW_PENDING_EDIT: string = "CLEAR_NOT_PAYED_NOW_PENDING_EDIT";
export const REMOVE_NOT_PAYED_NOW_ALL: string = "REMOVE_NOT_PAYED_NOW_ALL";
export const INITIAL_NOT_PAYED_NOW: string = "INITIAL_NOT_PAYED_NOW";

// not_register_semester_class_parents
export const ADD_PAYED: string = "ADD_PAYED";
export const EDIT_PAYED: string = "EDIT_PAYED";
export const REMOVE_PAYED: string = "REMOVE_PAYED";
export const CHANGE_PAYED_AMOUNT: string = "CHANGE_PAYED_AMOUNT";
export const CHANGE_PAYED_PENDING_EDIT: string = "CHANGE_PAYED_PENDING_EDIT";
export const CLEAR_PAYED_PENDING_EDIT: string = "CLEAR_PAYED_PENDING_EDIT";
export const REMOVE_PAYED_ALL: string = "REMOVE_PAYED_ALL";
export const INITIAL_PAYED: string = "INITIAL_PAYED";


// not_register_semester_class_parents
export const ADD_NOT_PAYED: string = "ADD_NOT_PAYED";
export const EDIT_NOT_PAYED: string = "EDIT_NOT_PAYED";
export const REMOVE_NOT_PAYED: string = "REMOVE_NOT_PAYED";
export const CHANGE_NOT_PAYED_AMOUNT: string = "CHANGE_NOT_PAYED_AMOUNT";
export const CHANGE_NOT_PAYED_PENDING_EDIT: string = "CHANGE_NOT_PAYED_PENDING_EDIT";
export const CLEAR_NOT_PAYED_PENDING_EDIT: string = "CLEAR_NOT_PAYED_PENDING_EDIT";
export const REMOVE_NOT_PAYED_ALL: string = "REMOVE_NOT_PAYED_ALL";
export const INITIAL_NOT_PAYED: string = "INITIAL_NOT_PAYED";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(semester_class_parent: ISemesterClassParent) {
    return {
        type: FETCH_DATA_SUCCESS,
        semester_class_parent
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialSemesterClassParentNotPayedNow(semester_class_parent: ISemesterClassParent): IInitialSemesterClassParentNotPayedNowActionType {
    return { type: INITIAL_NOT_PAYED_NOW, semester_class_parent: semester_class_parent };
}

export function removeSemesterClassParentNotPayedNowAll(): IRemoveSemesterClassParentNotPayedNowAllActionType {
    return { type: REMOVE_NOT_PAYED_NOW_ALL };
}

export function addSemesterClassParentNotPayedNow(semester_class_parent: ISemesterClassParent): IAddSemesterClassParentNotPayedNowActionType {
    return { type: ADD_NOT_PAYED_NOW, semester_class_parent: semester_class_parent };
}

export function editSemesterClassParentNotPayedNow(semester_class_parent: ISemesterClassParent): IEditSemesterClassParentNotPayedNowActionType {
    return { type: EDIT_NOT_PAYED_NOW, semester_class_parent: semester_class_parent };
}

export function removeSemesterClassParentNotPayedNow(id: any): IRemoveSemesterClassParentNotPayedNowActionType {
    return { type: REMOVE_NOT_PAYED_NOW, id: id };
}

export function changeSelectedSemesterClassParentNotPayedNow(semester_class_parent: ISemesterClassParent): IChangeSelectedSemesterClassParentNotPayedNowActionType {
    return { type: CHANGE_NOT_PAYED_NOW_PENDING_EDIT, semester_class_parent: semester_class_parent };
}

export function clearSelectedSemesterClassParentNotPayedNow(): IClearSelectedSemesterClassParentNotPayedNowActionType {
    return { type: CLEAR_NOT_PAYED_NOW_PENDING_EDIT };
}


export function initialSemesterClassParentPayed(semester_class_parent: ISemesterClassParent): IInitialSemesterClassParentPayedActionType {
    return { type: INITIAL_PAYED, semester_class_parent: semester_class_parent };
}

export function removeSemesterClassParentPayedAll(): IRemoveSemesterClassParentPayedAllActionType {
    return { type: REMOVE_PAYED_ALL };
}

export function addSemesterClassParentPayed(semester_class_parent: ISemesterClassParent): IAddSemesterClassParentPayedActionType {
    return { type: ADD_PAYED, semester_class_parent: semester_class_parent };
}

export function editSemesterClassParentPayed(semester_class_parent: ISemesterClassParent): IEditSemesterClassParentPayedActionType {
    return { type: EDIT_PAYED, semester_class_parent: semester_class_parent };
}

export function removeSemesterClassParentPayed(id: any): IRemoveSemesterClassParentPayedActionType {
    return { type: REMOVE_PAYED, id: id };
}

export function changeSelectedSemesterClassParentPayed(semester_class_parent: ISemesterClassParent): IChangeSelectedSemesterClassParentPayedActionType {
    return { type: CHANGE_PAYED_PENDING_EDIT, semester_class_parent: semester_class_parent };
}

export function clearSelectedSemesterClassParentPayed(): IClearSelectedSemesterClassParentPayedActionType {
    return { type: CLEAR_PAYED_PENDING_EDIT };
}

export function setModificationState(value: SemesterClassParentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}



export function initialSemesterClassParentNotPayed(semester_class_parent: ISemesterClassParent): IInitialSemesterClassParentNotPayedActionType {
    return { type: INITIAL_NOT_PAYED, semester_class_parent: semester_class_parent };
}

export function removeSemesterClassParentNotPayedAll(): IRemoveSemesterClassParentNotPayedAllActionType {
    return { type: REMOVE_NOT_PAYED_ALL };
}

export function addSemesterClassParentNotPayed(semester_class_parent: ISemesterClassParent): IAddSemesterClassParentNotPayedActionType {
    return { type: ADD_NOT_PAYED, semester_class_parent: semester_class_parent };
}

export function editSemesterClassParentNotPayed(semester_class_parent: ISemesterClassParent): IEditSemesterClassParentNotPayedActionType {
    return { type: EDIT_NOT_PAYED, semester_class_parent: semester_class_parent };
}

export function removeSemesterClassParentNotPayed(id: any): IRemoveSemesterClassParentNotPayedActionType {
    return { type: REMOVE_NOT_PAYED, id: id };
}

export function changeSelectedSemesterClassParentNotPayed(semester_class_parent: ISemesterClassParent): IChangeSelectedSemesterClassParentNotPayedActionType {
    return { type: CHANGE_NOT_PAYED_AMOUNT, semester_class_parent: semester_class_parent };
}

export function clearSelectedSemesterClassParentNotPayed(): IClearSelectedSemesterClassParentNotPayedActionType {
    return { type: CHANGE_NOT_PAYED_PENDING_EDIT };
}

// register_successfull_semester_class_parents
interface IAddSemesterClassParentNotPayedNowActionType { type: string, semester_class_parent: ISemesterClassParent };
interface IEditSemesterClassParentNotPayedNowActionType { type: string, semester_class_parent: ISemesterClassParent };
interface IRemoveSemesterClassParentNotPayedNowActionType { type: string, id: any };
interface IChangeSelectedSemesterClassParentNotPayedNowActionType { type: string, semester_class_parent: ISemesterClassParent };
interface IClearSelectedSemesterClassParentNotPayedNowActionType { type: string };
interface IRemoveSemesterClassParentNotPayedNowAllActionType { type: string }
interface IInitialSemesterClassParentNotPayedNowActionType {type: string, semester_class_parent: ISemesterClassParent}

// not_register_semester_class_parents
interface IAddSemesterClassParentPayedActionType { type: string, semester_class_parent: ISemesterClassParent };
interface IEditSemesterClassParentPayedActionType { type: string, semester_class_parent: ISemesterClassParent };
interface IRemoveSemesterClassParentPayedActionType { type: string, id: any };
interface IChangeSelectedSemesterClassParentPayedActionType { type: string, semester_class_parent: ISemesterClassParent };
interface IClearSelectedSemesterClassParentPayedActionType { type: string };
interface IRemoveSemesterClassParentPayedAllActionType { type: string }
interface IInitialSemesterClassParentPayedActionType {type: string, semester_class_parent: ISemesterClassParent}


// register_successfull_semester_class_parents
interface IAddSemesterClassParentNotPayedActionType { type: string, semester_class_parent: ISemesterClassParent };
interface IEditSemesterClassParentNotPayedActionType { type: string, semester_class_parent: ISemesterClassParent };
interface IRemoveSemesterClassParentNotPayedActionType { type: string, id: any };
interface IChangeSelectedSemesterClassParentNotPayedActionType { type: string, semester_class_parent: ISemesterClassParent };
interface IClearSelectedSemesterClassParentNotPayedActionType { type: string };
interface IRemoveSemesterClassParentNotPayedAllActionType { type: string }
interface IInitialSemesterClassParentNotPayedActionType {type: string, semester_class_parent: ISemesterClassParent}




interface ISetModificationStateActionType { type: string, value:  SemesterClassParentModificationStatus};
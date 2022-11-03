import { ISemesterClassStudent, SemesterClassStudentModificationStatus } from "../models/semester_class_student.interface";

// register_successfull_semester_class_students
export const ADD_NOT_PAYED_NOW: string = "ADD_NOT_PAYED_NOW";
export const EDIT_NOT_PAYED_NOW: string = "EDIT_NOT_PAYED_NOW";
export const REMOVE_NOT_PAYED_NOW: string = "REMOVE_NOT_PAYED_NOW";
export const CHANGE_NOT_PAYED_NOW_AMOUNT: string = "CHANGE_NOT_PAYED_NOW_AMOUNT";
export const CHANGE_NOT_PAYED_NOW_PENDING_EDIT: string = "CHANGE_NOT_PAYED_NOW_PENDING_EDIT";
export const CLEAR_NOT_PAYED_NOW_PENDING_EDIT: string = "CLEAR_NOT_PAYED_NOW_PENDING_EDIT";
export const REMOVE_NOT_PAYED_NOW_ALL: string = "REMOVE_NOT_PAYED_NOW_ALL";
export const INITIAL_NOT_PAYED_NOW: string = "INITIAL_NOT_PAYED_NOW";

// not_register_semester_class_students
export const ADD_PAYED: string = "ADD_PAYED";
export const EDIT_PAYED: string = "EDIT_PAYED";
export const REMOVE_PAYED: string = "REMOVE_PAYED";
export const CHANGE_PAYED_AMOUNT: string = "CHANGE_PAYED_AMOUNT";
export const CHANGE_PAYED_PENDING_EDIT: string = "CHANGE_PAYED_PENDING_EDIT";
export const CLEAR_PAYED_PENDING_EDIT: string = "CLEAR_PAYED_PENDING_EDIT";
export const REMOVE_PAYED_ALL: string = "REMOVE_PAYED_ALL";
export const INITIAL_PAYED: string = "INITIAL_PAYED";


// not_register_semester_class_students
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

export function fetchDataSuccess(semester_class_student: ISemesterClassStudent) {
    return {
        type: FETCH_DATA_SUCCESS,
        semester_class_student
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialSemesterClassStudentNotPayedNow(semester_class_student: ISemesterClassStudent): IInitialSemesterClassStudentNotPayedNowActionType {
    return { type: INITIAL_NOT_PAYED_NOW, semester_class_student: semester_class_student };
}

export function removeSemesterClassStudentNotPayedNowAll(): IRemoveSemesterClassStudentNotPayedNowAllActionType {
    return { type: REMOVE_NOT_PAYED_NOW_ALL };
}

export function addSemesterClassStudentNotPayedNow(semester_class_student: ISemesterClassStudent): IAddSemesterClassStudentNotPayedNowActionType {
    return { type: ADD_NOT_PAYED_NOW, semester_class_student: semester_class_student };
}

export function editSemesterClassStudentNotPayedNow(semester_class_student: ISemesterClassStudent): IEditSemesterClassStudentNotPayedNowActionType {
    return { type: EDIT_NOT_PAYED_NOW, semester_class_student: semester_class_student };
}

export function removeSemesterClassStudentNotPayedNow(id: any): IRemoveSemesterClassStudentNotPayedNowActionType {
    return { type: REMOVE_NOT_PAYED_NOW, id: id };
}

export function changeSelectedSemesterClassStudentNotPayedNow(semester_class_student: ISemesterClassStudent): IChangeSelectedSemesterClassStudentNotPayedNowActionType {
    return { type: CHANGE_NOT_PAYED_NOW_PENDING_EDIT, semester_class_student: semester_class_student };
}

export function clearSelectedSemesterClassStudentNotPayedNow(): IClearSelectedSemesterClassStudentNotPayedNowActionType {
    return { type: CLEAR_NOT_PAYED_NOW_PENDING_EDIT };
}


export function initialSemesterClassStudentPayed(semester_class_student: ISemesterClassStudent): IInitialSemesterClassStudentPayedActionType {
    return { type: INITIAL_PAYED, semester_class_student: semester_class_student };
}

export function removeSemesterClassStudentPayedAll(): IRemoveSemesterClassStudentPayedAllActionType {
    return { type: REMOVE_PAYED_ALL };
}

export function addSemesterClassStudentPayed(semester_class_student: ISemesterClassStudent): IAddSemesterClassStudentPayedActionType {
    return { type: ADD_PAYED, semester_class_student: semester_class_student };
}

export function editSemesterClassStudentPayed(semester_class_student: ISemesterClassStudent): IEditSemesterClassStudentPayedActionType {
    return { type: EDIT_PAYED, semester_class_student: semester_class_student };
}

export function removeSemesterClassStudentPayed(id: any): IRemoveSemesterClassStudentPayedActionType {
    return { type: REMOVE_PAYED, id: id };
}

export function changeSelectedSemesterClassStudentPayed(semester_class_student: ISemesterClassStudent): IChangeSelectedSemesterClassStudentPayedActionType {
    return { type: CHANGE_PAYED_PENDING_EDIT, semester_class_student: semester_class_student };
}

export function clearSelectedSemesterClassStudentPayed(): IClearSelectedSemesterClassStudentPayedActionType {
    return { type: CLEAR_PAYED_PENDING_EDIT };
}

export function setModificationState(value: SemesterClassStudentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}



export function initialSemesterClassStudentNotPayed(semester_class_student: ISemesterClassStudent): IInitialSemesterClassStudentNotPayedActionType {
    return { type: INITIAL_NOT_PAYED, semester_class_student: semester_class_student };
}

export function removeSemesterClassStudentNotPayedAll(): IRemoveSemesterClassStudentNotPayedAllActionType {
    return { type: REMOVE_NOT_PAYED_ALL };
}

export function addSemesterClassStudentNotPayed(semester_class_student: ISemesterClassStudent): IAddSemesterClassStudentNotPayedActionType {
    return { type: ADD_NOT_PAYED, semester_class_student: semester_class_student };
}

export function editSemesterClassStudentNotPayed(semester_class_student: ISemesterClassStudent): IEditSemesterClassStudentNotPayedActionType {
    return { type: EDIT_NOT_PAYED, semester_class_student: semester_class_student };
}

export function removeSemesterClassStudentNotPayed(id: any): IRemoveSemesterClassStudentNotPayedActionType {
    return { type: REMOVE_NOT_PAYED, id: id };
}

export function changeSelectedSemesterClassStudentNotPayed(semester_class_student: ISemesterClassStudent): IChangeSelectedSemesterClassStudentNotPayedActionType {
    return { type: CHANGE_NOT_PAYED_AMOUNT, semester_class_student: semester_class_student };
}

export function clearSelectedSemesterClassStudentNotPayed(): IClearSelectedSemesterClassStudentNotPayedActionType {
    return { type: CHANGE_NOT_PAYED_PENDING_EDIT };
}

// register_successfull_semester_class_students
interface IAddSemesterClassStudentNotPayedNowActionType { type: string, semester_class_student: ISemesterClassStudent };
interface IEditSemesterClassStudentNotPayedNowActionType { type: string, semester_class_student: ISemesterClassStudent };
interface IRemoveSemesterClassStudentNotPayedNowActionType { type: string, id: any };
interface IChangeSelectedSemesterClassStudentNotPayedNowActionType { type: string, semester_class_student: ISemesterClassStudent };
interface IClearSelectedSemesterClassStudentNotPayedNowActionType { type: string };
interface IRemoveSemesterClassStudentNotPayedNowAllActionType { type: string }
interface IInitialSemesterClassStudentNotPayedNowActionType {type: string, semester_class_student: ISemesterClassStudent}

// not_register_semester_class_students
interface IAddSemesterClassStudentPayedActionType { type: string, semester_class_student: ISemesterClassStudent };
interface IEditSemesterClassStudentPayedActionType { type: string, semester_class_student: ISemesterClassStudent };
interface IRemoveSemesterClassStudentPayedActionType { type: string, id: any };
interface IChangeSelectedSemesterClassStudentPayedActionType { type: string, semester_class_student: ISemesterClassStudent };
interface IClearSelectedSemesterClassStudentPayedActionType { type: string };
interface IRemoveSemesterClassStudentPayedAllActionType { type: string }
interface IInitialSemesterClassStudentPayedActionType {type: string, semester_class_student: ISemesterClassStudent}


// register_successfull_semester_class_students
interface IAddSemesterClassStudentNotPayedActionType { type: string, semester_class_student: ISemesterClassStudent };
interface IEditSemesterClassStudentNotPayedActionType { type: string, semester_class_student: ISemesterClassStudent };
interface IRemoveSemesterClassStudentNotPayedActionType { type: string, id: any };
interface IChangeSelectedSemesterClassStudentNotPayedActionType { type: string, semester_class_student: ISemesterClassStudent };
interface IClearSelectedSemesterClassStudentNotPayedActionType { type: string };
interface IRemoveSemesterClassStudentNotPayedAllActionType { type: string }
interface IInitialSemesterClassStudentNotPayedActionType {type: string, semester_class_student: ISemesterClassStudent}




interface ISetModificationStateActionType { type: string, value:  SemesterClassStudentModificationStatus};
import { IClassesStudent, ClassesStudentModificationStatus } from "../models/classes_student.interface";
export const ADD_CLASSES_STUDENT: string = "ADD_CLASSES_STUDENT";
export const EDIT_CLASSES_STUDENT: string = "EDIT_CLASSES_STUDENT";
export const REMOVE_CLASSES_STUDENT: string = "REMOVE_CLASSES_STUDENT";
export const CHANGE_CLASSES_STUDENT_AMOUNT: string = "CHANGE_CLASSES_STUDENT_AMOUNT";
export const CHANGE_CLASSES_STUDENT_PENDING_EDIT: string = "CHANGE_CLASSES_STUDENT_PENDING_EDIT";
export const CLEAR_CLASSES_STUDENT_PENDING_EDIT: string = "CLEAR_CLASSES_STUDENT_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_CLASSES_STUDENT_ALL: string = "REMOVE_CLASSES_STUDENT_ALL";
export const INITIAL_CLASSES_STUDENT: string = "INITIAL_CLASSES_STUDENT";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(classes_student: IClassesStudent) {
    return {
        type: FETCH_DATA_SUCCESS,
        classes_student
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialClassesStudent(classes_student: IClassesStudent): IInitialClassesStudentActionType {
    return { type: INITIAL_CLASSES_STUDENT, classes_student: classes_student };
}

export function removeClassesStudentAll(): IRemoveClassesStudentAllActionType {
    return { type: REMOVE_CLASSES_STUDENT_ALL };
}

export function addClassesStudent(classes_student: IClassesStudent): IAddClassesStudentActionType {
    return { type: ADD_CLASSES_STUDENT, classes_student: classes_student };
}

export function editClassesStudent(classes_student: IClassesStudent): IEditClassesStudentActionType {
    return { type: EDIT_CLASSES_STUDENT, classes_student: classes_student };
}

export function removeClassesStudent(id: number): IRemoveClassesStudentActionType {
    return { type: REMOVE_CLASSES_STUDENT, id: id };
}

export function changeSelectedClassesStudent(classes_student: IClassesStudent): IChangeSelectedClassesStudentActionType {
    return { type: CHANGE_CLASSES_STUDENT_PENDING_EDIT, classes_student: classes_student };
}

export function clearSelectedClassesStudent(): IClearSelectedClassesStudentActionType {
    return { type: CLEAR_CLASSES_STUDENT_PENDING_EDIT };
}

export function setModificationState(value: ClassesStudentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddClassesStudentActionType { type: string, classes_student: IClassesStudent };
interface IEditClassesStudentActionType { type: string, classes_student: IClassesStudent };
interface IRemoveClassesStudentActionType { type: string, id: number };
interface IChangeSelectedClassesStudentActionType { type: string, classes_student: IClassesStudent };
interface IClearSelectedClassesStudentActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ClassesStudentModificationStatus};
interface IRemoveClassesStudentAllActionType { type: string }
interface IInitialClassesStudentActionType {type: string, classes_student: IClassesStudent}
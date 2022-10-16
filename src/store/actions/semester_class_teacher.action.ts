import { ISemesterClassTeacher, SemesterClassTeacherModificationStatus } from "../models/semester_class_teacher.interface";
export const ADD_SEMESTER_CLASS_TEACHER: string = "ADD_SEMESTER_CLASS_TEACHER";
export const EDIT_SEMESTER_CLASS_TEACHER: string = "EDIT_SEMESTER_CLASS_TEACHER";
export const REMOVE_SEMESTER_CLASS_TEACHER: string = "REMOVE_SEMESTER_CLASS_TEACHER";
export const CHANGE_SEMESTER_CLASS_TEACHER_AMOUNT: string = "CHANGE_SEMESTER_CLASS_TEACHER_AMOUNT";
export const CHANGE_SEMESTER_CLASS_TEACHER_PENDING_EDIT: string = "CHANGE_SEMESTER_CLASS_TEACHER_PENDING_EDIT";
export const CLEAR_SEMESTER_CLASS_TEACHER_PENDING_EDIT: string = "CLEAR_SEMESTER_CLASS_TEACHER_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_SEMESTER_CLASS_TEACHER_ALL: string = "REMOVE_SEMESTER_CLASS_TEACHER_ALL";
export const INITIAL_SEMESTER_CLASS_TEACHER: string = "INITIAL_SEMESTER_CLASS_TEACHER";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(semester_class_teacher: ISemesterClassTeacher) {
    return {
        type: FETCH_DATA_SUCCESS,
        semester_class_teacher
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialSemesterClassTeacher(semester_class_teacher: ISemesterClassTeacher): IInitialSemesterClassTeacherActionType {
    return { type: INITIAL_SEMESTER_CLASS_TEACHER, semester_class_teacher: semester_class_teacher };
}

export function removeSemesterClassTeacherAll(): IRemoveSemesterClassTeacherAllActionType {
    return { type: REMOVE_SEMESTER_CLASS_TEACHER_ALL };
}

export function addSemesterClassTeacher(semester_class_teacher: ISemesterClassTeacher): IAddSemesterClassTeacherActionType {
    return { type: ADD_SEMESTER_CLASS_TEACHER, semester_class_teacher: semester_class_teacher };
}

export function editSemesterClassTeacher(semester_class_teacher: ISemesterClassTeacher): IEditSemesterClassTeacherActionType {
    return { type: EDIT_SEMESTER_CLASS_TEACHER, semester_class_teacher: semester_class_teacher };
}

export function removeSemesterClassTeacher(id: string): IRemoveSemesterClassTeacherActionType {
    return { type: REMOVE_SEMESTER_CLASS_TEACHER, id: id };
}

export function changeSelectedSemesterClassTeacher(semester_class_teacher: ISemesterClassTeacher): IChangeSelectedSemesterClassTeacherActionType {
    return { type: CHANGE_SEMESTER_CLASS_TEACHER_PENDING_EDIT, semester_class_teacher: semester_class_teacher };
}

export function clearSelectedSemesterClassTeacher(): IClearSelectedSemesterClassTeacherActionType {
    return { type: CLEAR_SEMESTER_CLASS_TEACHER_PENDING_EDIT };
}

export function setModificationStateSemesterClassTeacher(value: SemesterClassTeacherModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddSemesterClassTeacherActionType { type: string, semester_class_teacher: ISemesterClassTeacher };
interface IEditSemesterClassTeacherActionType { type: string, semester_class_teacher: ISemesterClassTeacher };
interface IRemoveSemesterClassTeacherActionType { type: string, id: string };
interface IChangeSelectedSemesterClassTeacherActionType { type: string, semester_class_teacher: ISemesterClassTeacher };
interface IClearSelectedSemesterClassTeacherActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  SemesterClassTeacherModificationStatus};
interface IRemoveSemesterClassTeacherAllActionType { type: string }
interface IInitialSemesterClassTeacherActionType {type: string, semester_class_teacher: ISemesterClassTeacher}
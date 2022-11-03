import { IClassHasRegisterJoinSemester, ClassHasRegisterJoinSemesterModificationStatus } from "../models/class_has_register_join_semester.interface";
export const ADD_CLASS_HAS_REGISTER_JOIN_SEMESTER: string = "ADD_CLASS_HAS_REGISTER_JOIN_SEMESTER";
export const EDIT_CLASS_HAS_REGISTER_JOIN_SEMESTER: string = "EDIT_CLASS_HAS_REGISTER_JOIN_SEMESTER";
export const REMOVE_CLASS_HAS_REGISTER_JOIN_SEMESTER: string = "REMOVE_CLASS_HAS_REGISTER_JOIN_SEMESTER";
export const CHANGE_CLASS_HAS_REGISTER_JOIN_SEMESTER_AMOUNT: string = "CHANGE_CLASS_HAS_REGISTER_JOIN_SEMESTER_AMOUNT";
export const CHANGE_CLASS_HAS_REGISTER_JOIN_SEMESTER_PENDING_EDIT: string = "CHANGE_CLASS_HAS_REGISTER_JOIN_SEMESTER_PENDING_EDIT";
export const CLEAR_CLASS_HAS_REGISTER_JOIN_SEMESTER_PENDING_EDIT: string = "CLEAR_CLASS_HAS_REGISTER_JOIN_SEMESTER_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_CLASS_HAS_REGISTER_JOIN_SEMESTER_ALL: string = "REMOVE_CLASS_HAS_REGISTER_JOIN_SEMESTER_ALL";
export const INITIAL_CLASS_HAS_REGISTER_JOIN_SEMESTER: string = "INITIAL_CLASS_HAS_REGISTER_JOIN_SEMESTER";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(class_has_register_join_semester: IClassHasRegisterJoinSemester) {
    return {
        type: FETCH_DATA_SUCCESS,
        class_has_register_join_semester
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialClassHasRegisterJoinSemester(class_has_register_join_semester: IClassHasRegisterJoinSemester): IInitialClassHasRegisterJoinSemesterActionType {
    return { type: INITIAL_CLASS_HAS_REGISTER_JOIN_SEMESTER, class_has_register_join_semester: class_has_register_join_semester };
}

export function removeClassHasRegisterJoinSemesterAll(): IRemoveClassHasRegisterJoinSemesterAllActionType {
    return { type: REMOVE_CLASS_HAS_REGISTER_JOIN_SEMESTER_ALL };
}

export function addClassHasRegisterJoinSemester(class_has_register_join_semester: IClassHasRegisterJoinSemester): IAddClassHasRegisterJoinSemesterActionType {
    return { type: ADD_CLASS_HAS_REGISTER_JOIN_SEMESTER, class_has_register_join_semester: class_has_register_join_semester };
}

export function editClassHasRegisterJoinSemester(class_has_register_join_semester: IClassHasRegisterJoinSemester): IEditClassHasRegisterJoinSemesterActionType {
    return { type: EDIT_CLASS_HAS_REGISTER_JOIN_SEMESTER, class_has_register_join_semester: class_has_register_join_semester };
}

export function removeClassHasRegisterJoinSemester(id: any): IRemoveClassHasRegisterJoinSemesterActionType {
    return { type: REMOVE_CLASS_HAS_REGISTER_JOIN_SEMESTER, id: id };
}

export function changeSelectedClassHasRegisterJoinSemester(class_has_register_join_semester: IClassHasRegisterJoinSemester): IChangeSelectedClassHasRegisterJoinSemesterActionType {
    return { type: CHANGE_CLASS_HAS_REGISTER_JOIN_SEMESTER_PENDING_EDIT, class_has_register_join_semester: class_has_register_join_semester };
}

export function clearSelectedClassHasRegisterJoinSemester(): IClearSelectedClassHasRegisterJoinSemesterActionType {
    return { type: CLEAR_CLASS_HAS_REGISTER_JOIN_SEMESTER_PENDING_EDIT };
}

export function setModificationState(value: ClassHasRegisterJoinSemesterModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddClassHasRegisterJoinSemesterActionType { type: string, class_has_register_join_semester: IClassHasRegisterJoinSemester };
interface IEditClassHasRegisterJoinSemesterActionType { type: string, class_has_register_join_semester: IClassHasRegisterJoinSemester };
interface IRemoveClassHasRegisterJoinSemesterActionType { type: string, id: any };
interface IChangeSelectedClassHasRegisterJoinSemesterActionType { type: string, class_has_register_join_semester: IClassHasRegisterJoinSemester };
interface IClearSelectedClassHasRegisterJoinSemesterActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ClassHasRegisterJoinSemesterModificationStatus};
interface IRemoveClassHasRegisterJoinSemesterAllActionType { type: string }
interface IInitialClassHasRegisterJoinSemesterActionType {type: string, class_has_register_join_semester: IClassHasRegisterJoinSemester}
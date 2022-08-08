import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../models/teacher_register_quantification.interface";
export const ADD_TEACHER_REGISTER_QUANTIFICATION: string = "ADD_TEACHER_REGISTER_QUANTIFICATION";
export const EDIT_TEACHER_REGISTER_QUANTIFICATION: string = "EDIT_TEACHER_REGISTER_QUANTIFICATION";
export const REMOVE_TEACHER_REGISTER_QUANTIFICATION: string = "REMOVE_TEACHER_REGISTER_QUANTIFICATION";
export const CHANGE_TEACHER_REGISTER_QUANTIFICATION_AMOUNT: string = "CHANGE_TEACHER_REGISTER_QUANTIFICATION_AMOUNT";
export const CHANGE_TEACHER_REGISTER_QUANTIFICATION_PENDING_EDIT: string = "CHANGE_TEACHER_REGISTER_QUANTIFICATION_PENDING_EDIT";
export const CLEAR_TEACHER_REGISTER_QUANTIFICATION_PENDING_EDIT: string = "CLEAR_TEACHER_REGISTER_QUANTIFICATION_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_TEACHER_REGISTER_QUANTIFICATION_ALL: string = "REMOVE_TEACHER_REGISTER_QUANTIFICATION_ALL";
export const INITIAL_TEACHER_REGISTER_QUANTIFICATION: string = "INITIAL_TEACHER_REGISTER_QUANTIFICATION";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(teacher_register_quantification: ITeacherRegisterQuantification) {
    return {
        type: FETCH_DATA_SUCCESS,
        teacher_register_quantification
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialTeacherRegisterQuatification(teacher_register_quantification: ITeacherRegisterQuantification): IInitialTeacherRegisterQuatificationActionType {
    return { type: INITIAL_TEACHER_REGISTER_QUANTIFICATION, teacher_register_quantification: teacher_register_quantification };
}

export function removeTeacherRegisterQuatificationAll(): IRemoveTeacherRegisterQuatificationAllActionType {
    return { type: REMOVE_TEACHER_REGISTER_QUANTIFICATION_ALL };
}

export function addTeacherRegisterQuatification(teacher_register_quantification: ITeacherRegisterQuantification): IAddTeacherRegisterQuatificationActionType {
    return { type: ADD_TEACHER_REGISTER_QUANTIFICATION, teacher_register_quantification: teacher_register_quantification };
}

export function editTeacherRegisterQuatification(teacher_register_quantification: ITeacherRegisterQuantification): IEditTeacherRegisterQuatificationActionType {
    return { type: EDIT_TEACHER_REGISTER_QUANTIFICATION, teacher_register_quantification: teacher_register_quantification };
}

export function removeTeacherRegisterQuatification(id: number): IRemoveTeacherRegisterQuatificationActionType {
    return { type: REMOVE_TEACHER_REGISTER_QUANTIFICATION, id: id };
}

export function changeSelectedTeacherRegisterQuatification(teacher_register_quantification: ITeacherRegisterQuantification): IChangeSelectedTeacherRegisterQuatificationActionType {
    return { type: CHANGE_TEACHER_REGISTER_QUANTIFICATION_PENDING_EDIT, teacher_register_quantification: teacher_register_quantification };
}

export function clearSelectedTeacherRegisterQuatification(): IClearSelectedTeacherRegisterQuatificationActionType {
    return { type: CLEAR_TEACHER_REGISTER_QUANTIFICATION_PENDING_EDIT };
}

export function setModificationState(value: TeacherRegisterQuantificationModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddTeacherRegisterQuatificationActionType { type: string, teacher_register_quantification: ITeacherRegisterQuantification };
interface IEditTeacherRegisterQuatificationActionType { type: string, teacher_register_quantification: ITeacherRegisterQuantification };
interface IRemoveTeacherRegisterQuatificationActionType { type: string, id: number };
interface IChangeSelectedTeacherRegisterQuatificationActionType { type: string, teacher_register_quantification: ITeacherRegisterQuantification };
interface IClearSelectedTeacherRegisterQuatificationActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  TeacherRegisterQuantificationModificationStatus};
interface IRemoveTeacherRegisterQuatificationAllActionType { type: string }
interface IInitialTeacherRegisterQuatificationActionType {type: string, teacher_register_quantification: ITeacherRegisterQuantification}
import { ITeacher, TeacherModificationStatus } from "../models/teacher.interface";
export const ADD_TEACHER: string = "ADD_TEACHER";
export const EDIT_TEACHER: string = "EDIT_TEACHER";
export const REMOVE_TEACHER: string = "REMOVE_TEACHER";
export const CHANGE_TEACHER_AMOUNT: string = "CHANGE_TEACHER_AMOUNT";
export const CHANGE_TEACHER_PENDING_EDIT: string = "CHANGE_TEACHER_PENDING_EDIT";
export const CLEAR_TEACHER_PENDING_EDIT: string = "CLEAR_TEACHER_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addTeacher(teacher: ITeacher): IAddTeacherActionType {
    return { type: ADD_TEACHER, teacher: teacher };
}

export function editTeacher(teacher: ITeacher): IEditTeacherActionType {
    return { type: EDIT_TEACHER, teacher: teacher };
}

export function removeTeacher(id: number): IRemoveTeacherActionType {
    return { type: REMOVE_TEACHER, id: id };
}

export function changeTeacherAmount(id: number, amount: number): IChangeTeacherAmountType {
    return { type: CHANGE_TEACHER_AMOUNT, id: id, amount: amount };
}

export function changeSelectedTeacher(teacher: ITeacher): IChangeSelectedTeacherActionType {
    return { type: CHANGE_TEACHER_PENDING_EDIT, teacher: teacher };
}

export function clearSelectedTeacher(): IClearSelectedTeacherActionType {
    return { type: CLEAR_TEACHER_PENDING_EDIT };
}

export function setModificationState(value: TeacherModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddTeacherActionType { type: string, teacher: ITeacher };
interface IEditTeacherActionType { type: string, teacher: ITeacher };
interface IRemoveTeacherActionType { type: string, id: number };
interface IChangeSelectedTeacherActionType { type: string, teacher: ITeacher };
interface IClearSelectedTeacherActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  TeacherModificationStatus};
interface IChangeTeacherAmountType {type: string, id: number, amount: number};
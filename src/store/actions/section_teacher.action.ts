import { ISectionTeacher, SectionTeacherModificationStatus } from "../models/section_teacher.interface";
export const ADD_SECTION_TEACHER: string = "ADD_SECTION_TEACHER";
export const EDIT_SECTION_TEACHER: string = "EDIT_SECTION_TEACHER";
export const REMOVE_SECTION_TEACHER: string = "REMOVE_SECTION_TEACHER";
export const CHANGE_SECTION_TEACHER_AMOUNT: string = "CHANGE_SECTION_TEACHER_AMOUNT";
export const CHANGE_SECTION_TEACHER_PENDING_EDIT: string = "CHANGE_SECTION_TEACHER_PENDING_EDIT";
export const CLEAR_SECTION_TEACHER_PENDING_EDIT: string = "CLEAR_SECTION_TEACHER_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_SECTION_TEACHER_ALL: string = "REMOVE_SECTION_TEACHER_ALL";
export const INITIAL_SECTION_TEACHER: string = "INITIAL_SECTION_TEACHER";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(section_teacher: ISectionTeacher) {
    return {
        type: FETCH_DATA_SUCCESS,
        section_teacher
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialSectionTeacher(section_teacher: ISectionTeacher): IInitialSectionTeacherActionType {
    return { type: INITIAL_SECTION_TEACHER, section_teacher: section_teacher };
}

export function removeSectionTeacherAll(): IRemoveSectionTeacherAllActionType {
    return { type: REMOVE_SECTION_TEACHER_ALL };
}

export function addSectionTeacher(section_teacher: ISectionTeacher): IAddSectionTeacherActionType {
    return { type: ADD_SECTION_TEACHER, section_teacher: section_teacher };
}

export function editSectionTeacher(section_teacher: ISectionTeacher): IEditSectionTeacherActionType {
    return { type: EDIT_SECTION_TEACHER, section_teacher: section_teacher };
}

export function removeSectionTeacher(id: any): IRemoveSectionTeacherActionType {
    return { type: REMOVE_SECTION_TEACHER, id: id };
}

export function changeSelectedSectionTeacher(section_teacher: ISectionTeacher): IChangeSelectedSectionTeacherActionType {
    return { type: CHANGE_SECTION_TEACHER_PENDING_EDIT, section_teacher: section_teacher };
}

export function clearSelectedSectionTeacher(): IClearSelectedSectionTeacherActionType {
    return { type: CLEAR_SECTION_TEACHER_PENDING_EDIT };
}

export function setModificationStateSectionTeacher(value: SectionTeacherModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddSectionTeacherActionType { type: string, section_teacher: ISectionTeacher };
interface IEditSectionTeacherActionType { type: string, section_teacher: ISectionTeacher };
interface IRemoveSectionTeacherActionType { type: string, id: any };
interface IChangeSelectedSectionTeacherActionType { type: string, section_teacher: ISectionTeacher };
interface IClearSelectedSectionTeacherActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  SectionTeacherModificationStatus};
interface IRemoveSectionTeacherAllActionType { type: string }
interface IInitialSectionTeacherActionType {type: string, section_teacher: ISectionTeacher}
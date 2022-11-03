import { ICourseNew, CourseNewModificationStatus } from "../models/course_new.interface";
export const ADD_COURSE_NEW: string = "ADD_COURSE_NEW";
export const EDIT_COURSE_NEW: string = "EDIT_COURSE_NEW";
export const REMOVE_COURSE_NEW: string = "REMOVE_COURSE_NEW";
export const CHANGE_COURSE_NEW_AMOUNT: string = "CHANGE_COURSE_NEW_AMOUNT";
export const CHANGE_COURSE_NEW_PENDING_EDIT: string = "CHANGE_COURSE_NEW_PENDING_EDIT";
export const CLEAR_COURSE_NEW_PENDING_EDIT: string = "CLEAR_COURSE_NEW_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_COURSE_NEW_ALL: string = "REMOVE_COURSE_NEW_ALL";
export const INITIAL_COURSE_NEW: string = "INITIAL_COURSE_NEW";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(course_new: ICourseNew) {
    return {
        type: FETCH_DATA_SUCCESS,
        course_new
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialCourseNew(course_new: ICourseNew): IInitialCourseNewActionType {
    return { type: INITIAL_COURSE_NEW, course_new: course_new };
}

export function removeCourseNewAll(): IRemoveCourseNewAllActionType {
    return { type: REMOVE_COURSE_NEW_ALL };
}

export function addCourseNew(course_new: ICourseNew): IAddCourseNewActionType {
    return { type: ADD_COURSE_NEW, course_new: course_new };
}

export function editCourseNew(course_new: ICourseNew): IEditCourseNewActionType {
    return { type: EDIT_COURSE_NEW, course_new: course_new };
}

export function removeCourseNew(id: any): IRemoveCourseNewActionType {
    return { type: REMOVE_COURSE_NEW, id: id };
}

export function changeSelectedCourseNew(course_new: ICourseNew): IChangeSelectedCourseNewActionType {
    return { type: CHANGE_COURSE_NEW_PENDING_EDIT, course_new: course_new };
}

export function clearSelectedCourseNew(): IClearSelectedCourseNewActionType {
    return { type: CLEAR_COURSE_NEW_PENDING_EDIT };
}

export function setModificationState(value: CourseNewModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddCourseNewActionType { type: string, course_new: ICourseNew };
interface IEditCourseNewActionType { type: string, course_new: ICourseNew };
interface IRemoveCourseNewActionType { type: string, id: any };
interface IChangeSelectedCourseNewActionType { type: string, course_new: ICourseNew };
interface IClearSelectedCourseNewActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  CourseNewModificationStatus};
interface IRemoveCourseNewAllActionType { type: string }
interface IInitialCourseNewActionType {type: string, course_new: ICourseNew}
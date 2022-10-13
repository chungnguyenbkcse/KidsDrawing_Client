import { ICourseParentNew, CourseParentNewModificationStatus } from "../models/course_parent_new.interface";
export const ADD_COURSE_PARENT_NEW: string = "ADD_COURSE_PARENT_NEW";
export const EDIT_COURSE_PARENT_NEW: string = "EDIT_COURSE_PARENT_NEW";
export const REMOVE_COURSE_PARENT_NEW: string = "REMOVE_COURSE_PARENT_NEW";
export const CHANGE_COURSE_PARENT_NEW_AMOUNT: string = "CHANGE_COURSE_PARENT_NEW_AMOUNT";
export const CHANGE_COURSE_PARENT_NEW_PENDING_EDIT: string = "CHANGE_COURSE_PARENT_NEW_PENDING_EDIT";
export const CLEAR_COURSE_PARENT_NEW_PENDING_EDIT: string = "CLEAR_COURSE_PARENT_NEW_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_COURSE_PARENT_NEW_ALL: string = "REMOVE_COURSE_PARENT_NEW_ALL";
export const INITIAL_COURSE_PARENT_NEW: string = "INITIAL_COURSE_PARENT_NEW";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(course_parent_new: ICourseParentNew) {
    return {
        type: FETCH_DATA_SUCCESS,
        course_parent_new
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialCourseParentNew(course_parent_new: ICourseParentNew): IInitialCourseParentNewActionType {
    return { type: INITIAL_COURSE_PARENT_NEW, course_parent_new: course_parent_new };
}

export function removeCourseParentNewAll(): IRemoveCourseParentNewAllActionType {
    return { type: REMOVE_COURSE_PARENT_NEW_ALL };
}

export function addCourseParentNew(course_parent_new: ICourseParentNew): IAddCourseParentNewActionType {
    return { type: ADD_COURSE_PARENT_NEW, course_parent_new: course_parent_new };
}

export function editCourseParentNew(course_parent_new: ICourseParentNew): IEditCourseParentNewActionType {
    return { type: EDIT_COURSE_PARENT_NEW, course_parent_new: course_parent_new };
}

export function removeCourseParentNew(id: string): IRemoveCourseParentNewActionType {
    return { type: REMOVE_COURSE_PARENT_NEW, id: id };
}

export function changeSelectedCourseParentNew(course_parent_new: ICourseParentNew): IChangeSelectedCourseParentNewActionType {
    return { type: CHANGE_COURSE_PARENT_NEW_PENDING_EDIT, course_parent_new: course_parent_new };
}

export function clearSelectedCourseParentNew(): IClearSelectedCourseParentNewActionType {
    return { type: CLEAR_COURSE_PARENT_NEW_PENDING_EDIT };
}

export function setModificationState(value: CourseParentNewModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddCourseParentNewActionType { type: string, course_parent_new: ICourseParentNew };
interface IEditCourseParentNewActionType { type: string, course_parent_new: ICourseParentNew };
interface IRemoveCourseParentNewActionType { type: string, id: string };
interface IChangeSelectedCourseParentNewActionType { type: string, course_parent_new: ICourseParentNew };
interface IClearSelectedCourseParentNewActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  CourseParentNewModificationStatus};
interface IRemoveCourseParentNewAllActionType { type: string }
interface IInitialCourseParentNewActionType {type: string, course_parent_new: ICourseParentNew}
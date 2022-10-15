import { ICourseTeacherNew, CourseTeacherNewModificationStatus } from "../models/course_teacher_new.interface";
export const ADD_COURSE_TEACHER_NEW: string = "ADD_COURSE_TEACHER_NEW";
export const EDIT_COURSE_TEACHER_NEW: string = "EDIT_COURSE_TEACHER_NEW";
export const REMOVE_COURSE_TEACHER_NEW: string = "REMOVE_COURSE_TEACHER_NEW";
export const CHANGE_COURSE_TEACHER_NEW_AMOUNT: string = "CHANGE_COURSE_TEACHER_NEW_AMOUNT";
export const CHANGE_COURSE_TEACHER_NEW_PENDING_EDIT: string = "CHANGE_COURSE_TEACHER_NEW_PENDING_EDIT";
export const CLEAR_COURSE_TEACHER_NEW_PENDING_EDIT: string = "CLEAR_COURSE_TEACHER_NEW_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_COURSE_TEACHER_NEW_ALL: string = "REMOVE_COURSE_TEACHER_NEW_ALL";
export const INITIAL_COURSE_TEACHER_NEW: string = "INITIAL_COURSE_TEACHER_NEW";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(course_teacher_new: ICourseTeacherNew) {
    return {
        type: FETCH_DATA_SUCCESS,
        course_teacher_new
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialCourseTeacherNew(course_teacher_new: ICourseTeacherNew): IInitialCourseTeacherNewActionType {
    return { type: INITIAL_COURSE_TEACHER_NEW, course_teacher_new: course_teacher_new };
}

export function removeCourseTeacherNewAll(): IRemoveCourseTeacherNewAllActionType {
    return { type: REMOVE_COURSE_TEACHER_NEW_ALL };
}

export function addCourseTeacherNew(course_teacher_new: ICourseTeacherNew): IAddCourseTeacherNewActionType {
    return { type: ADD_COURSE_TEACHER_NEW, course_teacher_new: course_teacher_new };
}

export function editCourseTeacherNew(course_teacher_new: ICourseTeacherNew): IEditCourseTeacherNewActionType {
    return { type: EDIT_COURSE_TEACHER_NEW, course_teacher_new: course_teacher_new };
}

export function removeCourseTeacherNew(id: string): IRemoveCourseTeacherNewActionType {
    return { type: REMOVE_COURSE_TEACHER_NEW, id: id };
}

export function changeSelectedCourseTeacherNew(course_teacher_new: ICourseTeacherNew): IChangeSelectedCourseTeacherNewActionType {
    return { type: CHANGE_COURSE_TEACHER_NEW_PENDING_EDIT, course_teacher_new: course_teacher_new };
}

export function clearSelectedCourseTeacherNew(): IClearSelectedCourseTeacherNewActionType {
    return { type: CLEAR_COURSE_TEACHER_NEW_PENDING_EDIT };
}

export function setModificationState(value: CourseTeacherNewModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddCourseTeacherNewActionType { type: string, course_teacher_new: ICourseTeacherNew };
interface IEditCourseTeacherNewActionType { type: string, course_teacher_new: ICourseTeacherNew };
interface IRemoveCourseTeacherNewActionType { type: string, id: string };
interface IChangeSelectedCourseTeacherNewActionType { type: string, course_teacher_new: ICourseTeacherNew };
interface IClearSelectedCourseTeacherNewActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  CourseTeacherNewModificationStatus};
interface IRemoveCourseTeacherNewAllActionType { type: string }
interface IInitialCourseTeacherNewActionType {type: string, course_teacher_new: ICourseTeacherNew}
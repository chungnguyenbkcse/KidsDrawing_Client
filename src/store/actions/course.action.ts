import { ICourse, CourseModificationStatus } from "../models/course.interface";
export const ADD_COURSE: string = "ADD_COURSE";
export const EDIT_COURSE: string = "EDIT_COURSE";
export const REMOVE_COURSE: string = "REMOVE_COURSE";
export const CHANGE_COURSE_AMOUNT: string = "CHANGE_COURSE_AMOUNT";
export const CHANGE_COURSE_PENDING_EDIT: string = "CHANGE_COURSE_PENDING_EDIT";
export const CLEAR_COURSE_PENDING_EDIT: string = "CLEAR_COURSE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_COURSE_ALL: string = "REMOVE_COURSE_ALL";
export const INITIAL_COURSE: string = "INITIAL_COURSE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(course: ICourse) {
    return {
        type: FETCH_DATA_SUCCESS,
        course
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialCourse(course: ICourse): IInitialCourseActionType {
    return { type: INITIAL_COURSE, course: course };
}

export function removeCourseAll(): IRemoveCourseAllActionType {
    return { type: REMOVE_COURSE_ALL };
}

export function addCourse(course: ICourse): IAddCourseActionType {
    return { type: ADD_COURSE, course: course };
}

export function editCourse(course: ICourse): IEditCourseActionType {
    return { type: EDIT_COURSE, course: course };
}

export function removeCourse(id: any): IRemoveCourseActionType {
    return { type: REMOVE_COURSE, id: id };
}

export function changeSelectedCourse(course: ICourse): IChangeSelectedCourseActionType {
    return { type: CHANGE_COURSE_PENDING_EDIT, course: course };
}

export function clearSelectedCourse(): IClearSelectedCourseActionType {
    return { type: CLEAR_COURSE_PENDING_EDIT };
}

export function setModificationState(value: CourseModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddCourseActionType { type: string, course: ICourse };
interface IEditCourseActionType { type: string, course: ICourse };
interface IRemoveCourseActionType { type: string, id: any };
interface IChangeSelectedCourseActionType { type: string, course: ICourse };
interface IClearSelectedCourseActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  CourseModificationStatus};
interface IRemoveCourseAllActionType { type: string }
interface IInitialCourseActionType {type: string, course: ICourse}
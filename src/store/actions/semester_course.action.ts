import { ISemesterCourse, SemesterCourseModificationStatus } from "../models/semester_course.interface";
export const ADD_SEMESTER_COURSE: string = "ADD_SEMESTER_COURSE";
export const EDIT_SEMESTER_COURSE: string = "EDIT_SEMESTER_COURSE";
export const REMOVE_SEMESTER_COURSE: string = "REMOVE_SEMESTER_COURSE";
export const CHANGE_SEMESTER_COURSE_AMOUNT: string = "CHANGE_SEMESTER_COURSE_AMOUNT";
export const CHANGE_SEMESTER_COURSE_PENDING_EDIT: string = "CHANGE_SEMESTER_COURSE_PENDING_EDIT";
export const CLEAR_SEMESTER_COURSE_PENDING_EDIT: string = "CLEAR_SEMESTER_COURSE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_SEMESTER_COURSE_ALL: string = "REMOVE_SEMESTER_COURSE_ALL";
export const INITIAL_SEMESTER_COURSE: string = "INITIAL_SEMESTER_COURSE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(semester_course: ISemesterCourse) {
    return {
        type: FETCH_DATA_SUCCESS,
        semester_course
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialSemesterCourse(semester_course: ISemesterCourse): IInitialSemesterCourseActionType {
    return { type: INITIAL_SEMESTER_COURSE, semester_course: semester_course };
}

export function removeSemesterCourseAll(): IRemoveSemesterCourseAllActionType {
    return { type: REMOVE_SEMESTER_COURSE_ALL };
}

export function addSemesterCourse(semester_course: ISemesterCourse): IAddSemesterCourseActionType {
    return { type: ADD_SEMESTER_COURSE, semester_course: semester_course };
}

export function editSemesterCourse(semester_course: ISemesterCourse): IEditSemesterCourseActionType {
    return { type: EDIT_SEMESTER_COURSE, semester_course: semester_course };
}

export function removeSemesterCourse(id: number): IRemoveSemesterCourseActionType {
    return { type: REMOVE_SEMESTER_COURSE, id: id };
}

export function changeSelectedSemesterCourse(semester_course: ISemesterCourse): IChangeSelectedSemesterCourseActionType {
    return { type: CHANGE_SEMESTER_COURSE_PENDING_EDIT, semester_course: semester_course };
}

export function clearSelectedSemesterCourse(): IClearSelectedSemesterCourseActionType {
    return { type: CLEAR_SEMESTER_COURSE_PENDING_EDIT };
}

export function setModificationState(value: SemesterCourseModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddSemesterCourseActionType { type: string, semester_course: ISemesterCourse };
interface IEditSemesterCourseActionType { type: string, semester_course: ISemesterCourse };
interface IRemoveSemesterCourseActionType { type: string, id: number };
interface IChangeSelectedSemesterCourseActionType { type: string, semester_course: ISemesterCourse };
interface IClearSelectedSemesterCourseActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  SemesterCourseModificationStatus};
interface IRemoveSemesterCourseAllActionType { type: string }
interface IInitialSemesterCourseActionType {type: string, semester_course: ISemesterCourse}
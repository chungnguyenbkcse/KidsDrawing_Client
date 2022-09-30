import { ICourseStudent, CourseStudentModificationStatus } from "../models/course_student.interface";

// register_successfull_course_students
export const ADD_DOING_COURSE: string = "ADD_DOING_COURSE";
export const EDIT_DOING_COURSE: string = "EDIT_DOING_COURSE";
export const REMOVE_DOING_COURSE: string = "REMOVE_DOING_COURSE";
export const CHANGE_DOING_COURSE_AMOUNT: string = "CHANGE_DOING_COURSE_AMOUNT";
export const CHANGE_DOING_COURSE_PENDING_EDIT: string = "CHANGE_DOING_COURSE_PENDING_EDIT";
export const CLEAR_DOING_COURSE_PENDING_EDIT: string = "CLEAR_DOING_COURSE_PENDING_EDIT";
export const REMOVE_DOING_COURSE_ALL: string = "REMOVE_DOING_COURSE_ALL";
export const INITIAL_DOING_COURSE: string = "INITIAL_DOING_COURSE";

// not_register_course_students
export const ADD_DONE_COURSE: string = "ADD_DONE_COURSE";
export const EDIT_DONE_COURSE: string = "EDIT_DONE_COURSE";
export const REMOVE_DONE_COURSE: string = "REMOVE_DONE_COURSE";
export const CHANGE_DONE_COURSE_AMOUNT: string = "CHANGE_DONE_COURSE_AMOUNT";
export const CHANGE_DONE_COURSE_PENDING_EDIT: string = "CHANGE_DONE_COURSE_PENDING_EDIT";
export const CLEAR_DONE_COURSE_PENDING_EDIT: string = "CLEAR_DONE_COURSE_PENDING_EDIT";
export const REMOVE_DONE_COURSE_ALL: string = "REMOVE_DONE_COURSE_ALL";
export const INITIAL_DONE_COURSE: string = "INITIAL_DONE_COURSE";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(course_student: ICourseStudent) {
    return {
        type: FETCH_DATA_SUCCESS,
        course_student
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialCourseNotRegistedNow(course_student: ICourseStudent): IInitialCourseNotRegistedNowActionType {
    return { type: INITIAL_DOING_COURSE, course_student: course_student };
}

export function removeCourseNotRegistedNowAll(): IRemoveCourseNotRegistedNowAllActionType {
    return { type: REMOVE_DOING_COURSE_ALL };
}

export function addCourseNotRegistedNow(course_student: ICourseStudent): IAddCourseNotRegistedNowActionType {
    return { type: ADD_DOING_COURSE, course_student: course_student };
}

export function editCourseNotRegistedNow(course_student: ICourseStudent): IEditCourseNotRegistedNowActionType {
    return { type: EDIT_DOING_COURSE, course_student: course_student };
}

export function removeCourseNotRegistedNow(id: string): IRemoveCourseNotRegistedNowActionType {
    return { type: REMOVE_DOING_COURSE, id: id };
}

export function changeSelectedCourseNotRegistedNow(course_student: ICourseStudent): IChangeSelectedCourseNotRegistedNowActionType {
    return { type: CHANGE_DOING_COURSE_PENDING_EDIT, course_student: course_student };
}

export function clearSelectedCourseNotRegistedNow(): IClearSelectedCourseNotRegistedNowActionType {
    return { type: CLEAR_DOING_COURSE_PENDING_EDIT };
}


export function initialCourseRegisted(course_student: ICourseStudent): IInitialCourseRegistedActionType {
    return { type: INITIAL_DONE_COURSE, course_student: course_student };
}

export function removeCourseRegistedAll(): IRemoveCourseRegistedAllActionType {
    return { type: REMOVE_DONE_COURSE_ALL };
}

export function addCourseRegisted(course_student: ICourseStudent): IAddCourseRegistedActionType {
    return { type: ADD_DONE_COURSE, course_student: course_student };
}

export function editCourseRegisted(course_student: ICourseStudent): IEditCourseRegistedActionType {
    return { type: EDIT_DONE_COURSE, course_student: course_student };
}

export function removeCourseRegisted(id: string): IRemoveCourseRegistedActionType {
    return { type: REMOVE_DONE_COURSE, id: id };
}

export function changeSelectedCourseRegisted(course_student: ICourseStudent): IChangeSelectedCourseRegistedActionType {
    return { type: CHANGE_DONE_COURSE_PENDING_EDIT, course_student: course_student };
}

export function clearSelectedCourseRegisted(): IClearSelectedCourseRegistedActionType {
    return { type: CLEAR_DONE_COURSE_PENDING_EDIT };
}

export function setModificationState(value: CourseStudentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_course_students
interface IAddCourseNotRegistedNowActionType { type: string, course_student: ICourseStudent };
interface IEditCourseNotRegistedNowActionType { type: string, course_student: ICourseStudent };
interface IRemoveCourseNotRegistedNowActionType { type: string, id: string };
interface IChangeSelectedCourseNotRegistedNowActionType { type: string, course_student: ICourseStudent };
interface IClearSelectedCourseNotRegistedNowActionType { type: string };
interface IRemoveCourseNotRegistedNowAllActionType { type: string }
interface IInitialCourseNotRegistedNowActionType {type: string, course_student: ICourseStudent}

// not_register_course_students
interface IAddCourseRegistedActionType { type: string, course_student: ICourseStudent };
interface IEditCourseRegistedActionType { type: string, course_student: ICourseStudent };
interface IRemoveCourseRegistedActionType { type: string, id: string };
interface IChangeSelectedCourseRegistedActionType { type: string, course_student: ICourseStudent };
interface IClearSelectedCourseRegistedActionType { type: string };
interface IRemoveCourseRegistedAllActionType { type: string }
interface IInitialCourseRegistedActionType {type: string, course_student: ICourseStudent}



interface ISetModificationStateActionType { type: string, value:  CourseStudentModificationStatus};
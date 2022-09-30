import { ICourseTeacher, CourseTeacherModificationStatus } from "../models/course_teacher.interface";

// register_successfull_courses
export const ADD_REGISTER_SUCCESSFULL_COURSE: string = "ADD_REGISTER_SUCCESSFULL_COURSE";
export const EDIT_REGISTER_SUCCESSFULL_COURSE: string = "EDIT_REGISTER_SUCCESSFULL_COURSE";
export const REMOVE_REGISTER_SUCCESSFULL_COURSE: string = "REMOVE_REGISTER_SUCCESSFULL_COURSE";
export const CHANGE_REGISTER_SUCCESSFULL_COURSE_AMOUNT: string = "CHANGE_REGISTER_SUCCESSFULL_COURSE_AMOUNT";
export const CHANGE_REGISTER_SUCCESSFULL_COURSE_PENDING_EDIT: string = "CHANGE_REGISTER_SUCCESSFULL_COURSE_PENDING_EDIT";
export const CLEAR_REGISTER_SUCCESSFULL_COURSE_PENDING_EDIT: string = "CLEAR_REGISTER_SUCCESSFULL_COURSE_PENDING_EDIT";
export const REMOVE_REGISTER_SUCCESSFULL_COURSE_ALL: string = "REMOVE_REGISTER_SUCCESSFULL_COURSE_ALL";
export const INITIAL_REGISTER_SUCCESSFULL_COURSE: string = "INITIAL_REGISTER_SUCCESSFULL_COURSE";

// not_register_courses
export const ADD_NOT_REGISTER_COURSE: string = "ADD_NOT_REGISTER_COURSE";
export const EDIT_NOT_REGISTER_COURSE: string = "EDIT_NOT_REGISTER_COURSE";
export const REMOVE_NOT_REGISTER_COURSE: string = "REMOVE_NOT_REGISTER_COURSE";
export const CHANGE_NOT_REGISTER_COURSE_AMOUNT: string = "CHANGE_NOT_REGISTER_COURSE_AMOUNT";
export const CHANGE_NOT_REGISTER_COURSE_PENDING_EDIT: string = "CHANGE_NOT_REGISTER_COURSE_PENDING_EDIT";
export const CLEAR_NOT_REGISTER_COURSE_PENDING_EDIT: string = "CLEAR_NOT_REGISTER_COURSE_PENDING_EDIT";
export const REMOVE_NOT_REGISTER_COURSE_ALL: string = "REMOVE_NOT_REGISTER_COURSE_ALL";
export const INITIAL_NOT_REGISTER_COURSE: string = "INITIAL_NOT_REGISTER_COURSE";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(course: ICourseTeacher) {
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

export function initialRegisterSuccessfullCourse(course: ICourseTeacher): IInitialRegisterSuccessfullCourseActionType {
    return { type: INITIAL_REGISTER_SUCCESSFULL_COURSE, course: course };
}

export function removeRegisterSuccessfullCourseAll(): IRemoveRegisterSuccessfullCourseAllActionType {
    return { type: REMOVE_REGISTER_SUCCESSFULL_COURSE_ALL };
}

export function addRegisterSuccessfullCourse(course: ICourseTeacher): IAddRegisterSuccessfullCourseActionType {
    return { type: ADD_REGISTER_SUCCESSFULL_COURSE, course: course };
}

export function editRegisterSuccessfullCourse(course: ICourseTeacher): IEditRegisterSuccessfullCourseActionType {
    return { type: EDIT_REGISTER_SUCCESSFULL_COURSE, course: course };
}

export function removeRegisterSuccessfullCourse(id: string): IRemoveRegisterSuccessfullCourseActionType {
    return { type: REMOVE_REGISTER_SUCCESSFULL_COURSE, id: id };
}

export function changeSelectedRegisterSuccessfullCourse(course: ICourseTeacher): IChangeSelectedRegisterSuccessfullCourseActionType {
    return { type: CHANGE_REGISTER_SUCCESSFULL_COURSE_PENDING_EDIT, course: course };
}

export function clearSelectedRegisterSuccessfullCourse(): IClearSelectedRegisterSuccessfullCourseActionType {
    return { type: CLEAR_REGISTER_SUCCESSFULL_COURSE_PENDING_EDIT };
}


export function initialNotRegisterCourse(course: ICourseTeacher): IInitialNotRegisterCourseActionType {
    return { type: INITIAL_NOT_REGISTER_COURSE, course: course };
}

export function removeNotRegisterCourseAll(): IRemoveNotRegisterCourseAllActionType {
    return { type: REMOVE_NOT_REGISTER_COURSE_ALL };
}

export function addNotRegisterCourse(course: ICourseTeacher): IAddNotRegisterCourseActionType {
    return { type: ADD_NOT_REGISTER_COURSE, course: course };
}

export function editNotRegisterCourse(course: ICourseTeacher): IEditNotRegisterCourseActionType {
    return { type: EDIT_NOT_REGISTER_COURSE, course: course };
}

export function removeNotRegisterCourse(id: string): IRemoveNotRegisterCourseActionType {
    return { type: REMOVE_NOT_REGISTER_COURSE, id: id };
}

export function changeSelectedCourse(course: ICourseTeacher): IChangeSelectedNotRegisterCourseActionType {
    return { type: CHANGE_NOT_REGISTER_COURSE_PENDING_EDIT, course: course };
}

export function clearSelectedNotRegisterCourse(): IClearSelectedNotRegisterCourseActionType {
    return { type: CLEAR_NOT_REGISTER_COURSE_PENDING_EDIT };
}

export function setModificationState(value: CourseTeacherModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_courses
interface IAddRegisterSuccessfullCourseActionType { type: string, course: ICourseTeacher };
interface IEditRegisterSuccessfullCourseActionType { type: string, course: ICourseTeacher };
interface IRemoveRegisterSuccessfullCourseActionType { type: string, id: string };
interface IChangeSelectedRegisterSuccessfullCourseActionType { type: string, course: ICourseTeacher };
interface IClearSelectedRegisterSuccessfullCourseActionType { type: string };
interface IRemoveRegisterSuccessfullCourseAllActionType { type: string }
interface IInitialRegisterSuccessfullCourseActionType {type: string, course: ICourseTeacher}

// not_register_courses
interface IAddNotRegisterCourseActionType { type: string, course: ICourseTeacher };
interface IEditNotRegisterCourseActionType { type: string, course: ICourseTeacher };
interface IRemoveNotRegisterCourseActionType { type: string, id: string };
interface IChangeSelectedNotRegisterCourseActionType { type: string, course: ICourseTeacher };
interface IClearSelectedNotRegisterCourseActionType { type: string };
interface IRemoveNotRegisterCourseAllActionType { type: string }
interface IInitialNotRegisterCourseActionType {type: string, course: ICourseTeacher}



interface ISetModificationStateActionType { type: string, value:  CourseTeacherModificationStatus};
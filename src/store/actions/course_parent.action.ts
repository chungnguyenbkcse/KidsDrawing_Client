import { ICourseParent, CourseParentModificationStatus } from "../models/course_parent.interface";

// register_successfull_course_parents
export const ADD_DOING_COURSE: string = "ADD_DOING_COURSE";
export const EDIT_DOING_COURSE: string = "EDIT_DOING_COURSE";
export const REMOVE_DOING_COURSE: string = "REMOVE_DOING_COURSE";
export const CHANGE_DOING_COURSE_AMOUNT: string = "CHANGE_DOING_COURSE_AMOUNT";
export const CHANGE_DOING_COURSE_PENDING_EDIT: string = "CHANGE_DOING_COURSE_PENDING_EDIT";
export const CLEAR_DOING_COURSE_PENDING_EDIT: string = "CLEAR_DOING_COURSE_PENDING_EDIT";
export const REMOVE_DOING_COURSE_ALL: string = "REMOVE_DOING_COURSE_ALL";
export const INITIAL_DOING_COURSE: string = "INITIAL_DOING_COURSE";

// not_register_course_parents
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

export function fetchDataSuccess(course_parent: ICourseParent) {
    return {
        type: FETCH_DATA_SUCCESS,
        course_parent
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialCourseNotRegistedNow(course_parent: ICourseParent): IInitialCourseNotRegistedNowActionType {
    return { type: INITIAL_DOING_COURSE, course_parent: course_parent };
}

export function removeCourseNotRegistedNowAll(): IRemoveCourseNotRegistedNowAllActionType {
    return { type: REMOVE_DOING_COURSE_ALL };
}

export function addCourseNotRegistedNow(course_parent: ICourseParent): IAddCourseNotRegistedNowActionType {
    return { type: ADD_DOING_COURSE, course_parent: course_parent };
}

export function editCourseNotRegistedNow(course_parent: ICourseParent): IEditCourseNotRegistedNowActionType {
    return { type: EDIT_DOING_COURSE, course_parent: course_parent };
}

export function removeCourseNotRegistedNow(id: string): IRemoveCourseNotRegistedNowActionType {
    return { type: REMOVE_DOING_COURSE, id: id };
}

export function changeSelectedCourseNotRegistedNow(course_parent: ICourseParent): IChangeSelectedCourseNotRegistedNowActionType {
    return { type: CHANGE_DOING_COURSE_PENDING_EDIT, course_parent: course_parent };
}

export function clearSelectedCourseNotRegistedNow(): IClearSelectedCourseNotRegistedNowActionType {
    return { type: CLEAR_DOING_COURSE_PENDING_EDIT };
}


export function initialCourseRegisted(course_parent: ICourseParent): IInitialCourseRegistedActionType {
    return { type: INITIAL_DONE_COURSE, course_parent: course_parent };
}

export function removeCourseRegistedAll(): IRemoveCourseRegistedAllActionType {
    return { type: REMOVE_DONE_COURSE_ALL };
}

export function addCourseRegisted(course_parent: ICourseParent): IAddCourseRegistedActionType {
    return { type: ADD_DONE_COURSE, course_parent: course_parent };
}

export function editCourseRegisted(course_parent: ICourseParent): IEditCourseRegistedActionType {
    return { type: EDIT_DONE_COURSE, course_parent: course_parent };
}

export function removeCourseRegisted(id: string): IRemoveCourseRegistedActionType {
    return { type: REMOVE_DONE_COURSE, id: id };
}

export function changeSelectedCourseRegisted(course_parent: ICourseParent): IChangeSelectedCourseRegistedActionType {
    return { type: CHANGE_DONE_COURSE_PENDING_EDIT, course_parent: course_parent };
}

export function clearSelectedCourseRegisted(): IClearSelectedCourseRegistedActionType {
    return { type: CLEAR_DONE_COURSE_PENDING_EDIT };
}

export function setModificationState(value: CourseParentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_course_parents
interface IAddCourseNotRegistedNowActionType { type: string, course_parent: ICourseParent };
interface IEditCourseNotRegistedNowActionType { type: string, course_parent: ICourseParent };
interface IRemoveCourseNotRegistedNowActionType { type: string, id: string };
interface IChangeSelectedCourseNotRegistedNowActionType { type: string, course_parent: ICourseParent };
interface IClearSelectedCourseNotRegistedNowActionType { type: string };
interface IRemoveCourseNotRegistedNowAllActionType { type: string }
interface IInitialCourseNotRegistedNowActionType {type: string, course_parent: ICourseParent}

// not_register_course_parents
interface IAddCourseRegistedActionType { type: string, course_parent: ICourseParent };
interface IEditCourseRegistedActionType { type: string, course_parent: ICourseParent };
interface IRemoveCourseRegistedActionType { type: string, id: string };
interface IChangeSelectedCourseRegistedActionType { type: string, course_parent: ICourseParent };
interface IClearSelectedCourseRegistedActionType { type: string };
interface IRemoveCourseRegistedAllActionType { type: string }
interface IInitialCourseRegistedActionType {type: string, course_parent: ICourseParent}



interface ISetModificationStateActionType { type: string, value:  CourseParentModificationStatus};
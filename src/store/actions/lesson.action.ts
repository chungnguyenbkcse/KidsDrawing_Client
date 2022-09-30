import { ILesson, LessonModificationStatus } from "../models/lesson.interface";
export const ADD_LESSON: string = "ADD_LESSON";
export const EDIT_LESSON: string = "EDIT_LESSON";
export const REMOVE_LESSON: string = "REMOVE_LESSON";
export const CHANGE_LESSON_AMOUNT: string = "CHANGE_LESSON_AMOUNT";
export const CHANGE_LESSON_PENDING_EDIT: string = "CHANGE_LESSON_PENDING_EDIT";
export const CLEAR_LESSON_PENDING_EDIT: string = "CLEAR_LESSON_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_LESSON_ALL: string = "REMOVE_LESSON_ALL";
export const INITIAL_LESSON: string = "INITIAL_LESSON";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(lesson: ILesson) {
    return {
        type: FETCH_DATA_SUCCESS,
        lesson
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialLesson(lesson: ILesson): IInitialLessonActionType {
    return { type: INITIAL_LESSON, lesson: lesson };
}

export function removeLessonAll(): IRemoveLessonAllActionType {
    return { type: REMOVE_LESSON_ALL };
}

export function addLesson(lesson: ILesson): IAddLessonActionType {
    return { type: ADD_LESSON, lesson: lesson };
}

export function editLesson(lesson: ILesson): IEditLessonActionType {
    return { type: EDIT_LESSON, lesson: lesson };
}

export function removeLesson(id: string): IRemoveLessonActionType {
    return { type: REMOVE_LESSON, id: id };
}

export function changeSelectedLesson(lesson: ILesson): IChangeSelectedLessonActionType {
    return { type: CHANGE_LESSON_PENDING_EDIT, lesson: lesson };
}

export function clearSelectedLesson(): IClearSelectedLessonActionType {
    return { type: CLEAR_LESSON_PENDING_EDIT };
}

export function setModificationState(value: LessonModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddLessonActionType { type: string, lesson: ILesson };
interface IEditLessonActionType { type: string, lesson: ILesson };
interface IRemoveLessonActionType { type: string, id: string };
interface IChangeSelectedLessonActionType { type: string, lesson: ILesson };
interface IClearSelectedLessonActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  LessonModificationStatus};
interface IRemoveLessonAllActionType { type: string }
interface IInitialLessonActionType {type: string, lesson: ILesson}
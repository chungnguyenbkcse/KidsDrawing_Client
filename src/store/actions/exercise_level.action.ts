import { IExerciseLevel, ExerciseLevelModificationStatus } from "../models/exercise_level.interface";
export const ADD_EXERCISE_LEVEL: string = "ADD_EXERCISE_LEVEL";
export const EDIT_EXERCISE_LEVEL: string = "EDIT_EXERCISE_LEVEL";
export const REMOVE_EXERCISE_LEVEL: string = "REMOVE_EXERCISE_LEVEL";
export const CHANGE_EXERCISE_LEVEL_AMOUNT: string = "CHANGE_EXERCISE_LEVEL_AMOUNT";
export const CHANGE_EXERCISE_LEVEL_PENDING_EDIT: string = "CHANGE_EXERCISE_LEVEL_PENDING_EDIT";
export const CLEAR_EXERCISE_LEVEL_PENDING_EDIT: string = "CLEAR_EXERCISE_LEVEL_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_EXERCISE_LEVEL_ALL: string = "REMOVE_EXERCISE_LEVEL_ALL";
export const INITIAL_EXERCISE_LEVEL: string = "INITIAL_EXERCISE_LEVEL";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(exercise_level: IExerciseLevel) {
    return {
        type: FETCH_DATA_SUCCESS,
        exercise_level
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialExerciseLevel(exercise_level: IExerciseLevel): IInitialExerciseLevelActionType {
    return { type: INITIAL_EXERCISE_LEVEL, exercise_level: exercise_level };
}

export function removeExerciseLevelAll(): IRemoveExerciseLevelAllActionType {
    return { type: REMOVE_EXERCISE_LEVEL_ALL };
}

export function addExerciseLevel(exercise_level: IExerciseLevel): IAddExerciseLevelActionType {
    return { type: ADD_EXERCISE_LEVEL, exercise_level: exercise_level };
}

export function editExerciseLevel(exercise_level: IExerciseLevel): IEditExerciseLevelActionType {
    return { type: EDIT_EXERCISE_LEVEL, exercise_level: exercise_level };
}

export function removeExerciseLevel(id: any): IRemoveExerciseLevelActionType {
    return { type: REMOVE_EXERCISE_LEVEL, id: id };
}

export function changeSelectedExerciseLevel(exercise_level: IExerciseLevel): IChangeSelectedExerciseLevelActionType {
    return { type: CHANGE_EXERCISE_LEVEL_PENDING_EDIT, exercise_level: exercise_level };
}

export function clearSelectedExerciseLevel(): IClearSelectedExerciseLevelActionType {
    return { type: CLEAR_EXERCISE_LEVEL_PENDING_EDIT };
}

export function setModificationState(value: ExerciseLevelModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddExerciseLevelActionType { type: string, exercise_level: IExerciseLevel };
interface IEditExerciseLevelActionType { type: string, exercise_level: IExerciseLevel };
interface IRemoveExerciseLevelActionType { type: string, id: any };
interface IChangeSelectedExerciseLevelActionType { type: string, exercise_level: IExerciseLevel };
interface IClearSelectedExerciseLevelActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ExerciseLevelModificationStatus};
interface IRemoveExerciseLevelAllActionType { type: string }
interface IInitialExerciseLevelActionType {type: string, exercise_level: IExerciseLevel}
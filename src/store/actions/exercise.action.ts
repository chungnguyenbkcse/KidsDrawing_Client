import { IExercise, ExerciseModificationStatus } from "../models/exercise.interface";
export const ADD_EXERCISE: string = "ADD_EXERCISE";
export const EDIT_EXERCISE: string = "EDIT_EXERCISE";
export const REMOVE_EXERCISE: string = "REMOVE_EXERCISE";
export const CHANGE_EXERCISE_AMOUNT: string = "CHANGE_EXERCISE_AMOUNT";
export const CHANGE_EXERCISE_PENDING_EDIT: string = "CHANGE_EXERCISE_PENDING_EDIT";
export const CLEAR_EXERCISE_PENDING_EDIT: string = "CLEAR_EXERCISE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_EXERCISE_ALL: string = "REMOVE_EXERCISE_ALL";
export const INITIAL_EXERCISE: string = "INITIAL_EXERCISE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(exercise: IExercise) {
    return {
        type: FETCH_DATA_SUCCESS,
        exercise
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialExercise(exercise: IExercise): IInitialExerciseActionType {
    return { type: INITIAL_EXERCISE, exercise: exercise };
}

export function removeExerciseAll(): IRemoveExerciseAllActionType {
    return { type: REMOVE_EXERCISE_ALL };
}

export function addExercise(exercise: IExercise): IAddExerciseActionType {
    return { type: ADD_EXERCISE, exercise: exercise };
}

export function editExercise(exercise: IExercise): IEditExerciseActionType {
    return { type: EDIT_EXERCISE, exercise: exercise };
}

export function removeExercise(id: any): IRemoveExerciseActionType {
    return { type: REMOVE_EXERCISE, id: id };
}

export function changeSelectedExercise(exercise: IExercise): IChangeSelectedExerciseActionType {
    return { type: CHANGE_EXERCISE_PENDING_EDIT, exercise: exercise };
}

export function clearSelectedExercise(): IClearSelectedExerciseActionType {
    return { type: CLEAR_EXERCISE_PENDING_EDIT };
}

export function setModificationState(value: ExerciseModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddExerciseActionType { type: string, exercise: IExercise };
interface IEditExerciseActionType { type: string, exercise: IExercise };
interface IRemoveExerciseActionType { type: string, id: any };
interface IChangeSelectedExerciseActionType { type: string, exercise: IExercise };
interface IClearSelectedExerciseActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ExerciseModificationStatus};
interface IRemoveExerciseAllActionType { type: string }
interface IInitialExerciseActionType {type: string, exercise: IExercise}
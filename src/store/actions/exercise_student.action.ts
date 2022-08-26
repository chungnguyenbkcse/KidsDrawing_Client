import { IExerciseStudent, ExerciseStudentModificationStatus } from "../models/exercise_student.interface";

// register_successfull_exercise_students
export const ADD_EXERCISE_NOT_SUBMIT: string = "ADD_EXERCISE_NOT_SUBMIT";
export const EDIT_EXERCISE_NOT_SUBMIT: string = "EDIT_EXERCISE_NOT_SUBMIT";
export const REMOVE_EXERCISE_NOT_SUBMIT: string = "REMOVE_EXERCISE_NOT_SUBMIT";
export const CHANGE_EXERCISE_NOT_SUBMIT_AMOUNT: string = "CHANGE_EXERCISE_NOT_SUBMIT_AMOUNT";
export const CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT: string = "CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT";
export const CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT: string = "CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT";
export const REMOVE_EXERCISE_NOT_SUBMIT_ALL: string = "REMOVE_EXERCISE_NOT_SUBMIT_ALL";
export const INITIAL_EXERCISE_NOT_SUBMIT: string = "INITIAL_EXERCISE_NOT_SUBMIT";

// not_register_exercise_students
export const ADD_EXERCISE_SUBMITTED: string = "ADD_EXERCISE_SUBMITTED";
export const EDIT_EXERCISE_SUBMITTED: string = "EDIT_EXERCISE_SUBMITTED";
export const REMOVE_EXERCISE_SUBMITTED: string = "REMOVE_EXERCISE_SUBMITTED";
export const CHANGE_EXERCISE_SUBMITTED_AMOUNT: string = "CHANGE_EXERCISE_SUBMITTED_AMOUNT";
export const CHANGE_EXERCISE_SUBMITTED_PENDING_EDIT: string = "CHANGE_EXERCISE_SUBMITTED_PENDING_EDIT";
export const CLEAR_EXERCISE_SUBMITTED_PENDING_EDIT: string = "CLEAR_EXERCISE_SUBMITTED_PENDING_EDIT";
export const REMOVE_EXERCISE_SUBMITTED_ALL: string = "REMOVE_EXERCISE_SUBMITTED_ALL";
export const INITIAL_EXERCISE_SUBMITTED: string = "INITIAL_EXERCISE_SUBMITTED";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(exercise_student: IExerciseStudent) {
    return {
        type: FETCH_DATA_SUCCESS,
        exercise_student
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialExerciseNotSubmit(exercise_student: IExerciseStudent): IInitialExerciseNotSubmitActionType {
    return { type: INITIAL_EXERCISE_NOT_SUBMIT, exercise_student: exercise_student };
}

export function removeExerciseNotSubmitAll(): IRemoveExerciseNotSubmitAllActionType {
    return { type: REMOVE_EXERCISE_NOT_SUBMIT_ALL };
}

export function addExerciseNotSubmit(exercise_student: IExerciseStudent): IAddExerciseNotSubmitActionType {
    return { type: ADD_EXERCISE_NOT_SUBMIT, exercise_student: exercise_student };
}

export function editExerciseNotSubmit(exercise_student: IExerciseStudent): IEditExerciseNotSubmitActionType {
    return { type: EDIT_EXERCISE_NOT_SUBMIT, exercise_student: exercise_student };
}

export function removeExerciseNotSubmit(id: number): IRemoveExerciseNotSubmitActionType {
    return { type: REMOVE_EXERCISE_NOT_SUBMIT, id: id };
}

export function changeSelectedExerciseNotSubmit(exercise_student: IExerciseStudent): IChangeSelectedExerciseNotSubmitActionType {
    return { type: CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT, exercise_student: exercise_student };
}

export function clearSelectedExerciseNotSubmit(): IClearSelectedExerciseNotSubmitActionType {
    return { type: CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT };
}


export function initialExerciseSubmitted(exercise_student: IExerciseStudent): IInitialExerciseSubmittedActionType {
    return { type: INITIAL_EXERCISE_SUBMITTED, exercise_student: exercise_student };
}

export function removeExerciseSubmittedAll(): IRemoveExerciseSubmittedAllActionType {
    return { type: REMOVE_EXERCISE_SUBMITTED_ALL };
}

export function addExerciseSubmitted(exercise_student: IExerciseStudent): IAddExerciseSubmittedActionType {
    return { type: ADD_EXERCISE_SUBMITTED, exercise_student: exercise_student };
}

export function editExerciseSubmitted(exercise_student: IExerciseStudent): IEditExerciseSubmittedActionType {
    return { type: EDIT_EXERCISE_SUBMITTED, exercise_student: exercise_student };
}

export function removeExerciseSubmitted(id: number): IRemoveExerciseSubmittedActionType {
    return { type: REMOVE_EXERCISE_SUBMITTED, id: id };
}

export function changeSelectedExerciseSubmitted(exercise_student: IExerciseStudent): IChangeSelectedExerciseSubmittedActionType {
    return { type: CHANGE_EXERCISE_SUBMITTED_PENDING_EDIT, exercise_student: exercise_student };
}

export function clearSelectedExerciseSubmitted(): IClearSelectedExerciseSubmittedActionType {
    return { type: CLEAR_EXERCISE_SUBMITTED_PENDING_EDIT };
}

export function setModificationState(value: ExerciseStudentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_exercise_students
interface IAddExerciseNotSubmitActionType { type: string, exercise_student: IExerciseStudent };
interface IEditExerciseNotSubmitActionType { type: string, exercise_student: IExerciseStudent };
interface IRemoveExerciseNotSubmitActionType { type: string, id: number };
interface IChangeSelectedExerciseNotSubmitActionType { type: string, exercise_student: IExerciseStudent };
interface IClearSelectedExerciseNotSubmitActionType { type: string };
interface IRemoveExerciseNotSubmitAllActionType { type: string }
interface IInitialExerciseNotSubmitActionType {type: string, exercise_student: IExerciseStudent}

// not_register_exercise_students
interface IAddExerciseSubmittedActionType { type: string, exercise_student: IExerciseStudent };
interface IEditExerciseSubmittedActionType { type: string, exercise_student: IExerciseStudent };
interface IRemoveExerciseSubmittedActionType { type: string, id: number };
interface IChangeSelectedExerciseSubmittedActionType { type: string, exercise_student: IExerciseStudent };
interface IClearSelectedExerciseSubmittedActionType { type: string };
interface IRemoveExerciseSubmittedAllActionType { type: string }
interface IInitialExerciseSubmittedActionType {type: string, exercise_student: IExerciseStudent}



interface ISetModificationStateActionType { type: string, value:  ExerciseStudentModificationStatus};
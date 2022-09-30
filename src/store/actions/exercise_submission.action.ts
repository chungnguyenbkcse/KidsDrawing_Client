import { IExerciseSubmission, ExerciseSubmissionModificationStatus } from "../models/exercise_submission.interface";

// register_successfull_exercise_submissions
export const ADD_EXERCISE_SUBMISSION_NOT_GRADED: string = "ADD_EXERCISE_SUBMISSION_NOT_GRADED";
export const EDIT_EXERCISE_SUBMISSION_NOT_GRADED: string = "EDIT_EXERCISE_SUBMISSION_NOT_GRADED";
export const REMOVE_EXERCISE_SUBMISSION_NOT_GRADED: string = "REMOVE_EXERCISE_SUBMISSION_NOT_GRADED";
export const CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_AMOUNT: string = "CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_AMOUNT";
export const CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT: string = "CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT";
export const CLEAR_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT: string = "CLEAR_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT";
export const REMOVE_EXERCISE_SUBMISSION_NOT_GRADED_ALL: string = "REMOVE_EXERCISE_SUBMISSION_NOT_GRADED_ALL";
export const INITIAL_EXERCISE_SUBMISSION_NOT_GRADED: string = "INITIAL_EXERCISE_SUBMISSION_NOT_GRADED";

// not_register_exercise_submissions
export const ADD_EXERCISE_SUBMISSION_GRADED: string = "ADD_EXERCISE_SUBMISSION_GRADED";
export const EDIT_EXERCISE_SUBMISSION_GRADED: string = "EDIT_EXERCISE_SUBMISSION_GRADED";
export const REMOVE_EXERCISE_SUBMISSION_GRADED: string = "REMOVE_EXERCISE_SUBMISSION_GRADED";
export const CHANGE_EXERCISE_SUBMISSION_GRADED_AMOUNT: string = "CHANGE_EXERCISE_SUBMISSION_GRADED_AMOUNT";
export const CHANGE_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT: string = "CHANGE_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT";
export const CLEAR_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT: string = "CLEAR_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT";
export const REMOVE_EXERCISE_SUBMISSION_GRADED_ALL: string = "REMOVE_EXERCISE_SUBMISSION_GRADED_ALL";
export const INITIAL_EXERCISE_SUBMISSION_GRADED: string = "INITIAL_EXERCISE_SUBMISSION_GRADED";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(exercise_submission: IExerciseSubmission) {
    return {
        type: FETCH_DATA_SUCCESS,
        exercise_submission
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialExerciseNotGraded(exercise_submission: IExerciseSubmission): IInitialExerciseNotGradedActionType {
    return { type: INITIAL_EXERCISE_SUBMISSION_NOT_GRADED, exercise_submission: exercise_submission };
}

export function removeExerciseNotGradedAll(): IRemoveExerciseNotGradedAllActionType {
    return { type: REMOVE_EXERCISE_SUBMISSION_NOT_GRADED_ALL };
}

export function addExerciseNotGraded(exercise_submission: IExerciseSubmission): IAddExerciseNotGradedActionType {
    return { type: ADD_EXERCISE_SUBMISSION_NOT_GRADED, exercise_submission: exercise_submission };
}

export function editExerciseNotGraded(exercise_submission: IExerciseSubmission): IEditExerciseNotGradedActionType {
    return { type: EDIT_EXERCISE_SUBMISSION_NOT_GRADED, exercise_submission: exercise_submission };
}

export function removeExerciseNotGraded(id: string): IRemoveExerciseNotGradedActionType {
    return { type: REMOVE_EXERCISE_SUBMISSION_NOT_GRADED, id: id };
}

export function changeSelectedExerciseNotGraded(exercise_submission: IExerciseSubmission): IChangeSelectedExerciseNotGradedActionType {
    return { type: CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT, exercise_submission: exercise_submission };
}

export function clearSelectedExerciseNotGraded(): IClearSelectedExerciseNotGradedActionType {
    return { type: CLEAR_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT };
}


export function initialExerciseGraded(exercise_submission: IExerciseSubmission): IInitialExerciseGradedActionType {
    return { type: INITIAL_EXERCISE_SUBMISSION_GRADED, exercise_submission: exercise_submission };
}

export function removeExerciseGradedAll(): IRemoveExerciseGradedAllActionType {
    return { type: REMOVE_EXERCISE_SUBMISSION_GRADED_ALL };
}

export function addExerciseGraded(exercise_submission: IExerciseSubmission): IAddExerciseGradedActionType {
    return { type: ADD_EXERCISE_SUBMISSION_GRADED, exercise_submission: exercise_submission };
}

export function editExerciseGraded(exercise_submission: IExerciseSubmission): IEditExerciseGradedActionType {
    return { type: EDIT_EXERCISE_SUBMISSION_GRADED, exercise_submission: exercise_submission };
}

export function removeExerciseGraded(id: string): IRemoveExerciseGradedActionType {
    return { type: REMOVE_EXERCISE_SUBMISSION_GRADED, id: id };
}

export function changeSelectedExerciseGraded(exercise_submission: IExerciseSubmission): IChangeSelectedExerciseGradedActionType {
    return { type: CHANGE_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT, exercise_submission: exercise_submission };
}

export function clearSelectedExerciseGraded(): IClearSelectedExerciseGradedActionType {
    return { type: CLEAR_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT };
}

export function setModificationState(value: ExerciseSubmissionModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_exercise_submissions
interface IAddExerciseNotGradedActionType { type: string, exercise_submission: IExerciseSubmission };
interface IEditExerciseNotGradedActionType { type: string, exercise_submission: IExerciseSubmission };
interface IRemoveExerciseNotGradedActionType { type: string, id: string };
interface IChangeSelectedExerciseNotGradedActionType { type: string, exercise_submission: IExerciseSubmission };
interface IClearSelectedExerciseNotGradedActionType { type: string };
interface IRemoveExerciseNotGradedAllActionType { type: string }
interface IInitialExerciseNotGradedActionType {type: string, exercise_submission: IExerciseSubmission}

// not_register_exercise_submissions
interface IAddExerciseGradedActionType { type: string, exercise_submission: IExerciseSubmission };
interface IEditExerciseGradedActionType { type: string, exercise_submission: IExerciseSubmission };
interface IRemoveExerciseGradedActionType { type: string, id: string };
interface IChangeSelectedExerciseGradedActionType { type: string, exercise_submission: IExerciseSubmission };
interface IClearSelectedExerciseGradedActionType { type: string };
interface IRemoveExerciseGradedAllActionType { type: string }
interface IInitialExerciseGradedActionType {type: string, exercise_submission: IExerciseSubmission}



interface ISetModificationStateActionType { type: string, value:  ExerciseSubmissionModificationStatus};
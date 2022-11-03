import { IUserGradeExerciseSubmission, UserGradeExerciseSubmissionModificationStatus } from "../models/user_grade_exercise_submission.interface";
export const ADD_USER_GRADE_EXERCISE_SUBMISSION: string = "ADD_USER_GRADE_EXERCISE_SUBMISSION";
export const EDIT_USER_GRADE_EXERCISE_SUBMISSION: string = "EDIT_USER_GRADE_EXERCISE_SUBMISSION";
export const REMOVE_USER_GRADE_EXERCISE_SUBMISSION: string = "REMOVE_USER_GRADE_EXERCISE_SUBMISSION";
export const CHANGE_USER_GRADE_EXERCISE_SUBMISSION_AMOUNT: string = "CHANGE_USER_GRADE_EXERCISE_SUBMISSION_AMOUNT";
export const CHANGE_USER_GRADE_EXERCISE_SUBMISSION_PENDING_EDIT: string = "CHANGE_USER_GRADE_EXERCISE_SUBMISSION_PENDING_EDIT";
export const CLEAR_USER_GRADE_EXERCISE_SUBMISSION_PENDING_EDIT: string = "CLEAR_USER_GRADE_EXERCISE_SUBMISSION_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_USER_GRADE_EXERCISE_SUBMISSION_ALL: string = "REMOVE_USER_GRADE_EXERCISE_SUBMISSION_ALL";
export const INITIAL_USER_GRADE_EXERCISE_SUBMISSION: string = "INITIAL_USER_GRADE_EXERCISE_SUBMISSION";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(user_grade_exercise_submission: IUserGradeExerciseSubmission) {
    return {
        type: FETCH_DATA_SUCCESS,
        user_grade_exercise_submission
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialUserGradeExerciseSubmission(user_grade_exercise_submission: IUserGradeExerciseSubmission): IInitialUserGradeExerciseSubmissionActionType {
    return { type: INITIAL_USER_GRADE_EXERCISE_SUBMISSION, user_grade_exercise_submission: user_grade_exercise_submission };
}

export function removeUserGradeExerciseSubmissionAll(): IRemoveUserGradeExerciseSubmissionAllActionType {
    return { type: REMOVE_USER_GRADE_EXERCISE_SUBMISSION_ALL };
}

export function addUserGradeExerciseSubmission(user_grade_exercise_submission: IUserGradeExerciseSubmission): IAddUserGradeExerciseSubmissionActionType {
    return { type: ADD_USER_GRADE_EXERCISE_SUBMISSION, user_grade_exercise_submission: user_grade_exercise_submission };
}

export function editUserGradeExerciseSubmission(user_grade_exercise_submission: IUserGradeExerciseSubmission): IEditUserGradeExerciseSubmissionActionType {
    return { type: EDIT_USER_GRADE_EXERCISE_SUBMISSION, user_grade_exercise_submission: user_grade_exercise_submission };
}

export function removeUserGradeExerciseSubmission(id: any): IRemoveUserGradeExerciseSubmissionActionType {
    return { type: REMOVE_USER_GRADE_EXERCISE_SUBMISSION, id: id };
}

export function changeSelectedUserGradeExerciseSubmission(user_grade_exercise_submission: IUserGradeExerciseSubmission): IChangeSelectedUserGradeExerciseSubmissionActionType {
    return { type: CHANGE_USER_GRADE_EXERCISE_SUBMISSION_PENDING_EDIT, user_grade_exercise_submission: user_grade_exercise_submission };
}

export function clearSelectedUserGradeExerciseSubmission(): IClearSelectedUserGradeExerciseSubmissionActionType {
    return { type: CLEAR_USER_GRADE_EXERCISE_SUBMISSION_PENDING_EDIT };
}

export function setModificationState(value: UserGradeExerciseSubmissionModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddUserGradeExerciseSubmissionActionType { type: string, user_grade_exercise_submission: IUserGradeExerciseSubmission };
interface IEditUserGradeExerciseSubmissionActionType { type: string, user_grade_exercise_submission: IUserGradeExerciseSubmission };
interface IRemoveUserGradeExerciseSubmissionActionType { type: string, id: any };
interface IChangeSelectedUserGradeExerciseSubmissionActionType { type: string, user_grade_exercise_submission: IUserGradeExerciseSubmission };
interface IClearSelectedUserGradeExerciseSubmissionActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  UserGradeExerciseSubmissionModificationStatus};
interface IRemoveUserGradeExerciseSubmissionAllActionType { type: string }
interface IInitialUserGradeExerciseSubmissionActionType {type: string, user_grade_exercise_submission: IUserGradeExerciseSubmission}
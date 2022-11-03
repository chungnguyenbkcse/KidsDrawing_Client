import { IContestSubmission, ContestSubmissionModificationStatus } from "../models/contest_submission.interface";

// register_successfull_contest_submissions
export const ADD_EXERCISE_SUBMISSION_NOT_GRADED: string = "ADD_EXERCISE_SUBMISSION_NOT_GRADED";
export const EDIT_EXERCISE_SUBMISSION_NOT_GRADED: string = "EDIT_EXERCISE_SUBMISSION_NOT_GRADED";
export const REMOVE_EXERCISE_SUBMISSION_NOT_GRADED: string = "REMOVE_EXERCISE_SUBMISSION_NOT_GRADED";
export const CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_AMOUNT: string = "CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_AMOUNT";
export const CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT: string = "CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT";
export const CLEAR_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT: string = "CLEAR_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT";
export const REMOVE_EXERCISE_SUBMISSION_NOT_GRADED_ALL: string = "REMOVE_EXERCISE_SUBMISSION_NOT_GRADED_ALL";
export const INITIAL_EXERCISE_SUBMISSION_NOT_GRADED: string = "INITIAL_EXERCISE_SUBMISSION_NOT_GRADED";

// not_register_contest_submissions
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

export function fetchDataSuccess(contest_submission: IContestSubmission) {
    return {
        type: FETCH_DATA_SUCCESS,
        contest_submission
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialContestNotGraded(contest_submission: IContestSubmission): IInitialContestNotGradedActionType {
    return { type: INITIAL_EXERCISE_SUBMISSION_NOT_GRADED, contest_submission: contest_submission };
}

export function removeContestNotGradedAll(): IRemoveContestNotGradedAllActionType {
    return { type: REMOVE_EXERCISE_SUBMISSION_NOT_GRADED_ALL };
}

export function addContestNotGraded(contest_submission: IContestSubmission): IAddContestNotGradedActionType {
    return { type: ADD_EXERCISE_SUBMISSION_NOT_GRADED, contest_submission: contest_submission };
}

export function editContestNotGraded(contest_submission: IContestSubmission): IEditContestNotGradedActionType {
    return { type: EDIT_EXERCISE_SUBMISSION_NOT_GRADED, contest_submission: contest_submission };
}

export function removeContestNotGraded(id: any): IRemoveContestNotGradedActionType {
    return { type: REMOVE_EXERCISE_SUBMISSION_NOT_GRADED, id: id };
}

export function changeSelectedContestNotGraded(contest_submission: IContestSubmission): IChangeSelectedContestNotGradedActionType {
    return { type: CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT, contest_submission: contest_submission };
}

export function clearSelectedContestNotGraded(): IClearSelectedContestNotGradedActionType {
    return { type: CLEAR_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT };
}


export function initialContestGraded(contest_submission: IContestSubmission): IInitialContestGradedActionType {
    return { type: INITIAL_EXERCISE_SUBMISSION_GRADED, contest_submission: contest_submission };
}

export function removeContestGradedAll(): IRemoveContestGradedAllActionType {
    return { type: REMOVE_EXERCISE_SUBMISSION_GRADED_ALL };
}

export function addContestGraded(contest_submission: IContestSubmission): IAddContestGradedActionType {
    return { type: ADD_EXERCISE_SUBMISSION_GRADED, contest_submission: contest_submission };
}

export function editContestGraded(contest_submission: IContestSubmission): IEditContestGradedActionType {
    return { type: EDIT_EXERCISE_SUBMISSION_GRADED, contest_submission: contest_submission };
}

export function removeContestGraded(id: any): IRemoveContestGradedActionType {
    return { type: REMOVE_EXERCISE_SUBMISSION_GRADED, id: id };
}

export function changeSelectedContestGraded(contest_submission: IContestSubmission): IChangeSelectedContestGradedActionType {
    return { type: CHANGE_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT, contest_submission: contest_submission };
}

export function clearSelectedContestGraded(): IClearSelectedContestGradedActionType {
    return { type: CLEAR_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT };
}

export function setModificationState(value: ContestSubmissionModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_contest_submissions
interface IAddContestNotGradedActionType { type: string, contest_submission: IContestSubmission };
interface IEditContestNotGradedActionType { type: string, contest_submission: IContestSubmission };
interface IRemoveContestNotGradedActionType { type: string, id: any };
interface IChangeSelectedContestNotGradedActionType { type: string, contest_submission: IContestSubmission };
interface IClearSelectedContestNotGradedActionType { type: string };
interface IRemoveContestNotGradedAllActionType { type: string }
interface IInitialContestNotGradedActionType {type: string, contest_submission: IContestSubmission}

// not_register_contest_submissions
interface IAddContestGradedActionType { type: string, contest_submission: IContestSubmission };
interface IEditContestGradedActionType { type: string, contest_submission: IContestSubmission };
interface IRemoveContestGradedActionType { type: string, id: any };
interface IChangeSelectedContestGradedActionType { type: string, contest_submission: IContestSubmission };
interface IClearSelectedContestGradedActionType { type: string };
interface IRemoveContestGradedAllActionType { type: string }
interface IInitialContestGradedActionType {type: string, contest_submission: IContestSubmission}



interface ISetModificationStateActionType { type: string, value:  ContestSubmissionModificationStatus};
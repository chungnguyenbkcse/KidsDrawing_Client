import { IUserGradeContestSubmission, UserGradeContestSubmissionModificationStatus } from "../models/user_grade_contest_submission.interface";
export const ADD_USER_GRADE_CONTEST_SUBMISSION: string = "ADD_USER_GRADE_CONTEST_SUBMISSION";
export const EDIT_USER_GRADE_CONTEST_SUBMISSION: string = "EDIT_USER_GRADE_CONTEST_SUBMISSION";
export const REMOVE_USER_GRADE_CONTEST_SUBMISSION: string = "REMOVE_USER_GRADE_CONTEST_SUBMISSION";
export const CHANGE_USER_GRADE_CONTEST_SUBMISSION_AMOUNT: string = "CHANGE_USER_GRADE_CONTEST_SUBMISSION_AMOUNT";
export const CHANGE_USER_GRADE_CONTEST_SUBMISSION_PENDING_EDIT: string = "CHANGE_USER_GRADE_CONTEST_SUBMISSION_PENDING_EDIT";
export const CLEAR_USER_GRADE_CONTEST_SUBMISSION_PENDING_EDIT: string = "CLEAR_USER_GRADE_CONTEST_SUBMISSION_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_USER_GRADE_CONTEST_SUBMISSION_ALL: string = "REMOVE_USER_GRADE_CONTEST_SUBMISSION_ALL";
export const INITIAL_USER_GRADE_CONTEST_SUBMISSION: string = "INITIAL_USER_GRADE_CONTEST_SUBMISSION";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(user_grade_contest_submission: IUserGradeContestSubmission) {
    return {
        type: FETCH_DATA_SUCCESS,
        user_grade_contest_submission
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialUserGradeContestSubmission(user_grade_contest_submission: IUserGradeContestSubmission): IInitialUserGradeContestSubmissionActionType {
    return { type: INITIAL_USER_GRADE_CONTEST_SUBMISSION, user_grade_contest_submission: user_grade_contest_submission };
}

export function removeUserGradeContestSubmissionAll(): IRemoveUserGradeContestSubmissionAllActionType {
    return { type: REMOVE_USER_GRADE_CONTEST_SUBMISSION_ALL };
}

export function addUserGradeContestSubmission(user_grade_contest_submission: IUserGradeContestSubmission): IAddUserGradeContestSubmissionActionType {
    return { type: ADD_USER_GRADE_CONTEST_SUBMISSION, user_grade_contest_submission: user_grade_contest_submission };
}

export function editUserGradeContestSubmission(user_grade_contest_submission: IUserGradeContestSubmission): IEditUserGradeContestSubmissionActionType {
    return { type: EDIT_USER_GRADE_CONTEST_SUBMISSION, user_grade_contest_submission: user_grade_contest_submission };
}

export function removeUserGradeContestSubmission(id: string): IRemoveUserGradeContestSubmissionActionType {
    return { type: REMOVE_USER_GRADE_CONTEST_SUBMISSION, id: id };
}

export function changeSelectedUserGradeContestSubmission(user_grade_contest_submission: IUserGradeContestSubmission): IChangeSelectedUserGradeContestSubmissionActionType {
    return { type: CHANGE_USER_GRADE_CONTEST_SUBMISSION_PENDING_EDIT, user_grade_contest_submission: user_grade_contest_submission };
}

export function clearSelectedUserGradeContestSubmission(): IClearSelectedUserGradeContestSubmissionActionType {
    return { type: CLEAR_USER_GRADE_CONTEST_SUBMISSION_PENDING_EDIT };
}

export function setModificationStateUserGradeContestSubmission(value: UserGradeContestSubmissionModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddUserGradeContestSubmissionActionType { type: string, user_grade_contest_submission: IUserGradeContestSubmission };
interface IEditUserGradeContestSubmissionActionType { type: string, user_grade_contest_submission: IUserGradeContestSubmission };
interface IRemoveUserGradeContestSubmissionActionType { type: string, id: string };
interface IChangeSelectedUserGradeContestSubmissionActionType { type: string, user_grade_contest_submission: IUserGradeContestSubmission };
interface IClearSelectedUserGradeContestSubmissionActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  UserGradeContestSubmissionModificationStatus};
interface IRemoveUserGradeContestSubmissionAllActionType { type: string }
interface IInitialUserGradeContestSubmissionActionType {type: string, user_grade_contest_submission: IUserGradeContestSubmission}
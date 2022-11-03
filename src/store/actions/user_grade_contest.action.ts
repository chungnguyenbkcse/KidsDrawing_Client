import { IUserGradeContest, UserGradeContestModificationStatus } from "../models/user_grade_contest.interface";
export const ADD_TUTORIAL_TEMPLATE: string = "ADD_TUTORIAL_TEMPLATE";
export const EDIT_TUTORIAL_TEMPLATE: string = "EDIT_TUTORIAL_TEMPLATE";
export const REMOVE_TUTORIAL_TEMPLATE: string = "REMOVE_TUTORIAL_TEMPLATE";
export const CHANGE_TUTORIAL_TEMPLATE_AMOUNT: string = "CHANGE_TUTORIAL_TEMPLATE_AMOUNT";
export const CHANGE_TUTORIAL_TEMPLATE_PENDING_EDIT: string = "CHANGE_TUTORIAL_TEMPLATE_PENDING_EDIT";
export const CLEAR_TUTORIAL_TEMPLATE_PENDING_EDIT: string = "CLEAR_TUTORIAL_TEMPLATE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_TUTORIAL_TEMPLATE_ALL: string = "REMOVE_TUTORIAL_TEMPLATE_ALL";
export const INITIAL_TUTORIAL_TEMPLATE: string = "INITIAL_TUTORIAL_TEMPLATE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(user_grade_contest: IUserGradeContest) {
    return {
        type: FETCH_DATA_SUCCESS,
        user_grade_contest
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialUserGradeContest(user_grade_contest: IUserGradeContest): IInitialUserGradeContestActionType {
    return { type: INITIAL_TUTORIAL_TEMPLATE, user_grade_contest: user_grade_contest };
}

export function removeUserGradeContestAll(): IRemoveUserGradeContestAllActionType {
    return { type: REMOVE_TUTORIAL_TEMPLATE_ALL };
}

export function addUserGradeContest(user_grade_contest: IUserGradeContest): IAddUserGradeContestActionType {
    return { type: ADD_TUTORIAL_TEMPLATE, user_grade_contest: user_grade_contest };
}

export function editUserGradeContest(user_grade_contest: IUserGradeContest): IEditUserGradeContestActionType {
    return { type: EDIT_TUTORIAL_TEMPLATE, user_grade_contest: user_grade_contest };
}

export function removeUserGradeContest(id: any): IRemoveUserGradeContestActionType {
    return { type: REMOVE_TUTORIAL_TEMPLATE, id: id };
}

export function changeSelectedUserGradeContest(user_grade_contest: IUserGradeContest): IChangeSelectedUserGradeContestActionType {
    return { type: CHANGE_TUTORIAL_TEMPLATE_PENDING_EDIT, user_grade_contest: user_grade_contest };
}

export function clearSelectedUserGradeContest(): IClearSelectedUserGradeContestActionType {
    return { type: CLEAR_TUTORIAL_TEMPLATE_PENDING_EDIT };
}

export function setModificationStateUserGradeContest(value: UserGradeContestModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddUserGradeContestActionType { type: string, user_grade_contest: IUserGradeContest };
interface IEditUserGradeContestActionType { type: string, user_grade_contest: IUserGradeContest };
interface IRemoveUserGradeContestActionType { type: string, id: any };
interface IChangeSelectedUserGradeContestActionType { type: string, user_grade_contest: IUserGradeContest };
interface IClearSelectedUserGradeContestActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  UserGradeContestModificationStatus};
interface IRemoveUserGradeContestAllActionType { type: string }
interface IInitialUserGradeContestActionType {type: string, user_grade_contest: IUserGradeContest}
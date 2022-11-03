import { IContest, ContestModificationStatus } from "../models/contest.interface";
export const ADD_CONTEST: string = "ADD_CONTEST";
export const EDIT_CONTEST: string = "EDIT_CONTEST";
export const REMOVE_CONTEST: string = "REMOVE_CONTEST";
export const CHANGE_CONTEST_AMOUNT: string = "CHANGE_CONTEST_AMOUNT";
export const CHANGE_CONTEST_PENDING_EDIT: string = "CHANGE_CONTEST_PENDING_EDIT";
export const CLEAR_CONTEST_PENDING_EDIT: string = "CLEAR_CONTEST_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_CONTEST_ALL: string = "REMOVE_CONTEST_ALL";
export const INITIAL_CONTEST: string = "INITIAL_CONTEST";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(contest: IContest) {
    return {
        type: FETCH_DATA_SUCCESS,
        contest
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialContest(contest: IContest): IInitialContestActionType {
    return { type: INITIAL_CONTEST, contest: contest };
}

export function removeContestAll(): IRemoveContestAllActionType {
    return { type: REMOVE_CONTEST_ALL };
}

export function addContest(contest: IContest): IAddContestActionType {
    return { type: ADD_CONTEST, contest: contest };
}

export function editContest(contest: IContest): IEditContestActionType {
    return { type: EDIT_CONTEST, contest: contest };
}

export function removeContest(id: any): IRemoveContestActionType {
    return { type: REMOVE_CONTEST, id: id };
}

export function changeSelectedContest(contest: IContest): IChangeSelectedContestActionType {
    return { type: CHANGE_CONTEST_PENDING_EDIT, contest: contest };
}

export function clearSelectedContest(): IClearSelectedContestActionType {
    return { type: CLEAR_CONTEST_PENDING_EDIT };
}

export function setModificationState(value: ContestModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddContestActionType { type: string, contest: IContest };
interface IEditContestActionType { type: string, contest: IContest };
interface IRemoveContestActionType { type: string, id: any };
interface IChangeSelectedContestActionType { type: string, contest: IContest };
interface IClearSelectedContestActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ContestModificationStatus};
interface IRemoveContestAllActionType { type: string }
interface IInitialContestActionType {type: string, contest: IContest}
import { IContest, ContestModificationStatus } from "../models/contest.interface";

// contest_opening
export const ADD_CONTEST_OPENING: string = "ADD_CONTEST_OPENING";
export const EDIT_CONTEST_OPENING: string = "EDIT_CONTEST_OPENING";
export const REMOVE_CONTEST_OPENING: string = "REMOVE_CONTEST_OPENING";
export const CHANGE_CONTEST_OPENING_AMOUNT: string = "CHANGE_CONTEST_OPENING_AMOUNT";
export const CHANGE_CONTEST_OPENING_PENDING_EDIT: string = "CHANGE_CONTEST_OPENING_PENDING_EDIT";
export const CLEAR_CONTEST_OPENING_PENDING_EDIT: string = "CLEAR_CONTEST_OPENING_PENDING_EDIT";
export const REMOVE_CONTEST_OPENING_ALL: string = "REMOVE_CONTEST_OPENING_ALL";
export const INITIAL_CONTEST_OPENING: string = "INITIAL_CONTEST_OPENING";

// contest_end
export const ADD_CONTEST_END: string = "ADD_CONTEST_END";
export const EDIT_CONTEST_END: string = "EDIT_CONTEST_END";
export const REMOVE_CONTEST_END: string = "REMOVE_CONTEST_END";
export const CHANGE_CONTEST_END_AMOUNT: string = "CHANGE_CONTEST_END_AMOUNT";
export const CHANGE_CONTEST_END_PENDING_EDIT: string = "CHANGE_CONTEST_END_PENDING_EDIT";
export const CLEAR_CONTEST_END_PENDING_EDIT: string = "CLEAR_CONTEST_END_PENDING_EDIT";
export const REMOVE_CONTEST_END_ALL: string = "REMOVE_CONTEST_END_ALL";
export const INITIAL_CONTEST_END: string = "INITIAL_CONTEST_END";

//contest_not_open_now
export const ADD_CONTEST_NOT_OPEN_NOW: string = "ADD_CONTEST_NOT_OPEN_NOW";
export const EDIT_CONTEST_NOT_OPEN_NOW: string = "EDIT_CONTEST_NOT_OPEN_NOW";
export const REMOVE_CONTEST_NOT_OPEN_NOW: string = "REMOVE_CONTEST_NOT_OPEN_NOW";
export const CHANGE_CONTEST_NOT_OPEN_NOW_AMOUNT: string = "CHANGE_CONTEST_NOT_OPEN_NOW_AMOUNT";
export const CHANGE_CONTEST_NOT_OPEN_NOW_PENDING_EDIT: string = "CHANGE_CONTEST_NOT_OPEN_NOW_PENDING_EDIT";
export const CLEAR_CONTEST_NOT_OPEN_NOW_PENDING_EDIT: string = "CLEAR_CONTEST_NOT_OPEN_NOW_PENDING_EDIT";
export const REMOVE_CONTEST_NOT_OPEN_NOW_ALL: string = "REMOVE_CONTEST_NOT_OPEN_NOW_ALL";
export const INITIAL_CONTEST_NOT_OPEN_NOW: string = "INITIAL_CONTEST_NOT_OPEN_NOW";

export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

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

// Opening
export function initialContestOpening(contest: IContest): IInitialContestOpeningActionType {
    return { type: INITIAL_CONTEST_OPENING, contest: contest };
}

export function removeContestOpeningAll(): IRemoveContestOpeningAllActionType {
    return { type: REMOVE_CONTEST_OPENING_ALL };
}

export function addContestOpening(contest: IContest): IAddContestOpeningActionType {
    return { type: ADD_CONTEST_OPENING, contest: contest };
}

export function editContestOpening(contest: IContest): IEditContestOpeningActionType {
    return { type: EDIT_CONTEST_OPENING, contest: contest };
}

export function removeContestOpening(id: any): IRemoveContestOpeningActionType {
    return { type: REMOVE_CONTEST_OPENING, id: id };
}

export function changeSelectedContestOpening(contest: IContest): IChangeSelectedContestOpeningActionType {
    return { type: CHANGE_CONTEST_OPENING_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestOpening(): IClearSelectedContestOpeningActionType {
    return { type: CLEAR_CONTEST_OPENING_PENDING_EDIT };
}


// End
export function initialContestEnd(contest: IContest): IInitialContestEndActionType {
    return { type: INITIAL_CONTEST_END, contest: contest };
}

export function removeContestEndAll(): IRemoveContestEndAllActionType {
    return { type: REMOVE_CONTEST_END_ALL };
}

export function addContestEnd(contest: IContest): IAddContestEndActionType {
    return { type: ADD_CONTEST_END, contest: contest };
}

export function editContestEnd(contest: IContest): IEditContestEndActionType {
    return { type: EDIT_CONTEST_END, contest: contest };
}

export function removeContestEnd(id: any): IRemoveContestEndActionType {
    return { type: REMOVE_CONTEST_END, id: id };
}

export function changeSelectedContestEnd(contest: IContest): IChangeSelectedContestEndActionType {
    return { type: CHANGE_CONTEST_END_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestEnd(): IClearSelectedContestEndActionType {
    return { type: CLEAR_CONTEST_END_PENDING_EDIT };
}

// Not open now
export function initialContestNotOpenNow(contest: IContest): IInitialContestNotOpenNowActionType {
    return { type: INITIAL_CONTEST_NOT_OPEN_NOW, contest: contest };
}

export function removeContestNotOpenNowAll(): IRemoveContestNotOpenNowAllActionType {
    return { type: REMOVE_CONTEST_NOT_OPEN_NOW_ALL };
}

export function addContestNotOpenNow(contest: IContest): IAddContestNotOpenNowActionType {
    return { type: ADD_CONTEST_NOT_OPEN_NOW, contest: contest };
}

export function editContestNotOpenNow(contest: IContest): IEditContestNotOpenNowActionType {
    return { type: EDIT_CONTEST_NOT_OPEN_NOW, contest: contest };
}

export function removeContestNotOpenNow(id: any): IRemoveContestNotOpenNowActionType {
    return { type: REMOVE_CONTEST_NOT_OPEN_NOW, id: id };
}

export function changeSelectedContestNotOpenNow(contest: IContest): IChangeSelectedContestNotOpenNowActionType {
    return { type: CHANGE_CONTEST_NOT_OPEN_NOW_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestNotOpenNow(): IClearSelectedContestNotOpenNowActionType {
    return { type: CLEAR_CONTEST_NOT_OPEN_NOW_PENDING_EDIT };
}


export function setModificationState(value: ContestModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_contests
interface IAddContestOpeningActionType { type: string, contest: IContest };
interface IEditContestOpeningActionType { type: string, contest: IContest };
interface IRemoveContestOpeningActionType { type: string, id: any };
interface IChangeSelectedContestOpeningActionType { type: string, contest: IContest };
interface IClearSelectedContestOpeningActionType { type: string };
interface IRemoveContestOpeningAllActionType { type: string }
interface IInitialContestOpeningActionType {type: string, contest: IContest}


// not_register_contests
interface IAddContestEndActionType { type: string, contest: IContest };
interface IEditContestEndActionType { type: string, contest: IContest };
interface IRemoveContestEndActionType { type: string, id: any };
interface IChangeSelectedContestEndActionType { type: string, contest: IContest };
interface IClearSelectedContestEndActionType { type: string };
interface IRemoveContestEndAllActionType { type: string }
interface IInitialContestEndActionType {type: string, contest: IContest}

// not_register_contests
interface IAddContestNotOpenNowActionType { type: string, contest: IContest };
interface IEditContestNotOpenNowActionType { type: string, contest: IContest };
interface IRemoveContestNotOpenNowActionType { type: string, id: any };
interface IChangeSelectedContestNotOpenNowActionType { type: string, contest: IContest };
interface IClearSelectedContestNotOpenNowActionType { type: string };
interface IRemoveContestNotOpenNowAllActionType { type: string }
interface IInitialContestNotOpenNowActionType {type: string, contest: IContest}



interface ISetModificationStateActionType { type: string, value:  ContestModificationStatus};
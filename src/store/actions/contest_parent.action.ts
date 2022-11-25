import { IContestParent, ContestParentModificationStatus } from "../models/contest_parent.interface";

// contest_opening
export const ADD_CONTEST_PARENT_OPENING: string = "ADD_CONTEST_PARENT_OPENING";
export const EDIT_CONTEST_PARENT_OPENING: string = "EDIT_CONTEST_PARENT_OPENING";
export const REMOVE_CONTEST_PARENT_OPENING: string = "REMOVE_CONTEST_PARENT_OPENING";
export const CHANGE_CONTEST_PARENT_OPENING_AMOUNT: string = "CHANGE_CONTEST_PARENT_OPENING_AMOUNT";
export const CHANGE_CONTEST_PARENT_OPENING_PENDING_EDIT: string = "CHANGE_CONTEST_PARENT_OPENING_PENDING_EDIT";
export const CLEAR_CONTEST_PARENT_OPENING_PENDING_EDIT: string = "CLEAR_CONTEST_PARENT_OPENING_PENDING_EDIT";
export const REMOVE_CONTEST_PARENT_OPENING_ALL: string = "REMOVE_CONTEST_PARENT_OPENING_ALL";
export const INITIAL_CONTEST_PARENT_OPENING: string = "INITIAL_CONTEST_PARENT_OPENING";

// contest_not_open_now_not_parent
export const ADD_CONTEST_PARENT_NEW: string = "ADD_CONTEST_PARENT_NEW";
export const EDIT_CONTEST_PARENT_NEW: string = "EDIT_CONTEST_PARENT_NEW";
export const REMOVE_CONTEST_PARENT_NEW: string = "REMOVE_CONTEST_PARENT_NEW";
export const CHANGE_CONTEST_PARENT_NEW_AMOUNT: string = "CHANGE_CONTEST_PARENT_NEW_AMOUNT";
export const CHANGE_CONTEST_PARENT_NEW_PENDING_EDIT: string = "CHANGE_CONTEST_PARENT_NEW_PENDING_EDIT";
export const CLEAR_CONTEST_PARENT_NEW_PENDING_EDIT: string = "CLEAR_CONTEST_PARENT_NEW_PENDING_EDIT";
export const REMOVE_CONTEST_PARENT_NEW_ALL: string = "REMOVE_CONTEST_PARENT_NEW_ALL";
export const INITIAL_CONTEST_PARENT_NEW: string = "INITIAL_CONTEST_PARENT_NEW";

// contest_end
export const ADD_CONTEST_PARENT_END: string = "ADD_CONTEST_PARENT_END";
export const EDIT_CONTEST_PARENT_END: string = "EDIT_CONTEST_PARENT_END";
export const REMOVE_CONTEST_PARENT_END: string = "REMOVE_CONTEST_PARENT_END";
export const CHANGE_CONTEST_PARENT_END_AMOUNT: string = "CHANGE_CONTEST_PARENT_END_AMOUNT";
export const CHANGE_CONTEST_PARENT_END_PENDING_EDIT: string = "CHANGE_CONTEST_PARENT_END_PENDING_EDIT";
export const CLEAR_CONTEST_PARENT_END_PENDING_EDIT: string = "CLEAR_CONTEST_PARENT_END_PENDING_EDIT";
export const REMOVE_CONTEST_PARENT_END_ALL: string = "REMOVE_CONTEST_PARENT_END_ALL";
export const INITIAL_CONTEST_PARENT_END: string = "INITIAL_CONTEST_PARENT_END";

//contest_not_open_now
export const ADD_CONTEST_PARENT_NOT_OPEN_NOW: string = "ADD_CONTEST_PARENT_NOT_OPEN_NOW";
export const EDIT_CONTEST_PARENT_NOT_OPEN_NOW: string = "EDIT_CONTEST_PARENT_NOT_OPEN_NOW";
export const REMOVE_CONTEST_PARENT_NOT_OPEN_NOW: string = "REMOVE_CONTEST_PARENT_NOT_OPEN_NOW";
export const CHANGE_CONTEST_PARENT_NOT_OPEN_NOW_AMOUNT: string = "CHANGE_CONTEST_PARENT_NOT_OPEN_NOW_AMOUNT";
export const CHANGE_CONTEST_PARENT_NOT_OPEN_NOW_PENDING_EDIT: string = "CHANGE_CONTEST_PARENT_NOT_OPEN_NOW_PENDING_EDIT";
export const CLEAR_CONTEST_PARENT_NOT_OPEN_NOW_PENDING_EDIT: string = "CLEAR_CONTEST_PARENT_NOT_OPEN_NOW_PENDING_EDIT";
export const REMOVE_CONTEST_PARENT_NOT_OPEN_NOW_ALL: string = "REMOVE_CONTEST_PARENT_NOT_OPEN_NOW_ALL";
export const INITIAL_CONTEST_PARENT_NOT_OPEN_NOW: string = "INITIAL_CONTEST_PARENT_NOT_OPEN_NOW";

export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(contest: IContestParent) {
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
export function initialContestParentOpening(contest: IContestParent): IInitialContestParentOpeningActionType {
    return { type: INITIAL_CONTEST_PARENT_OPENING, contest: contest };
}

export function removeContestParentOpeningAll(): IRemoveContestParentOpeningAllActionType {
    return { type: REMOVE_CONTEST_PARENT_OPENING_ALL };
}

export function addContestParentOpening(contest: IContestParent): IAddContestParentOpeningActionType {
    return { type: ADD_CONTEST_PARENT_OPENING, contest: contest };
}

export function editContestParentOpening(contest: IContestParent): IEditContestParentOpeningActionType {
    return { type: EDIT_CONTEST_PARENT_OPENING, contest: contest };
}

export function removeContestParentOpening(id: any): IRemoveContestParentOpeningActionType {
    return { type: REMOVE_CONTEST_PARENT_OPENING, id: id };
}

export function changeSelectedContestParentOpening(contest: IContestParent): IChangeSelectedContestParentOpeningActionType {
    return { type: CHANGE_CONTEST_PARENT_OPENING_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestParentOpening(): IClearSelectedContestParentOpeningActionType {
    return { type: CLEAR_CONTEST_PARENT_OPENING_PENDING_EDIT };
}

// Not open not parent
export function initialContestParentNew(contest: IContestParent): IInitialContestParentNewActionType {
    return { type: INITIAL_CONTEST_PARENT_NEW, contest: contest };
}

export function removeContestParentNewAll(): IRemoveContestParentNewAllActionType {
    return { type: REMOVE_CONTEST_PARENT_NEW_ALL };
}

export function addContestParentNew(contest: IContestParent): IAddContestParentNewActionType {
    return { type: ADD_CONTEST_PARENT_NEW, contest: contest };
}

export function editContestParentNew(contest: IContestParent): IEditContestParentNewActionType {
    return { type: EDIT_CONTEST_PARENT_NEW, contest: contest };
}

export function removeContestParentNew(id: any): IRemoveContestParentNewActionType {
    return { type: REMOVE_CONTEST_PARENT_NEW, id: id };
}

export function changeSelectedContestNew(contest: IContestParent): IChangeSelectedContestParentNewActionType {
    return { type: CHANGE_CONTEST_PARENT_NEW_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestParentNew(): IClearSelectedContestParentNewActionType {
    return { type: CLEAR_CONTEST_PARENT_NEW_PENDING_EDIT };
}

// End
export function initialContestParentEnd(contest: IContestParent): IInitialContestParentEndActionType {
    return { type: INITIAL_CONTEST_PARENT_END, contest: contest };
}

export function removeContestParentEndAll(): IRemoveContestParentEndAllActionType {
    return { type: REMOVE_CONTEST_PARENT_END_ALL };
}

export function addContestParentEnd(contest: IContestParent): IAddContestParentEndActionType {
    return { type: ADD_CONTEST_PARENT_END, contest: contest };
}

export function editContestParentEnd(contest: IContestParent): IEditContestParentEndActionType {
    return { type: EDIT_CONTEST_PARENT_END, contest: contest };
}

export function removeContestParentEnd(id: any): IRemoveContestParentEndActionType {
    return { type: REMOVE_CONTEST_PARENT_END, id: id };
}

export function changeSelectedContestParentEnd(contest: IContestParent): IChangeSelectedContestParentEndActionType {
    return { type: CHANGE_CONTEST_PARENT_END_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestParentEnd(): IClearSelectedContestParentEndActionType {
    return { type: CLEAR_CONTEST_PARENT_END_PENDING_EDIT };
}

// Not open now
export function initialContestParentNotOpenNow(contest: IContestParent): IInitialContestParentNotOpenNowActionType {
    return { type: INITIAL_CONTEST_PARENT_NOT_OPEN_NOW, contest: contest };
}

export function removeContestParentNotOpenNowAll(): IRemoveContestParentNotOpenNowAllActionType {
    return { type: REMOVE_CONTEST_PARENT_NOT_OPEN_NOW_ALL };
}

export function addContestParentNotOpenNow(contest: IContestParent): IAddContestParentNotOpenNowActionType {
    return { type: ADD_CONTEST_PARENT_NOT_OPEN_NOW, contest: contest };
}

export function editContestParentNotOpenNow(contest: IContestParent): IEditContestParentNotOpenNowActionType {
    return { type: EDIT_CONTEST_PARENT_NOT_OPEN_NOW, contest: contest };
}

export function removeContestParentNotOpenNow(id: any): IRemoveContestParentNotOpenNowActionType {
    return { type: REMOVE_CONTEST_PARENT_NOT_OPEN_NOW, id: id };
}

export function changeSelectedContestParentNotOpenNow(contest: IContestParent): IChangeSelectedContestParentNotOpenNowActionType {
    return { type: CHANGE_CONTEST_PARENT_NOT_OPEN_NOW_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestParentNotOpenNow(): IClearSelectedContestParentNotOpenNowActionType {
    return { type: CLEAR_CONTEST_PARENT_NOT_OPEN_NOW_PENDING_EDIT };
}


export function setModificationState(value: ContestParentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_contests
interface IAddContestParentOpeningActionType { type: string, contest: IContestParent };
interface IEditContestParentOpeningActionType { type: string, contest: IContestParent };
interface IRemoveContestParentOpeningActionType { type: string, id: any };
interface IChangeSelectedContestParentOpeningActionType { type: string, contest: IContestParent };
interface IClearSelectedContestParentOpeningActionType { type: string };
interface IRemoveContestParentOpeningAllActionType { type: string }
interface IInitialContestParentOpeningActionType {type: string, contest: IContestParent}

// not_register_contests
interface IAddContestParentNewActionType { type: string, contest: IContestParent };
interface IEditContestParentNewActionType { type: string, contest: IContestParent };
interface IRemoveContestParentNewActionType { type: string, id: any };
interface IChangeSelectedContestParentNewActionType { type: string, contest: IContestParent };
interface IClearSelectedContestParentNewActionType { type: string };
interface IRemoveContestParentNewAllActionType { type: string }
interface IInitialContestParentNewActionType {type: string, contest: IContestParent}

// not_register_contests
interface IAddContestParentEndActionType { type: string, contest: IContestParent };
interface IEditContestParentEndActionType { type: string, contest: IContestParent };
interface IRemoveContestParentEndActionType { type: string, id: any };
interface IChangeSelectedContestParentEndActionType { type: string, contest: IContestParent };
interface IClearSelectedContestParentEndActionType { type: string };
interface IRemoveContestParentEndAllActionType { type: string }
interface IInitialContestParentEndActionType {type: string, contest: IContestParent}

// not_register_contests
interface IAddContestParentNotOpenNowActionType { type: string, contest: IContestParent };
interface IEditContestParentNotOpenNowActionType { type: string, contest: IContestParent };
interface IRemoveContestParentNotOpenNowActionType { type: string, id: any };
interface IChangeSelectedContestParentNotOpenNowActionType { type: string, contest: IContestParent };
interface IClearSelectedContestParentNotOpenNowActionType { type: string };
interface IRemoveContestParentNotOpenNowAllActionType { type: string }
interface IInitialContestParentNotOpenNowActionType {type: string, contest: IContestParent}



interface ISetModificationStateActionType { type: string, value:  ContestParentModificationStatus};
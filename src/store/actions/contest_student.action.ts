import { IContestStudent, ContestStudentModificationStatus } from "../models/contest_student.interface";

// contest_opening
export const ADD_CONTEST_STUDENT_OPENING: string = "ADD_CONTEST_STUDENT_OPENING";
export const EDIT_CONTEST_STUDENT_OPENING: string = "EDIT_CONTEST_STUDENT_OPENING";
export const REMOVE_CONTEST_STUDENT_OPENING: string = "REMOVE_CONTEST_STUDENT_OPENING";
export const CHANGE_CONTEST_STUDENT_OPENING_AMOUNT: string = "CHANGE_CONTEST_STUDENT_OPENING_AMOUNT";
export const CHANGE_CONTEST_STUDENT_OPENING_PENDING_EDIT: string = "CHANGE_CONTEST_STUDENT_OPENING_PENDING_EDIT";
export const CLEAR_CONTEST_STUDENT_OPENING_PENDING_EDIT: string = "CLEAR_CONTEST_STUDENT_OPENING_PENDING_EDIT";
export const REMOVE_CONTEST_STUDENT_OPENING_ALL: string = "REMOVE_CONTEST_STUDENT_OPENING_ALL";
export const INITIAL_CONTEST_STUDENT_OPENING: string = "INITIAL_CONTEST_STUDENT_OPENING";

// contest_not_open_now_not_student
export const ADD_CONTEST_STUDENT_NEW: string = "ADD_CONTEST_STUDENT_NEW";
export const EDIT_CONTEST_STUDENT_NEW: string = "EDIT_CONTEST_STUDENT_NEW";
export const REMOVE_CONTEST_STUDENT_NEW: string = "REMOVE_CONTEST_STUDENT_NEW";
export const CHANGE_CONTEST_STUDENT_NEW_AMOUNT: string = "CHANGE_CONTEST_STUDENT_NEW_AMOUNT";
export const CHANGE_CONTEST_STUDENT_NEW_PENDING_EDIT: string = "CHANGE_CONTEST_STUDENT_NEW_PENDING_EDIT";
export const CLEAR_CONTEST_STUDENT_NEW_PENDING_EDIT: string = "CLEAR_CONTEST_STUDENT_NEW_PENDING_EDIT";
export const REMOVE_CONTEST_STUDENT_NEW_ALL: string = "REMOVE_CONTEST_STUDENT_NEW_ALL";
export const INITIAL_CONTEST_STUDENT_NEW: string = "INITIAL_CONTEST_STUDENT_NEW";

// contest_end
export const ADD_CONTEST_STUDENT_END: string = "ADD_CONTEST_STUDENT_END";
export const EDIT_CONTEST_STUDENT_END: string = "EDIT_CONTEST_STUDENT_END";
export const REMOVE_CONTEST_STUDENT_END: string = "REMOVE_CONTEST_STUDENT_END";
export const CHANGE_CONTEST_STUDENT_END_AMOUNT: string = "CHANGE_CONTEST_STUDENT_END_AMOUNT";
export const CHANGE_CONTEST_STUDENT_END_PENDING_EDIT: string = "CHANGE_CONTEST_STUDENT_END_PENDING_EDIT";
export const CLEAR_CONTEST_STUDENT_END_PENDING_EDIT: string = "CLEAR_CONTEST_STUDENT_END_PENDING_EDIT";
export const REMOVE_CONTEST_STUDENT_END_ALL: string = "REMOVE_CONTEST_STUDENT_END_ALL";
export const INITIAL_CONTEST_STUDENT_END: string = "INITIAL_CONTEST_STUDENT_END";

//contest_not_open_now
export const ADD_CONTEST_STUDENT_NOT_OPEN_NOW: string = "ADD_CONTEST_STUDENT_NOT_OPEN_NOW";
export const EDIT_CONTEST_STUDENT_NOT_OPEN_NOW: string = "EDIT_CONTEST_STUDENT_NOT_OPEN_NOW";
export const REMOVE_CONTEST_STUDENT_NOT_OPEN_NOW: string = "REMOVE_CONTEST_STUDENT_NOT_OPEN_NOW";
export const CHANGE_CONTEST_STUDENT_NOT_OPEN_NOW_AMOUNT: string = "CHANGE_CONTEST_STUDENT_NOT_OPEN_NOW_AMOUNT";
export const CHANGE_CONTEST_STUDENT_NOT_OPEN_NOW_PENDING_EDIT: string = "CHANGE_CONTEST_STUDENT_NOT_OPEN_NOW_PENDING_EDIT";
export const CLEAR_CONTEST_STUDENT_NOT_OPEN_NOW_PENDING_EDIT: string = "CLEAR_CONTEST_STUDENT_NOT_OPEN_NOW_PENDING_EDIT";
export const REMOVE_CONTEST_STUDENT_NOT_OPEN_NOW_ALL: string = "REMOVE_CONTEST_STUDENT_NOT_OPEN_NOW_ALL";
export const INITIAL_CONTEST_STUDENT_NOT_OPEN_NOW: string = "INITIAL_CONTEST_STUDENT_NOT_OPEN_NOW";

export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(contest: IContestStudent) {
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
export function initialContestStudentOpening(contest: IContestStudent): IInitialContestStudentOpeningActionType {
    return { type: INITIAL_CONTEST_STUDENT_OPENING, contest: contest };
}

export function removeContestStudentOpeningAll(): IRemoveContestStudentOpeningAllActionType {
    return { type: REMOVE_CONTEST_STUDENT_OPENING_ALL };
}

export function addContestStudentOpening(contest: IContestStudent): IAddContestStudentOpeningActionType {
    return { type: ADD_CONTEST_STUDENT_OPENING, contest: contest };
}

export function editContestStudentOpening(contest: IContestStudent): IEditContestStudentOpeningActionType {
    return { type: EDIT_CONTEST_STUDENT_OPENING, contest: contest };
}

export function removeContestStudentOpening(id: any): IRemoveContestStudentOpeningActionType {
    return { type: REMOVE_CONTEST_STUDENT_OPENING, id: id };
}

export function changeSelectedContestStudentOpening(contest: IContestStudent): IChangeSelectedContestStudentOpeningActionType {
    return { type: CHANGE_CONTEST_STUDENT_OPENING_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestStudentOpening(): IClearSelectedContestStudentOpeningActionType {
    return { type: CLEAR_CONTEST_STUDENT_OPENING_PENDING_EDIT };
}

// Not open not student
export function initialContestStudentNew(contest: IContestStudent): IInitialContestStudentNewActionType {
    return { type: INITIAL_CONTEST_STUDENT_NEW, contest: contest };
}

export function removeContestStudentNewAll(): IRemoveContestStudentNewAllActionType {
    return { type: REMOVE_CONTEST_STUDENT_NEW_ALL };
}

export function addContestStudentNew(contest: IContestStudent): IAddContestStudentNewActionType {
    return { type: ADD_CONTEST_STUDENT_NEW, contest: contest };
}

export function editContestStudentNew(contest: IContestStudent): IEditContestStudentNewActionType {
    return { type: EDIT_CONTEST_STUDENT_NEW, contest: contest };
}

export function removeContestStudentNew(id: any): IRemoveContestStudentNewActionType {
    return { type: REMOVE_CONTEST_STUDENT_NEW, id: id };
}

export function changeSelectedContestNew(contest: IContestStudent): IChangeSelectedContestStudentNewActionType {
    return { type: CHANGE_CONTEST_STUDENT_NEW_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestStudentNew(): IClearSelectedContestStudentNewActionType {
    return { type: CLEAR_CONTEST_STUDENT_NEW_PENDING_EDIT };
}

// End
export function initialContestStudentEnd(contest: IContestStudent): IInitialContestStudentEndActionType {
    return { type: INITIAL_CONTEST_STUDENT_END, contest: contest };
}

export function removeContestStudentEndAll(): IRemoveContestStudentEndAllActionType {
    return { type: REMOVE_CONTEST_STUDENT_END_ALL };
}

export function addContestStudentEnd(contest: IContestStudent): IAddContestStudentEndActionType {
    return { type: ADD_CONTEST_STUDENT_END, contest: contest };
}

export function editContestStudentEnd(contest: IContestStudent): IEditContestStudentEndActionType {
    return { type: EDIT_CONTEST_STUDENT_END, contest: contest };
}

export function removeContestStudentEnd(id: any): IRemoveContestStudentEndActionType {
    return { type: REMOVE_CONTEST_STUDENT_END, id: id };
}

export function changeSelectedContestStudentEnd(contest: IContestStudent): IChangeSelectedContestStudentEndActionType {
    return { type: CHANGE_CONTEST_STUDENT_END_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestStudentEnd(): IClearSelectedContestStudentEndActionType {
    return { type: CLEAR_CONTEST_STUDENT_END_PENDING_EDIT };
}

// Not open now
export function initialContestStudentNotOpenNow(contest: IContestStudent): IInitialContestStudentNotOpenNowActionType {
    return { type: INITIAL_CONTEST_STUDENT_NOT_OPEN_NOW, contest: contest };
}

export function removeContestStudentNotOpenNowAll(): IRemoveContestStudentNotOpenNowAllActionType {
    return { type: REMOVE_CONTEST_STUDENT_NOT_OPEN_NOW_ALL };
}

export function addContestStudentNotOpenNow(contest: IContestStudent): IAddContestStudentNotOpenNowActionType {
    return { type: ADD_CONTEST_STUDENT_NOT_OPEN_NOW, contest: contest };
}

export function editContestStudentNotOpenNow(contest: IContestStudent): IEditContestStudentNotOpenNowActionType {
    return { type: EDIT_CONTEST_STUDENT_NOT_OPEN_NOW, contest: contest };
}

export function removeContestStudentNotOpenNow(id: any): IRemoveContestStudentNotOpenNowActionType {
    return { type: REMOVE_CONTEST_STUDENT_NOT_OPEN_NOW, id: id };
}

export function changeSelectedContestStudentNotOpenNow(contest: IContestStudent): IChangeSelectedContestStudentNotOpenNowActionType {
    return { type: CHANGE_CONTEST_STUDENT_NOT_OPEN_NOW_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestStudentNotOpenNow(): IClearSelectedContestStudentNotOpenNowActionType {
    return { type: CLEAR_CONTEST_STUDENT_NOT_OPEN_NOW_PENDING_EDIT };
}


export function setModificationState(value: ContestStudentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_contests
interface IAddContestStudentOpeningActionType { type: string, contest: IContestStudent };
interface IEditContestStudentOpeningActionType { type: string, contest: IContestStudent };
interface IRemoveContestStudentOpeningActionType { type: string, id: any };
interface IChangeSelectedContestStudentOpeningActionType { type: string, contest: IContestStudent };
interface IClearSelectedContestStudentOpeningActionType { type: string };
interface IRemoveContestStudentOpeningAllActionType { type: string }
interface IInitialContestStudentOpeningActionType {type: string, contest: IContestStudent}

// not_register_contests
interface IAddContestStudentNewActionType { type: string, contest: IContestStudent };
interface IEditContestStudentNewActionType { type: string, contest: IContestStudent };
interface IRemoveContestStudentNewActionType { type: string, id: any };
interface IChangeSelectedContestStudentNewActionType { type: string, contest: IContestStudent };
interface IClearSelectedContestStudentNewActionType { type: string };
interface IRemoveContestStudentNewAllActionType { type: string }
interface IInitialContestStudentNewActionType {type: string, contest: IContestStudent}

// not_register_contests
interface IAddContestStudentEndActionType { type: string, contest: IContestStudent };
interface IEditContestStudentEndActionType { type: string, contest: IContestStudent };
interface IRemoveContestStudentEndActionType { type: string, id: any };
interface IChangeSelectedContestStudentEndActionType { type: string, contest: IContestStudent };
interface IClearSelectedContestStudentEndActionType { type: string };
interface IRemoveContestStudentEndAllActionType { type: string }
interface IInitialContestStudentEndActionType {type: string, contest: IContestStudent}

// not_register_contests
interface IAddContestStudentNotOpenNowActionType { type: string, contest: IContestStudent };
interface IEditContestStudentNotOpenNowActionType { type: string, contest: IContestStudent };
interface IRemoveContestStudentNotOpenNowActionType { type: string, id: any };
interface IChangeSelectedContestStudentNotOpenNowActionType { type: string, contest: IContestStudent };
interface IClearSelectedContestStudentNotOpenNowActionType { type: string };
interface IRemoveContestStudentNotOpenNowAllActionType { type: string }
interface IInitialContestStudentNotOpenNowActionType {type: string, contest: IContestStudent}



interface ISetModificationStateActionType { type: string, value:  ContestStudentModificationStatus};
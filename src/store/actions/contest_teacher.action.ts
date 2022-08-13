import { IContestTeacher, ContestTeacherModificationStatus } from "../models/contest_teacher.interface";

// contest_opening
export const ADD_CONTEST_TEACHER_OPENING: string = "ADD_CONTEST_TEACHER_OPENING";
export const EDIT_CONTEST_TEACHER_OPENING: string = "EDIT_CONTEST_TEACHER_OPENING";
export const REMOVE_CONTEST_TEACHER_OPENING: string = "REMOVE_CONTEST_TEACHER_OPENING";
export const CHANGE_CONTEST_TEACHER_OPENING_AMOUNT: string = "CHANGE_CONTEST_TEACHER_OPENING_AMOUNT";
export const CHANGE_CONTEST_TEACHER_OPENING_PENDING_EDIT: string = "CHANGE_CONTEST_TEACHER_OPENING_PENDING_EDIT";
export const CLEAR_CONTEST_TEACHER_OPENING_PENDING_EDIT: string = "CLEAR_CONTEST_TEACHER_OPENING_PENDING_EDIT";
export const REMOVE_CONTEST_TEACHER_OPENING_ALL: string = "REMOVE_CONTEST_TEACHER_OPENING_ALL";
export const INITIAL_CONTEST_TEACHER_OPENING: string = "INITIAL_CONTEST_TEACHER_OPENING";

// contest_not_open_now_not_teacher
export const ADD_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER: string = "ADD_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER";
export const EDIT_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER: string = "EDIT_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER";
export const REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER: string = "REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER";
export const CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_AMOUNT: string = "CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_AMOUNT";
export const CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_PENDING_EDIT: string = "CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_PENDING_EDIT";
export const CLEAR_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_PENDING_EDIT: string = "CLEAR_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_PENDING_EDIT";
export const REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_ALL: string = "REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_ALL";
export const INITIAL_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER: string = "INITIAL_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER";

// contest_end
export const ADD_CONTEST_TEACHER_END: string = "ADD_CONTEST_TEACHER_END";
export const EDIT_CONTEST_TEACHER_END: string = "EDIT_CONTEST_TEACHER_END";
export const REMOVE_CONTEST_TEACHER_END: string = "REMOVE_CONTEST_TEACHER_END";
export const CHANGE_CONTEST_TEACHER_END_AMOUNT: string = "CHANGE_CONTEST_TEACHER_END_AMOUNT";
export const CHANGE_CONTEST_TEACHER_END_PENDING_EDIT: string = "CHANGE_CONTEST_TEACHER_END_PENDING_EDIT";
export const CLEAR_CONTEST_TEACHER_END_PENDING_EDIT: string = "CLEAR_CONTEST_TEACHER_END_PENDING_EDIT";
export const REMOVE_CONTEST_TEACHER_END_ALL: string = "REMOVE_CONTEST_TEACHER_END_ALL";
export const INITIAL_CONTEST_TEACHER_END: string = "INITIAL_CONTEST_TEACHER_END";

//contest_not_open_now
export const ADD_CONTEST_TEACHER_NOT_OPEN_NOW: string = "ADD_CONTEST_TEACHER_NOT_OPEN_NOW";
export const EDIT_CONTEST_TEACHER_NOT_OPEN_NOW: string = "EDIT_CONTEST_TEACHER_NOT_OPEN_NOW";
export const REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW: string = "REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW";
export const CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_AMOUNT: string = "CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_AMOUNT";
export const CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_PENDING_EDIT: string = "CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_PENDING_EDIT";
export const CLEAR_CONTEST_TEACHER_NOT_OPEN_NOW_PENDING_EDIT: string = "CLEAR_CONTEST_TEACHER_NOT_OPEN_NOW_PENDING_EDIT";
export const REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_ALL: string = "REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_ALL";
export const INITIAL_CONTEST_TEACHER_NOT_OPEN_NOW: string = "INITIAL_CONTEST_TEACHER_NOT_OPEN_NOW";

export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(contest: IContestTeacher) {
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
export function initialContestTeacherOpening(contest: IContestTeacher): IInitialContestTeacherOpeningActionType {
    return { type: INITIAL_CONTEST_TEACHER_OPENING, contest: contest };
}

export function removeContestTeacherOpeningAll(): IRemoveContestTeacherOpeningAllActionType {
    return { type: REMOVE_CONTEST_TEACHER_OPENING_ALL };
}

export function addContestTeacherOpening(contest: IContestTeacher): IAddContestTeacherOpeningActionType {
    return { type: ADD_CONTEST_TEACHER_OPENING, contest: contest };
}

export function editContestTeacherOpening(contest: IContestTeacher): IEditContestTeacherOpeningActionType {
    return { type: EDIT_CONTEST_TEACHER_OPENING, contest: contest };
}

export function removeContestTeacherOpening(id: number): IRemoveContestTeacherOpeningActionType {
    return { type: REMOVE_CONTEST_TEACHER_OPENING, id: id };
}

export function changeSelectedContestTeacherOpening(contest: IContestTeacher): IChangeSelectedContestTeacherOpeningActionType {
    return { type: CHANGE_CONTEST_TEACHER_OPENING_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestTeacherOpening(): IClearSelectedContestTeacherOpeningActionType {
    return { type: CLEAR_CONTEST_TEACHER_OPENING_PENDING_EDIT };
}

// Not open not teacher
export function initialContestTeacherNotOpenNowNotTeacher(contest: IContestTeacher): IInitialContestTeacherNotOpenNowNotTeacherActionType {
    return { type: INITIAL_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER, contest: contest };
}

export function removeContestTeacherNotOpenNowNotTeacherAll(): IRemoveContestTeacherNotOpenNowNotTeacherAllActionType {
    return { type: REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_ALL };
}

export function addContestTeacherNotOpenNowNotTeacher(contest: IContestTeacher): IAddContestTeacherNotOpenNowNotTeacherActionType {
    return { type: ADD_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER, contest: contest };
}

export function editContestTeacherNotOpenNowNotTeacher(contest: IContestTeacher): IEditContestTeacherNotOpenNowNotTeacherActionType {
    return { type: EDIT_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER, contest: contest };
}

export function removeContestTeacherNotOpenNowNotTeacher(id: number): IRemoveContestTeacherNotOpenNowNotTeacherActionType {
    return { type: REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER, id: id };
}

export function changeSelectedContestNotOpenNowNotTeacher(contest: IContestTeacher): IChangeSelectedContestTeacherNotOpenNowNotTeacherActionType {
    return { type: CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestTeacherNotOpenNowNotTeacher(): IClearSelectedContestTeacherNotOpenNowNotTeacherActionType {
    return { type: CLEAR_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_PENDING_EDIT };
}

// End
export function initialContestTeacherEnd(contest: IContestTeacher): IInitialContestTeacherEndActionType {
    return { type: INITIAL_CONTEST_TEACHER_END, contest: contest };
}

export function removeContestTeacherEndAll(): IRemoveContestTeacherEndAllActionType {
    return { type: REMOVE_CONTEST_TEACHER_END_ALL };
}

export function addContestTeacherEnd(contest: IContestTeacher): IAddContestTeacherEndActionType {
    return { type: ADD_CONTEST_TEACHER_END, contest: contest };
}

export function editContestTeacherEnd(contest: IContestTeacher): IEditContestTeacherEndActionType {
    return { type: EDIT_CONTEST_TEACHER_END, contest: contest };
}

export function removeContestTeacherEnd(id: number): IRemoveContestTeacherEndActionType {
    return { type: REMOVE_CONTEST_TEACHER_END, id: id };
}

export function changeSelectedContestTeacherEnd(contest: IContestTeacher): IChangeSelectedContestTeacherEndActionType {
    return { type: CHANGE_CONTEST_TEACHER_END_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestTeacherEnd(): IClearSelectedContestTeacherEndActionType {
    return { type: CLEAR_CONTEST_TEACHER_END_PENDING_EDIT };
}

// Not open now
export function initialContestTeacherNotOpenNow(contest: IContestTeacher): IInitialContestTeacherNotOpenNowActionType {
    return { type: INITIAL_CONTEST_TEACHER_NOT_OPEN_NOW, contest: contest };
}

export function removeContestTeacherNotOpenNowAll(): IRemoveContestTeacherNotOpenNowAllActionType {
    return { type: REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_ALL };
}

export function addContestTeacherNotOpenNow(contest: IContestTeacher): IAddContestTeacherNotOpenNowActionType {
    return { type: ADD_CONTEST_TEACHER_NOT_OPEN_NOW, contest: contest };
}

export function editContestTeacherNotOpenNow(contest: IContestTeacher): IEditContestTeacherNotOpenNowActionType {
    return { type: EDIT_CONTEST_TEACHER_NOT_OPEN_NOW, contest: contest };
}

export function removeContestTeacherNotOpenNow(id: number): IRemoveContestTeacherNotOpenNowActionType {
    return { type: REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW, id: id };
}

export function changeSelectedContestTeacherNotOpenNow(contest: IContestTeacher): IChangeSelectedContestTeacherNotOpenNowActionType {
    return { type: CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_PENDING_EDIT, contest: contest };
}

export function clearSelectedContestTeacherNotOpenNow(): IClearSelectedContestTeacherNotOpenNowActionType {
    return { type: CLEAR_CONTEST_TEACHER_NOT_OPEN_NOW_PENDING_EDIT };
}


export function setModificationState(value: ContestTeacherModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_contests
interface IAddContestTeacherOpeningActionType { type: string, contest: IContestTeacher };
interface IEditContestTeacherOpeningActionType { type: string, contest: IContestTeacher };
interface IRemoveContestTeacherOpeningActionType { type: string, id: number };
interface IChangeSelectedContestTeacherOpeningActionType { type: string, contest: IContestTeacher };
interface IClearSelectedContestTeacherOpeningActionType { type: string };
interface IRemoveContestTeacherOpeningAllActionType { type: string }
interface IInitialContestTeacherOpeningActionType {type: string, contest: IContestTeacher}

// not_register_contests
interface IAddContestTeacherNotOpenNowNotTeacherActionType { type: string, contest: IContestTeacher };
interface IEditContestTeacherNotOpenNowNotTeacherActionType { type: string, contest: IContestTeacher };
interface IRemoveContestTeacherNotOpenNowNotTeacherActionType { type: string, id: number };
interface IChangeSelectedContestTeacherNotOpenNowNotTeacherActionType { type: string, contest: IContestTeacher };
interface IClearSelectedContestTeacherNotOpenNowNotTeacherActionType { type: string };
interface IRemoveContestTeacherNotOpenNowNotTeacherAllActionType { type: string }
interface IInitialContestTeacherNotOpenNowNotTeacherActionType {type: string, contest: IContestTeacher}

// not_register_contests
interface IAddContestTeacherEndActionType { type: string, contest: IContestTeacher };
interface IEditContestTeacherEndActionType { type: string, contest: IContestTeacher };
interface IRemoveContestTeacherEndActionType { type: string, id: number };
interface IChangeSelectedContestTeacherEndActionType { type: string, contest: IContestTeacher };
interface IClearSelectedContestTeacherEndActionType { type: string };
interface IRemoveContestTeacherEndAllActionType { type: string }
interface IInitialContestTeacherEndActionType {type: string, contest: IContestTeacher}

// not_register_contests
interface IAddContestTeacherNotOpenNowActionType { type: string, contest: IContestTeacher };
interface IEditContestTeacherNotOpenNowActionType { type: string, contest: IContestTeacher };
interface IRemoveContestTeacherNotOpenNowActionType { type: string, id: number };
interface IChangeSelectedContestTeacherNotOpenNowActionType { type: string, contest: IContestTeacher };
interface IClearSelectedContestTeacherNotOpenNowActionType { type: string };
interface IRemoveContestTeacherNotOpenNowAllActionType { type: string }
interface IInitialContestTeacherNotOpenNowActionType {type: string, contest: IContestTeacher}



interface ISetModificationStateActionType { type: string, value:  ContestTeacherModificationStatus};
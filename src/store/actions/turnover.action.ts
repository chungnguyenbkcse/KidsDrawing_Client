import { ITurnover, TurnoverModificationStatus } from "../models/turnover.interface";

// register_successfull_turnovers
export const ADD_TURNOVER_NOW: string = "ADD_TURNOVER_NOW";
export const EDIT_TURNOVER_NOW: string = "EDIT_TURNOVER_NOW";
export const REMOVE_TURNOVER_NOW: string = "REMOVE_TURNOVER_NOW";
export const CHANGE_TURNOVER_NOW_AMOUNT: string = "CHANGE_TURNOVER_NOW_AMOUNT";
export const CHANGE_TURNOVER_NOW_PENDING_EDIT: string = "CHANGE_TURNOVER_NOW_PENDING_EDIT";
export const CLEAR_TURNOVER_NOW_PENDING_EDIT: string = "CLEAR_TURNOVER_NOW_PENDING_EDIT";
export const REMOVE_TURNOVER_NOW_ALL: string = "REMOVE_TURNOVER_NOW_ALL";
export const INITIAL_TURNOVER_NOW: string = "INITIAL_TURNOVER_NOW";

// not_register_turnovers
export const ADD_TURNOVER_LAST: string = "ADD_TURNOVER_LAST";
export const EDIT_TURNOVER_LAST: string = "EDIT_TURNOVER_LAST";
export const REMOVE_TURNOVER_LAST: string = "REMOVE_TURNOVER_LAST";
export const CHANGE_TURNOVER_LAST_AMOUNT: string = "CHANGE_TURNOVER_LAST_AMOUNT";
export const CHANGE_TURNOVER_LAST_PENDING_EDIT: string = "CHANGE_TURNOVER_LAST_PENDING_EDIT";
export const CLEAR_TURNOVER_LAST_PENDING_EDIT: string = "CLEAR_TURNOVER_LAST_PENDING_EDIT";
export const REMOVE_TURNOVER_LAST_ALL: string = "REMOVE_TURNOVER_LAST_ALL";
export const INITIAL_TURNOVER_LAST: string = "INITIAL_TURNOVER_LAST";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(turnover: ITurnover) {
    return {
        type: FETCH_DATA_SUCCESS,
        turnover
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialTurnoverNow(turnover: ITurnover): IInitialTurnoverNowActionType {
    return { type: INITIAL_TURNOVER_NOW, turnover: turnover };
}

export function removeTurnoverNowAll(): IRemoveTurnoverNowAllActionType {
    return { type: REMOVE_TURNOVER_NOW_ALL };
}

export function addTurnoverNow(turnover: ITurnover): IAddTurnoverNowActionType {
    return { type: ADD_TURNOVER_NOW, turnover: turnover };
}

export function editTurnoverNow(turnover: ITurnover): IEditTurnoverNowActionType {
    return { type: EDIT_TURNOVER_NOW, turnover: turnover };
}

export function removeTurnoverNow(id: any): IRemoveTurnoverNowActionType {
    return { type: REMOVE_TURNOVER_NOW, id: id };
}

export function changeSelectedTurnoverNow(turnover: ITurnover): IChangeSelectedTurnoverNowActionType {
    return { type: CHANGE_TURNOVER_NOW_PENDING_EDIT, turnover: turnover };
}

export function clearSelectedTurnoverNow(): IClearSelectedTurnoverNowActionType {
    return { type: CLEAR_TURNOVER_NOW_PENDING_EDIT };
}


export function initialTurnoverLast(turnover: ITurnover): IInitialTurnoverLastActionType {
    return { type: INITIAL_TURNOVER_LAST, turnover: turnover };
}

export function removeTurnoverLastAll(): IRemoveTurnoverLastAllActionType {
    return { type: REMOVE_TURNOVER_LAST_ALL };
}

export function addTurnoverLast(turnover: ITurnover): IAddTurnoverLastActionType {
    return { type: ADD_TURNOVER_LAST, turnover: turnover };
}

export function editTurnoverLast(turnover: ITurnover): IEditTurnoverLastActionType {
    return { type: EDIT_TURNOVER_LAST, turnover: turnover };
}

export function removeTurnoverLast(id: any): IRemoveTurnoverLastActionType {
    return { type: REMOVE_TURNOVER_LAST, id: id };
}

export function changeSelectedTurnoverLast(turnover: ITurnover): IChangeSelectedTurnoverLastActionType {
    return { type: CHANGE_TURNOVER_LAST_PENDING_EDIT, turnover: turnover };
}

export function clearSelectedTurnoverLast(): IClearSelectedTurnoverLastActionType {
    return { type: CLEAR_TURNOVER_LAST_PENDING_EDIT };
}

export function setModificationState(value: TurnoverModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_turnovers
interface IAddTurnoverNowActionType { type: string, turnover: ITurnover };
interface IEditTurnoverNowActionType { type: string, turnover: ITurnover };
interface IRemoveTurnoverNowActionType { type: string, id: any };
interface IChangeSelectedTurnoverNowActionType { type: string, turnover: ITurnover };
interface IClearSelectedTurnoverNowActionType { type: string };
interface IRemoveTurnoverNowAllActionType { type: string }
interface IInitialTurnoverNowActionType {type: string, turnover: ITurnover}

// not_register_turnovers
interface IAddTurnoverLastActionType { type: string, turnover: ITurnover };
interface IEditTurnoverLastActionType { type: string, turnover: ITurnover };
interface IRemoveTurnoverLastActionType { type: string, id: any };
interface IChangeSelectedTurnoverLastActionType { type: string, turnover: ITurnover };
interface IClearSelectedTurnoverLastActionType { type: string };
interface IRemoveTurnoverLastAllActionType { type: string }
interface IInitialTurnoverLastActionType {type: string, turnover: ITurnover}



interface ISetModificationStateActionType { type: string, value:  TurnoverModificationStatus};
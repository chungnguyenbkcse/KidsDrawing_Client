import { IFinalScoreChild, FinalScoreChildModificationStatus } from "../models/final_score_child.interface";
export const ADD_FINAL_SCORE_CHILD: string = "ADD_FINAL_SCORE_CHILD";
export const EDIT_FINAL_SCORE_CHILD: string = "EDIT_FINAL_SCORE_CHILD";
export const REMOVE_FINAL_SCORE_CHILD: string = "REMOVE_FINAL_SCORE_CHILD";
export const CHANGE_FINAL_SCORE_CHILD_AMOUNT: string = "CHANGE_FINAL_SCORE_CHILD_AMOUNT";
export const CHANGE_FINAL_SCORE_CHILD_PENDING_EDIT: string = "CHANGE_FINAL_SCORE_CHILD_PENDING_EDIT";
export const CLEAR_FINAL_SCORE_CHILD_PENDING_EDIT: string = "CLEAR_FINAL_SCORE_CHILD_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_FINAL_SCORE_CHILD_ALL: string = "REMOVE_FINAL_SCORE_CHILD_ALL";
export const INITIAL_FINAL_SCORE_CHILD: string = "INITIAL_FINAL_SCORE_CHILD";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(final_score_child: IFinalScoreChild) {
    return {
        type: FETCH_DATA_SUCCESS,
        final_score_child
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialFinalScoreChild(final_score_child: IFinalScoreChild): IInitialFinalScoreChildActionType {
    return { type: INITIAL_FINAL_SCORE_CHILD, final_score_child: final_score_child };
}

export function removeFinalScoreChildAll(): IRemoveFinalScoreChildAllActionType {
    return { type: REMOVE_FINAL_SCORE_CHILD_ALL };
}

export function addFinalScoreChild(final_score_child: IFinalScoreChild): IAddFinalScoreChildActionType {
    return { type: ADD_FINAL_SCORE_CHILD, final_score_child: final_score_child };
}

export function editFinalScoreChild(final_score_child: IFinalScoreChild): IEditFinalScoreChildActionType {
    return { type: EDIT_FINAL_SCORE_CHILD, final_score_child: final_score_child };
}

export function removeFinalScoreChild(id: any): IRemoveFinalScoreChildActionType {
    return { type: REMOVE_FINAL_SCORE_CHILD, id: id };
}

export function changeSelectedFinalScoreChild(final_score_child: IFinalScoreChild): IChangeSelectedFinalScoreChildActionType {
    return { type: CHANGE_FINAL_SCORE_CHILD_PENDING_EDIT, final_score_child: final_score_child };
}

export function clearSelectedFinalScoreChild(): IClearSelectedFinalScoreChildActionType {
    return { type: CLEAR_FINAL_SCORE_CHILD_PENDING_EDIT };
}

export function setModificationState(value: FinalScoreChildModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddFinalScoreChildActionType { type: string, final_score_child: IFinalScoreChild };
interface IEditFinalScoreChildActionType { type: string, final_score_child: IFinalScoreChild };
interface IRemoveFinalScoreChildActionType { type: string, id: any };
interface IChangeSelectedFinalScoreChildActionType { type: string, final_score_child: IFinalScoreChild };
interface IClearSelectedFinalScoreChildActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  FinalScoreChildModificationStatus};
interface IRemoveFinalScoreChildAllActionType { type: string }
interface IInitialFinalScoreChildActionType {type: string, final_score_child: IFinalScoreChild}
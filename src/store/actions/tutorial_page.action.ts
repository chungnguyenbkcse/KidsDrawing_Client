import { ITutorialPage, TutorialPageModificationStatus } from "../models/tutorial_page.interface";
export const ADD_TUTORIAL_PAGE: string = "ADD_TUTORIAL_PAGE";
export const EDIT_TUTORIAL_PAGE: string = "EDIT_TUTORIAL_PAGE";
export const REMOVE_TUTORIAL_PAGE: string = "REMOVE_TUTORIAL_PAGE";
export const REMOVE_TUTORIAL_PAGE_BY_NUMBER: string = "REMOVE_TUTORIAL_PAGE_BY_NUMBER";
export const CHANGE_TUTORIAL_PAGE_AMOUNT: string = "CHANGE_TUTORIAL_PAGE_AMOUNT";
export const CHANGE_TUTORIAL_PAGE_PENDING_EDIT: string = "CHANGE_TUTORIAL_PAGE_PENDING_EDIT";
export const CLEAR_TUTORIAL_PAGE_PENDING_EDIT: string = "CLEAR_TUTORIAL_PAGE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_TUTORIAL_PAGE_ALL: string = "REMOVE_TUTORIAL_PAGE_ALL";
export const INITIAL_TUTORIAL_PAGE: string = "INITIAL_TUTORIAL_PAGE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(tutorial_page: ITutorialPage) {
    return {
        type: FETCH_DATA_SUCCESS,
        tutorial_page
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialTutorialPage(tutorial_page: ITutorialPage): IInitialTutorialPageActionType {
    return { type: INITIAL_TUTORIAL_PAGE, tutorial_page: tutorial_page };
}

export function removeTutorialPageAll(): IRemoveTutorialPageAllActionType {
    return { type: REMOVE_TUTORIAL_PAGE_ALL };
}

export function addTutorialPage(tutorial_page: ITutorialPage): IAddTutorialPageActionType {
    return { type: ADD_TUTORIAL_PAGE, tutorial_page: tutorial_page };
}

export function editTutorialPage(tutorial_page: ITutorialPage): IEditTutorialPageActionType {
    return { type: EDIT_TUTORIAL_PAGE, tutorial_page: tutorial_page };
}

export function removeTutorialPage(id: string): IRemoveTutorialPageActionType {
    return { type: REMOVE_TUTORIAL_PAGE, id: id };
}

export function removeTutorialPageByNumber(number: number): IRemoveTutorialPageByNumberActionType {
    return { type: REMOVE_TUTORIAL_PAGE_BY_NUMBER, number: number };
}

export function changeSelectedTutorialPage(tutorial_page: ITutorialPage): IChangeSelectedTutorialPageActionType {
    return { type: CHANGE_TUTORIAL_PAGE_PENDING_EDIT, tutorial_page: tutorial_page };
}

export function clearSelectedTutorialPage(): IClearSelectedTutorialPageActionType {
    return { type: CLEAR_TUTORIAL_PAGE_PENDING_EDIT };
}

export function setModificationStateTutorialPage(value: TutorialPageModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddTutorialPageActionType { type: string, tutorial_page: ITutorialPage };
interface IEditTutorialPageActionType { type: string, tutorial_page: ITutorialPage };
interface IRemoveTutorialPageActionType { type: string, id: string };
interface IChangeSelectedTutorialPageActionType { type: string, tutorial_page: ITutorialPage };
interface IClearSelectedTutorialPageActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  TutorialPageModificationStatus};
interface IRemoveTutorialPageAllActionType { type: string }
interface IRemoveTutorialPageByNumberActionType { type: string, number: number }
interface IInitialTutorialPageActionType {type: string, tutorial_page: ITutorialPage}
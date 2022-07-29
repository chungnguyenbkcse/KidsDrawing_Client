import { ITutorialTemplatePage, TutorialTemplatePageModificationStatus } from "../models/tutorial_template_page.interface";
export const ADD_TUTORIAL_TEMPLATE_PAGE: string = "ADD_TUTORIAL_TEMPLATE_PAGE";
export const EDIT_TUTORIAL_TEMPLATE_PAGE: string = "EDIT_TUTORIAL_TEMPLATE_PAGE";
export const REMOVE_TUTORIAL_TEMPLATE_PAGE: string = "REMOVE_TUTORIAL_TEMPLATE_PAGE";
export const CHANGE_TUTORIAL_TEMPLATE_PAGE_AMOUNT: string = "CHANGE_TUTORIAL_TEMPLATE_PAGE_AMOUNT";
export const CHANGE_TUTORIAL_TEMPLATE_PAGE_PENDING_EDIT: string = "CHANGE_TUTORIAL_TEMPLATE_PAGE_PENDING_EDIT";
export const CLEAR_TUTORIAL_TEMPLATE_PAGE_PENDING_EDIT: string = "CLEAR_TUTORIAL_TEMPLATE_PAGE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_TUTORIAL_TEMPLATE_PAGE_ALL: string = "REMOVE_TUTORIAL_TEMPLATE_PAGE_ALL";
export const INITIAL_TUTORIAL_TEMPLATE_PAGE: string = "INITIAL_TUTORIAL_TEMPLATE_PAGE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(tutorial_template_page: ITutorialTemplatePage) {
    return {
        type: FETCH_DATA_SUCCESS,
        tutorial_template_page
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialTutorialTemplatePage(tutorial_template_page: ITutorialTemplatePage): IInitialTutorialTemplatePageActionType {
    return { type: INITIAL_TUTORIAL_TEMPLATE_PAGE, tutorial_template_page: tutorial_template_page };
}

export function removeTutorialTemplatePageAll(): IRemoveTutorialTemplatePageAllActionType {
    return { type: REMOVE_TUTORIAL_TEMPLATE_PAGE_ALL };
}

export function addTutorialTemplatePage(tutorial_template_page: ITutorialTemplatePage): IAddTutorialTemplatePageActionType {
    return { type: ADD_TUTORIAL_TEMPLATE_PAGE, tutorial_template_page: tutorial_template_page };
}

export function editTutorialTemplatePage(tutorial_template_page: ITutorialTemplatePage): IEditTutorialTemplatePageActionType {
    return { type: EDIT_TUTORIAL_TEMPLATE_PAGE, tutorial_template_page: tutorial_template_page };
}

export function removeTutorialTemplatePage(id: number): IRemoveTutorialTemplatePageActionType {
    return { type: REMOVE_TUTORIAL_TEMPLATE_PAGE, id: id };
}

export function changeSelectedTutorialTemplatePage(tutorial_template_page: ITutorialTemplatePage): IChangeSelectedTutorialTemplatePageActionType {
    return { type: CHANGE_TUTORIAL_TEMPLATE_PAGE_PENDING_EDIT, tutorial_template_page: tutorial_template_page };
}

export function clearSelectedTutorialTemplatePage(): IClearSelectedTutorialTemplatePageActionType {
    return { type: CLEAR_TUTORIAL_TEMPLATE_PAGE_PENDING_EDIT };
}

export function setModificationStateTutorialTemplatePage(value: TutorialTemplatePageModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddTutorialTemplatePageActionType { type: string, tutorial_template_page: ITutorialTemplatePage };
interface IEditTutorialTemplatePageActionType { type: string, tutorial_template_page: ITutorialTemplatePage };
interface IRemoveTutorialTemplatePageActionType { type: string, id: number };
interface IChangeSelectedTutorialTemplatePageActionType { type: string, tutorial_template_page: ITutorialTemplatePage };
interface IClearSelectedTutorialTemplatePageActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  TutorialTemplatePageModificationStatus};
interface IRemoveTutorialTemplatePageAllActionType { type: string }
interface IInitialTutorialTemplatePageActionType {type: string, tutorial_template_page: ITutorialTemplatePage}
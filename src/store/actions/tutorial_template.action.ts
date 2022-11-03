import { ITutorialTemplate, TutorialTemplateModificationStatus } from "../models/tutorial_template.interface";
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

export function fetchDataSuccess(tutorial_template: ITutorialTemplate) {
    return {
        type: FETCH_DATA_SUCCESS,
        tutorial_template
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialTutorialTemplate(tutorial_template: ITutorialTemplate): IInitialTutorialTemplateActionType {
    return { type: INITIAL_TUTORIAL_TEMPLATE, tutorial_template: tutorial_template };
}

export function removeTutorialTemplateAll(): IRemoveTutorialTemplateAllActionType {
    return { type: REMOVE_TUTORIAL_TEMPLATE_ALL };
}

export function addTutorialTemplate(tutorial_template: ITutorialTemplate): IAddTutorialTemplateActionType {
    return { type: ADD_TUTORIAL_TEMPLATE, tutorial_template: tutorial_template };
}

export function editTutorialTemplate(tutorial_template: ITutorialTemplate): IEditTutorialTemplateActionType {
    return { type: EDIT_TUTORIAL_TEMPLATE, tutorial_template: tutorial_template };
}

export function removeTutorialTemplate(id: any): IRemoveTutorialTemplateActionType {
    return { type: REMOVE_TUTORIAL_TEMPLATE, id: id };
}

export function changeSelectedTutorialTemplate(tutorial_template: ITutorialTemplate): IChangeSelectedTutorialTemplateActionType {
    return { type: CHANGE_TUTORIAL_TEMPLATE_PENDING_EDIT, tutorial_template: tutorial_template };
}

export function clearSelectedTutorialTemplate(): IClearSelectedTutorialTemplateActionType {
    return { type: CLEAR_TUTORIAL_TEMPLATE_PENDING_EDIT };
}

export function setModificationStateTutorialTemplate(value: TutorialTemplateModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddTutorialTemplateActionType { type: string, tutorial_template: ITutorialTemplate };
interface IEditTutorialTemplateActionType { type: string, tutorial_template: ITutorialTemplate };
interface IRemoveTutorialTemplateActionType { type: string, id: any };
interface IChangeSelectedTutorialTemplateActionType { type: string, tutorial_template: ITutorialTemplate };
interface IClearSelectedTutorialTemplateActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  TutorialTemplateModificationStatus};
interface IRemoveTutorialTemplateAllActionType { type: string }
interface IInitialTutorialTemplateActionType {type: string, tutorial_template: ITutorialTemplate}
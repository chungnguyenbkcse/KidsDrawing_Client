import { ISectionTemplate, SectionTemplateModificationStatus } from "../models/section_template.interface";
export const ADD_SECTION_TEMPLATE: string = "ADD_SECTION_TEMPLATE";
export const EDIT_SECTION_TEMPLATE: string = "EDIT_SECTION_TEMPLATE";
export const REMOVE_SECTION_TEMPLATE: string = "REMOVE_SECTION_TEMPLATE";
export const CHANGE_SECTION_TEMPLATE_AMOUNT: string = "CHANGE_SECTION_TEMPLATE_AMOUNT";
export const CHANGE_SECTION_TEMPLATE_PENDING_EDIT: string = "CHANGE_SECTION_TEMPLATE_PENDING_EDIT";
export const CLEAR_SECTION_TEMPLATE_PENDING_EDIT: string = "CLEAR_SECTION_TEMPLATE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_SECTION_TEMPLATE_ALL: string = "REMOVE_SECTION_TEMPLATE_ALL";
export const INITIAL_SECTION_TEMPLATE: string = "INITIAL_SECTION_TEMPLATE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(section_template: ISectionTemplate) {
    return {
        type: FETCH_DATA_SUCCESS,
        section_template
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialSectionTemplate(section_template: ISectionTemplate): IInitialSectionTemplateActionType {
    return { type: INITIAL_SECTION_TEMPLATE, section_template: section_template };
}

export function removeSectionTemplateAll(): IRemoveSectionTemplateAllActionType {
    return { type: REMOVE_SECTION_TEMPLATE_ALL };
}

export function addSectionTemplate(section_template: ISectionTemplate): IAddSectionTemplateActionType {
    return { type: ADD_SECTION_TEMPLATE, section_template: section_template };
}

export function editSectionTemplate(section_template: ISectionTemplate): IEditSectionTemplateActionType {
    return { type: EDIT_SECTION_TEMPLATE, section_template: section_template };
}

export function removeSectionTemplate(id: number): IRemoveSectionTemplateActionType {
    return { type: REMOVE_SECTION_TEMPLATE, id: id };
}

export function changeSelectedSectionTemplate(section_template: ISectionTemplate): IChangeSelectedSectionTemplateActionType {
    return { type: CHANGE_SECTION_TEMPLATE_PENDING_EDIT, section_template: section_template };
}

export function clearSelectedSectionTemplate(): IClearSelectedSectionTemplateActionType {
    return { type: CLEAR_SECTION_TEMPLATE_PENDING_EDIT };
}

export function setModificationStateSectionTemplate(value: SectionTemplateModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddSectionTemplateActionType { type: string, section_template: ISectionTemplate };
interface IEditSectionTemplateActionType { type: string, section_template: ISectionTemplate };
interface IRemoveSectionTemplateActionType { type: string, id: number };
interface IChangeSelectedSectionTemplateActionType { type: string, section_template: ISectionTemplate };
interface IClearSelectedSectionTemplateActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  SectionTemplateModificationStatus};
interface IRemoveSectionTemplateAllActionType { type: string }
interface IInitialSectionTemplateActionType {type: string, section_template: ISectionTemplate}
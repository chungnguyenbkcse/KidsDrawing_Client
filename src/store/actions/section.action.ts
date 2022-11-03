import { ISection, SectionModificationStatus } from "../models/section.interface";
export const ADD_SECTION: string = "ADD_SECTION";
export const EDIT_SECTION: string = "EDIT_SECTION";
export const REMOVE_SECTION: string = "REMOVE_SECTION";
export const CHANGE_SECTION_AMOUNT: string = "CHANGE_SECTION_AMOUNT";
export const CHANGE_SECTION_PENDING_EDIT: string = "CHANGE_SECTION_PENDING_EDIT";
export const CLEAR_SECTION_PENDING_EDIT: string = "CLEAR_SECTION_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_SECTION_ALL: string = "REMOVE_SECTION_ALL";
export const INITIAL_SECTION: string = "INITIAL_SECTION";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(section: ISection) {
    return {
        type: FETCH_DATA_SUCCESS,
        section
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialSection(section: ISection): IInitialSectionActionType {
    return { type: INITIAL_SECTION, section: section };
}

export function removeSectionAll(): IRemoveSectionAllActionType {
    return { type: REMOVE_SECTION_ALL };
}

export function addSection(section: ISection): IAddSectionActionType {
    return { type: ADD_SECTION, section: section };
}

export function editSection(section: ISection): IEditSectionActionType {
    return { type: EDIT_SECTION, section: section };
}

export function removeSection(id: any): IRemoveSectionActionType {
    return { type: REMOVE_SECTION, id: id };
}

export function changeSelectedSection(section: ISection): IChangeSelectedSectionActionType {
    return { type: CHANGE_SECTION_PENDING_EDIT, section: section };
}

export function clearSelectedSection(): IClearSelectedSectionActionType {
    return { type: CLEAR_SECTION_PENDING_EDIT };
}

export function setModificationStateSection(value: SectionModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddSectionActionType { type: string, section: ISection };
interface IEditSectionActionType { type: string, section: ISection };
interface IRemoveSectionActionType { type: string, id: any };
interface IChangeSelectedSectionActionType { type: string, section: ISection };
interface IClearSelectedSectionActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  SectionModificationStatus};
interface IRemoveSectionAllActionType { type: string }
interface IInitialSectionActionType {type: string, section: ISection}
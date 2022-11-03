import { IArtLevel, ArtLevelModificationStatus } from "../models/art_level.interface";
export const ADD_ART_LEVEL: string = "ADD_ART_LEVEL";
export const EDIT_ART_LEVEL: string = "EDIT_ART_LEVEL";
export const REMOVE_ART_LEVEL: string = "REMOVE_ART_LEVEL";
export const CHANGE_ART_LEVEL_AMOUNT: string = "CHANGE_ART_LEVEL_AMOUNT";
export const CHANGE_ART_LEVEL_PENDING_EDIT: string = "CHANGE_ART_LEVEL_PENDING_EDIT";
export const CLEAR_ART_LEVEL_PENDING_EDIT: string = "CLEAR_ART_LEVEL_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_ART_LEVEL_ALL: string = "REMOVE_ART_LEVEL_ALL";
export const INITIAL_ART_LEVEL: string = "INITIAL_ART_LEVEL";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(art_level: IArtLevel) {
    return {
        type: FETCH_DATA_SUCCESS,
        art_level
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialArtLevel(art_level: IArtLevel): IInitialArtLevelActionType {
    return { type: INITIAL_ART_LEVEL, art_level: art_level };
}

export function removeArtLevelAll(): IRemoveArtLevelAllActionType {
    return { type: REMOVE_ART_LEVEL_ALL };
}

export function addArtLevel(art_level: IArtLevel): IAddArtLevelActionType {
    return { type: ADD_ART_LEVEL, art_level: art_level };
}

export function editArtLevel(art_level: IArtLevel): IEditArtLevelActionType {
    return { type: EDIT_ART_LEVEL, art_level: art_level };
}

export function removeArtLevel(id: any): IRemoveArtLevelActionType {
    return { type: REMOVE_ART_LEVEL, id: id };
}

export function changeSelectedArtLevel(art_level: IArtLevel): IChangeSelectedArtLevelActionType {
    return { type: CHANGE_ART_LEVEL_PENDING_EDIT, art_level: art_level };
}

export function clearSelectedArtLevel(): IClearSelectedArtLevelActionType {
    return { type: CLEAR_ART_LEVEL_PENDING_EDIT };
}

export function setModificationStateArtLevel(value: ArtLevelModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddArtLevelActionType { type: string, art_level: IArtLevel };
interface IEditArtLevelActionType { type: string, art_level: IArtLevel };
interface IRemoveArtLevelActionType { type: string, id: any };
interface IChangeSelectedArtLevelActionType { type: string, art_level: IArtLevel };
interface IClearSelectedArtLevelActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ArtLevelModificationStatus};
interface IRemoveArtLevelAllActionType { type: string }
interface IInitialArtLevelActionType {type: string, art_level: IArtLevel}
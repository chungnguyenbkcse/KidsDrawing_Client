import { IArtType, ArtTypeModificationStatus } from "../models/art_type.interface";
export const ADD_ART_TYPE: string = "ADD_ART_TYPE";
export const EDIT_ART_TYPE: string = "EDIT_ART_TYPE";
export const REMOVE_ART_TYPE: string = "REMOVE_ART_TYPE";
export const CHANGE_ART_TYPE_AMOUNT: string = "CHANGE_ART_TYPE_AMOUNT";
export const CHANGE_ART_TYPE_PENDING_EDIT: string = "CHANGE_ART_TYPE_PENDING_EDIT";
export const CLEAR_ART_TYPE_PENDING_EDIT: string = "CLEAR_ART_TYPE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_ART_TYPE_ALL: string = "REMOVE_ART_TYPE_ALL";
export const INITIAL_ART_TYPE: string = "INITIAL_ART_TYPE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(art_type: IArtType) {
    return {
        type: FETCH_DATA_SUCCESS,
        art_type
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialArtType(art_type: IArtType): IInitialArtTypeActionType {
    return { type: INITIAL_ART_TYPE, art_type: art_type };
}

export function removeArtTypeAll(): IRemoveArtTypeAllActionType {
    return { type: REMOVE_ART_TYPE_ALL };
}

export function addArtType(art_type: IArtType): IAddArtTypeActionType {
    return { type: ADD_ART_TYPE, art_type: art_type };
}

export function editArtType(art_type: IArtType): IEditArtTypeActionType {
    return { type: EDIT_ART_TYPE, art_type: art_type };
}

export function removeArtType(id: string): IRemoveArtTypeActionType {
    return { type: REMOVE_ART_TYPE, id: id };
}

export function changeSelectedArtType(art_type: IArtType): IChangeSelectedArtTypeActionType {
    return { type: CHANGE_ART_TYPE_PENDING_EDIT, art_type: art_type };
}

export function clearSelectedArtType(): IClearSelectedArtTypeActionType {
    return { type: CLEAR_ART_TYPE_PENDING_EDIT };
}

export function setModificationState(value: ArtTypeModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddArtTypeActionType { type: string, art_type: IArtType };
interface IEditArtTypeActionType { type: string, art_type: IArtType };
interface IRemoveArtTypeActionType { type: string, id: string };
interface IChangeSelectedArtTypeActionType { type: string, art_type: IArtType };
interface IClearSelectedArtTypeActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ArtTypeModificationStatus};
interface IRemoveArtTypeAllActionType { type: string }
interface IInitialArtTypeActionType {type: string, art_type: IArtType}
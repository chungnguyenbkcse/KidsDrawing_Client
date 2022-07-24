import { IArtAge, ArtAgeModificationStatus } from "../models/art_age.interface";
export const ADD_ART_AGE: string = "ADD_ART_AGE";
export const EDIT_ART_AGE: string = "EDIT_ART_AGE";
export const REMOVE_ART_AGE: string = "REMOVE_ART_AGE";
export const CHANGE_ART_AGE_AMOUNT: string = "CHANGE_ART_AGE_AMOUNT";
export const CHANGE_ART_AGE_PENDING_EDIT: string = "CHANGE_ART_AGE_PENDING_EDIT";
export const CLEAR_ART_AGE_PENDING_EDIT: string = "CLEAR_ART_AGE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_ART_AGE_ALL: string = "REMOVE_ART_AGE_ALL";
export const INITIAL_ART_AGE: string = "INITIAL_ART_AGE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(art_age: IArtAge) {
    return {
        type: FETCH_DATA_SUCCESS,
        art_age
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialArtAge(art_age: IArtAge): IInitialArtAgeActionType {
    return { type: INITIAL_ART_AGE, art_age: art_age };
}

export function removeArtAgeAll(): IRemoveArtAgeAllActionType {
    return { type: REMOVE_ART_AGE_ALL };
}

export function addArtAge(art_age: IArtAge): IAddArtAgeActionType {
    return { type: ADD_ART_AGE, art_age: art_age };
}

export function editArtAge(art_age: IArtAge): IEditArtAgeActionType {
    return { type: EDIT_ART_AGE, art_age: art_age };
}

export function removeArtAge(id: number): IRemoveArtAgeActionType {
    return { type: REMOVE_ART_AGE, id: id };
}

export function changeSelectedArtAge(art_age: IArtAge): IChangeSelectedArtAgeActionType {
    return { type: CHANGE_ART_AGE_PENDING_EDIT, art_age: art_age };
}

export function clearSelectedArtAge(): IClearSelectedArtAgeActionType {
    return { type: CLEAR_ART_AGE_PENDING_EDIT };
}

export function setModificationStateArtAge(value: ArtAgeModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddArtAgeActionType { type: string, art_age: IArtAge };
interface IEditArtAgeActionType { type: string, art_age: IArtAge };
interface IRemoveArtAgeActionType { type: string, id: number };
interface IChangeSelectedArtAgeActionType { type: string, art_age: IArtAge };
interface IClearSelectedArtAgeActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ArtAgeModificationStatus};
interface IRemoveArtAgeAllActionType { type: string }
interface IInitialArtAgeActionType {type: string, art_age: IArtAge}
import { IProfile, ProfileModificationStatus } from "../models/profile.interface";
export const ADD_PROFILE: string = "ADD_PROFILE";
export const EDIT_PROFILE: string = "EDIT_PROFILE";
export const REMOVE_PROFILE: string = "REMOVE_PROFILE";
export const CHANGE_PROFILE_AMOUNT: string = "CHANGE_PROFILE_AMOUNT";
export const CHANGE_PROFILE_PENDING_EDIT: string = "CHANGE_PROFILE_PENDING_EDIT";
export const CLEAR_PROFILE_PENDING_EDIT: string = "CLEAR_PROFILE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_PROFILE_ALL: string = "REMOVE_PROFILE_ALL";
export const INITIAL_PROFILE: string = "INITIAL_PROFILE";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(profile: IProfile) {
    return {
        type: FETCH_DATA_SUCCESS,
        profile
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialProfile(profile: IProfile): IInitialProfileActionType {
    return { type: INITIAL_PROFILE, profile: profile };
}

export function removeProfileAll(): IRemoveProfileAllActionType {
    return { type: REMOVE_PROFILE_ALL };
}

export function addProfile(profile: IProfile): IAddProfileActionType {
    return { type: ADD_PROFILE, profile: profile };
}

export function editProfile(profile: IProfile): IEditProfileActionType {
    return { type: EDIT_PROFILE, profile: profile };
}

export function removeProfile(id: number): IRemoveProfileActionType {
    return { type: REMOVE_PROFILE, id: id };
}

export function changeSelectedProfile(profile: IProfile): IChangeSelectedProfileActionType {
    return { type: CHANGE_PROFILE_PENDING_EDIT, profile: profile };
}

export function clearSelectedProfile(): IClearSelectedProfileActionType {
    return { type: CLEAR_PROFILE_PENDING_EDIT };
}

export function setModificationStateProfile(value: ProfileModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddProfileActionType { type: string, profile: IProfile };
interface IEditProfileActionType { type: string, profile: IProfile };
interface IRemoveProfileActionType { type: string, id: number };
interface IChangeSelectedProfileActionType { type: string, profile: IProfile };
interface IClearSelectedProfileActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ProfileModificationStatus};
interface IRemoveProfileAllActionType { type: string }
interface IInitialProfileActionType {type: string, profile: IProfile}
import { IUserRegisterTutorialPage, UserRegisterTutorialPageModificationStatus } from "../models/user_register_tutorial_page.interface";
export const ADD_USER_REGISTER_JOIN_SEMESTER: string = "ADD_USER_REGISTER_JOIN_SEMESTER";
export const EDIT_USER_REGISTER_JOIN_SEMESTER: string = "EDIT_USER_REGISTER_JOIN_SEMESTER";
export const REMOVE_USER_REGISTER_JOIN_SEMESTER: string = "REMOVE_USER_REGISTER_JOIN_SEMESTER";
export const CHANGE_USER_REGISTER_JOIN_SEMESTER_AMOUNT: string = "CHANGE_USER_REGISTER_JOIN_SEMESTER_AMOUNT";
export const CHANGE_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT: string = "CHANGE_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT";
export const CLEAR_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT: string = "CLEAR_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_USER_REGISTER_JOIN_SEMESTER_ALL: string = "REMOVE_USER_REGISTER_JOIN_SEMESTER_ALL";
export const INITIAL_USER_REGISTER_JOIN_SEMESTER: string = "INITIAL_USER_REGISTER_JOIN_SEMESTER";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(user_register_tutorial_page: IUserRegisterTutorialPage) {
    return {
        type: FETCH_DATA_SUCCESS,
        user_register_tutorial_page
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialUserRegisterTutorialPage(user_register_tutorial_page: IUserRegisterTutorialPage): IInitialUserRegisterTutorialPageActionType {
    return { type: INITIAL_USER_REGISTER_JOIN_SEMESTER, user_register_tutorial_page: user_register_tutorial_page };
}

export function removeUserRegisterTutorialPageAll(): IRemoveUserRegisterTutorialPageAllActionType {
    return { type: REMOVE_USER_REGISTER_JOIN_SEMESTER_ALL };
}

export function addUserRegisterTutorialPage(user_register_tutorial_page: IUserRegisterTutorialPage): IAddUserRegisterTutorialPageActionType {
    return { type: ADD_USER_REGISTER_JOIN_SEMESTER, user_register_tutorial_page: user_register_tutorial_page };
}

export function editUserRegisterTutorialPage(user_register_tutorial_page: IUserRegisterTutorialPage): IEditUserRegisterTutorialPageActionType {
    return { type: EDIT_USER_REGISTER_JOIN_SEMESTER, user_register_tutorial_page: user_register_tutorial_page };
}

export function removeUserRegisterTutorialPage(id: any): IRemoveUserRegisterTutorialPageActionType {
    return { type: REMOVE_USER_REGISTER_JOIN_SEMESTER, id: id };
}

export function changeSelectedUserRegisterTutorialPage(user_register_tutorial_page: IUserRegisterTutorialPage): IChangeSelectedUserRegisterTutorialPageActionType {
    return { type: CHANGE_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT, user_register_tutorial_page: user_register_tutorial_page };
}

export function clearSelectedUserRegisterTutorialPage(): IClearSelectedUserRegisterTutorialPageActionType {
    return { type: CLEAR_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT };
}

export function setModificationStateUserRegisterTutorialPage(value: UserRegisterTutorialPageModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddUserRegisterTutorialPageActionType { type: string, user_register_tutorial_page: IUserRegisterTutorialPage };
interface IEditUserRegisterTutorialPageActionType { type: string, user_register_tutorial_page: IUserRegisterTutorialPage };
interface IRemoveUserRegisterTutorialPageActionType { type: string, id: any };
interface IChangeSelectedUserRegisterTutorialPageActionType { type: string, user_register_tutorial_page: IUserRegisterTutorialPage };
interface IClearSelectedUserRegisterTutorialPageActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  UserRegisterTutorialPageModificationStatus};
interface IRemoveUserRegisterTutorialPageAllActionType { type: string }
interface IInitialUserRegisterTutorialPageActionType {type: string, user_register_tutorial_page: IUserRegisterTutorialPage}
import { IUserRegisterJoinSemester, UserRegisterJoinSemesterModificationStatus } from "../models/user_register_join_semester.interface";
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

export function fetchDataSuccess(user_register_join_semester: IUserRegisterJoinSemester) {
    return {
        type: FETCH_DATA_SUCCESS,
        user_register_join_semester
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialUserRegisterJoinSemester(user_register_join_semester: IUserRegisterJoinSemester): IInitialUserRegisterJoinSemesterActionType {
    return { type: INITIAL_USER_REGISTER_JOIN_SEMESTER, user_register_join_semester: user_register_join_semester };
}

export function removeUserRegisterJoinSemesterAll(): IRemoveUserRegisterJoinSemesterAllActionType {
    return { type: REMOVE_USER_REGISTER_JOIN_SEMESTER_ALL };
}

export function addUserRegisterJoinSemester(user_register_join_semester: IUserRegisterJoinSemester): IAddUserRegisterJoinSemesterActionType {
    return { type: ADD_USER_REGISTER_JOIN_SEMESTER, user_register_join_semester: user_register_join_semester };
}

export function editUserRegisterJoinSemester(user_register_join_semester: IUserRegisterJoinSemester): IEditUserRegisterJoinSemesterActionType {
    return { type: EDIT_USER_REGISTER_JOIN_SEMESTER, user_register_join_semester: user_register_join_semester };
}

export function removeUserRegisterJoinSemester(id: number): IRemoveUserRegisterJoinSemesterActionType {
    return { type: REMOVE_USER_REGISTER_JOIN_SEMESTER, id: id };
}

export function changeSelectedUserRegisterJoinSemester(user_register_join_semester: IUserRegisterJoinSemester): IChangeSelectedUserRegisterJoinSemesterActionType {
    return { type: CHANGE_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT, user_register_join_semester: user_register_join_semester };
}

export function clearSelectedUserRegisterJoinSemester(): IClearSelectedUserRegisterJoinSemesterActionType {
    return { type: CLEAR_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT };
}

export function setModificationStateUserRegisterJoinSemester(value: UserRegisterJoinSemesterModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddUserRegisterJoinSemesterActionType { type: string, user_register_join_semester: IUserRegisterJoinSemester };
interface IEditUserRegisterJoinSemesterActionType { type: string, user_register_join_semester: IUserRegisterJoinSemester };
interface IRemoveUserRegisterJoinSemesterActionType { type: string, id: number };
interface IChangeSelectedUserRegisterJoinSemesterActionType { type: string, user_register_join_semester: IUserRegisterJoinSemester };
interface IClearSelectedUserRegisterJoinSemesterActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  UserRegisterJoinSemesterModificationStatus};
interface IRemoveUserRegisterJoinSemesterAllActionType { type: string }
interface IInitialUserRegisterJoinSemesterActionType {type: string, user_register_join_semester: IUserRegisterJoinSemester}
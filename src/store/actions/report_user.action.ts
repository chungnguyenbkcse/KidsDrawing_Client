import { IReportUser, ReportUserModificationStatus } from "../models/report_user.interface";
export const ADD_REPORT_USER: string = "ADD_REPORT_USER";
export const EDIT_REPORT_USER: string = "EDIT_REPORT_USER";
export const REMOVE_REPORT_USER: string = "REMOVE_REPORT_USER";
export const CHANGE_REPORT_USER_AMOUNT: string = "CHANGE_REPORT_USER_AMOUNT";
export const CHANGE_REPORT_USER_PENDING_EDIT: string = "CHANGE_REPORT_USER_PENDING_EDIT";
export const CLEAR_REPORT_USER_PENDING_EDIT: string = "CLEAR_REPORT_USER_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_REPORT_USER_ALL: string = "REMOVE_REPORT_USER_ALL";
export const INITIAL_REPORT_USER: string = "INITIAL_REPORT_USER";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(report_user: IReportUser) {
    return {
        type: FETCH_DATA_SUCCESS,
        report_user
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialReportUser(report_user: IReportUser): IInitialReportUserActionType {
    return { type: INITIAL_REPORT_USER, report_user: report_user };
}

export function removeReportUserAll(): IRemoveReportUserAllActionType {
    return { type: REMOVE_REPORT_USER_ALL };
}

export function addReportUser(report_user: IReportUser): IAddReportUserActionType {
    return { type: ADD_REPORT_USER, report_user: report_user };
}

export function editReportUser(report_user: IReportUser): IEditReportUserActionType {
    return { type: EDIT_REPORT_USER, report_user: report_user };
}

export function removeReportUser(id: string): IRemoveReportUserActionType {
    return { type: REMOVE_REPORT_USER, id: id };
}

export function changeSelectedReportUser(report_user: IReportUser): IChangeSelectedReportUserActionType {
    return { type: CHANGE_REPORT_USER_PENDING_EDIT, report_user: report_user };
}

export function clearSelectedReportUser(): IClearSelectedReportUserActionType {
    return { type: CLEAR_REPORT_USER_PENDING_EDIT };
}

export function setModificationState(value: ReportUserModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddReportUserActionType { type: string, report_user: IReportUser };
interface IEditReportUserActionType { type: string, report_user: IReportUser };
interface IRemoveReportUserActionType { type: string, id: string };
interface IChangeSelectedReportUserActionType { type: string, report_user: IReportUser };
interface IClearSelectedReportUserActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ReportUserModificationStatus};
interface IRemoveReportUserAllActionType { type: string }
interface IInitialReportUserActionType {type: string, report_user: IReportUser}
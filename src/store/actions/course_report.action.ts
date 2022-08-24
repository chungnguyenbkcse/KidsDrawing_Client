import { ICourseReport, CourseReportModificationStatus } from "../models/course_report.interface";
export const ADD_COURSE_REPORT: string = "ADD_COURSE_REPORT";
export const EDIT_COURSE_REPORT: string = "EDIT_COURSE_REPORT";
export const REMOVE_COURSE_REPORT: string = "REMOVE_COURSE_REPORT";
export const CHANGE_COURSE_REPORT_AMOUNT: string = "CHANGE_COURSE_REPORT_AMOUNT";
export const CHANGE_COURSE_REPORT_PENDING_EDIT: string = "CHANGE_COURSE_REPORT_PENDING_EDIT";
export const CLEAR_COURSE_REPORT_PENDING_EDIT: string = "CLEAR_COURSE_REPORT_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_COURSE_REPORT_ALL: string = "REMOVE_COURSE_REPORT_ALL";
export const INITIAL_COURSE_REPORT: string = "INITIAL_COURSE_REPORT";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(course_report: ICourseReport) {
    return {
        type: FETCH_DATA_SUCCESS,
        course_report
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialCourseReport(course_report: ICourseReport): IInitialCourseReportActionType {
    return { type: INITIAL_COURSE_REPORT, course_report: course_report };
}

export function removeCourseReportAll(): IRemoveCourseReportAllActionType {
    return { type: REMOVE_COURSE_REPORT_ALL };
}

export function addCourseReport(course_report: ICourseReport): IAddCourseReportActionType {
    return { type: ADD_COURSE_REPORT, course_report: course_report };
}

export function editCourseReport(course_report: ICourseReport): IEditCourseReportActionType {
    return { type: EDIT_COURSE_REPORT, course_report: course_report };
}

export function removeCourseReport(id: number): IRemoveCourseReportActionType {
    return { type: REMOVE_COURSE_REPORT, id: id };
}

export function changeSelectedCourseReport(course_report: ICourseReport): IChangeSelectedCourseReportActionType {
    return { type: CHANGE_COURSE_REPORT_PENDING_EDIT, course_report: course_report };
}

export function clearSelectedCourseReport(): IClearSelectedCourseReportActionType {
    return { type: CLEAR_COURSE_REPORT_PENDING_EDIT };
}

export function setModificationState(value: CourseReportModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddCourseReportActionType { type: string, course_report: ICourseReport };
interface IEditCourseReportActionType { type: string, course_report: ICourseReport };
interface IRemoveCourseReportActionType { type: string, id: number };
interface IChangeSelectedCourseReportActionType { type: string, course_report: ICourseReport };
interface IClearSelectedCourseReportActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  CourseReportModificationStatus};
interface IRemoveCourseReportAllActionType { type: string }
interface IInitialCourseReportActionType {type: string, course_report: ICourseReport}
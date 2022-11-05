import { IContestSubmissionTeacher, ContestSubmissionTeacherModificationStatus } from "../models/contest_submission_teacher.interface";

// register_successfull_contest_submission_teachers
export const ADD_CONTEST_SUBMISSION_TEACHER_NOT_GRADED: string = "ADD_CONTEST_SUBMISSION_TEACHER_NOT_GRADED";
export const EDIT_CONTEST_SUBMISSION_TEACHER_NOT_GRADED: string = "EDIT_CONTEST_SUBMISSION_TEACHER_NOT_GRADED";
export const REMOVE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED: string = "REMOVE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED";
export const CHANGE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_AMOUNT: string = "CHANGE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_AMOUNT";
export const CHANGE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_PENDING_EDIT: string = "CHANGE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_PENDING_EDIT";
export const CLEAR_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_PENDING_EDIT: string = "CLEAR_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_PENDING_EDIT";
export const REMOVE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_ALL: string = "REMOVE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_ALL";
export const INITIAL_CONTEST_SUBMISSION_TEACHER_NOT_GRADED: string = "INITIAL_CONTEST_SUBMISSION_TEACHER_NOT_GRADED";

// not_register_contest_submission_teachers
export const ADD_CONTEST_SUBMISSION_TEACHER_GRADED: string = "ADD_CONTEST_SUBMISSION_TEACHER_GRADED";
export const EDIT_CONTEST_SUBMISSION_TEACHER_GRADED: string = "EDIT_CONTEST_SUBMISSION_TEACHER_GRADED";
export const REMOVE_CONTEST_SUBMISSION_TEACHER_GRADED: string = "REMOVE_CONTEST_SUBMISSION_TEACHER_GRADED";
export const CHANGE_CONTEST_SUBMISSION_TEACHER_GRADED_AMOUNT: string = "CHANGE_CONTEST_SUBMISSION_TEACHER_GRADED_AMOUNT";
export const CHANGE_CONTEST_SUBMISSION_TEACHER_GRADED_PENDING_EDIT: string = "CHANGE_CONTEST_SUBMISSION_TEACHER_GRADED_PENDING_EDIT";
export const CLEAR_CONTEST_SUBMISSION_TEACHER_GRADED_PENDING_EDIT: string = "CLEAR_CONTEST_SUBMISSION_TEACHER_GRADED_PENDING_EDIT";
export const REMOVE_CONTEST_SUBMISSION_TEACHER_GRADED_ALL: string = "REMOVE_CONTEST_SUBMISSION_TEACHER_GRADED_ALL";
export const INITIAL_CONTEST_SUBMISSION_TEACHER_GRADED: string = "INITIAL_CONTEST_SUBMISSION_TEACHER_GRADED";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(contest_submission_teacher: IContestSubmissionTeacher) {
    return {
        type: FETCH_DATA_SUCCESS,
        contest_submission_teacher
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialContestSubmissionNotGrade(contest_submission_teacher: IContestSubmissionTeacher): IInitialContestSubmissionNotGradeActionType {
    return { type: INITIAL_CONTEST_SUBMISSION_TEACHER_NOT_GRADED, contest_submission_teacher: contest_submission_teacher };
}

export function removeContestSubmissionNotGradeAll(): IRemoveContestSubmissionNotGradeAllActionType {
    return { type: REMOVE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_ALL };
}

export function addContestSubmissionNotGrade(contest_submission_teacher: IContestSubmissionTeacher): IAddContestSubmissionNotGradeActionType {
    return { type: ADD_CONTEST_SUBMISSION_TEACHER_NOT_GRADED, contest_submission_teacher: contest_submission_teacher };
}

export function editContestSubmissionNotGrade(contest_submission_teacher: IContestSubmissionTeacher): IEditContestSubmissionNotGradeActionType {
    return { type: EDIT_CONTEST_SUBMISSION_TEACHER_NOT_GRADED, contest_submission_teacher: contest_submission_teacher };
}

export function removeContestSubmissionNotGrade(id: any): IRemoveContestSubmissionNotGradeActionType {
    return { type: REMOVE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED, id: id };
}

export function changeSelectedContestSubmissionNotGrade(contest_submission_teacher: IContestSubmissionTeacher): IChangeSelectedContestSubmissionNotGradeActionType {
    return { type: CHANGE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_PENDING_EDIT, contest_submission_teacher: contest_submission_teacher };
}

export function clearSelectedContestSubmissionNotGrade(): IClearSelectedContestSubmissionNotGradeActionType {
    return { type: CLEAR_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_PENDING_EDIT };
}


export function initialContestSubmissionGrade(contest_submission_teacher: IContestSubmissionTeacher): IInitialContestSubmissionGradeActionType {
    return { type: INITIAL_CONTEST_SUBMISSION_TEACHER_GRADED, contest_submission_teacher: contest_submission_teacher };
}

export function removeContestSubmissionGradeAll(): IRemoveContestSubmissionGradeAllActionType {
    return { type: REMOVE_CONTEST_SUBMISSION_TEACHER_GRADED_ALL };
}

export function addContestSubmissionGrade(contest_submission_teacher: IContestSubmissionTeacher): IAddContestSubmissionGradeActionType {
    return { type: ADD_CONTEST_SUBMISSION_TEACHER_GRADED, contest_submission_teacher: contest_submission_teacher };
}

export function editContestSubmissionGrade(contest_submission_teacher: IContestSubmissionTeacher): IEditContestSubmissionGradeActionType {
    return { type: EDIT_CONTEST_SUBMISSION_TEACHER_GRADED, contest_submission_teacher: contest_submission_teacher };
}

export function removeContestSubmissionGrade(id: any): IRemoveContestSubmissionGradeActionType {
    return { type: REMOVE_CONTEST_SUBMISSION_TEACHER_GRADED, id: id };
}

export function changeSelectedContestSubmissionGrade(contest_submission_teacher: IContestSubmissionTeacher): IChangeSelectedContestSubmissionGradeActionType {
    return { type: CHANGE_CONTEST_SUBMISSION_TEACHER_GRADED_PENDING_EDIT, contest_submission_teacher: contest_submission_teacher };
}

export function clearSelectedContestSubmissionGrade(): IClearSelectedContestSubmissionGradeActionType {
    return { type: CLEAR_CONTEST_SUBMISSION_TEACHER_GRADED_PENDING_EDIT };
}

export function setModificationState(value: ContestSubmissionTeacherModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_contest_submission_teachers
interface IAddContestSubmissionNotGradeActionType { type: string, contest_submission_teacher: IContestSubmissionTeacher };
interface IEditContestSubmissionNotGradeActionType { type: string, contest_submission_teacher: IContestSubmissionTeacher };
interface IRemoveContestSubmissionNotGradeActionType { type: string, id: any };
interface IChangeSelectedContestSubmissionNotGradeActionType { type: string, contest_submission_teacher: IContestSubmissionTeacher };
interface IClearSelectedContestSubmissionNotGradeActionType { type: string };
interface IRemoveContestSubmissionNotGradeAllActionType { type: string }
interface IInitialContestSubmissionNotGradeActionType {type: string, contest_submission_teacher: IContestSubmissionTeacher}

// not_register_contest_submission_teachers
interface IAddContestSubmissionGradeActionType { type: string, contest_submission_teacher: IContestSubmissionTeacher };
interface IEditContestSubmissionGradeActionType { type: string, contest_submission_teacher: IContestSubmissionTeacher };
interface IRemoveContestSubmissionGradeActionType { type: string, id: any };
interface IChangeSelectedContestSubmissionGradeActionType { type: string, contest_submission_teacher: IContestSubmissionTeacher };
interface IClearSelectedContestSubmissionGradeActionType { type: string };
interface IRemoveContestSubmissionGradeAllActionType { type: string }
interface IInitialContestSubmissionGradeActionType {type: string, contest_submission_teacher: IContestSubmissionTeacher}



interface ISetModificationStateActionType { type: string, value:  ContestSubmissionTeacherModificationStatus};